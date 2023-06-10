import asyncio
import os
import cv2
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from djitellopy import TelloSwarm
import logging
import json
from starlette.requests import Request
from starlette.responses import Response, StreamingResponse

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

swarm_app = None
ip_addresses = []

logger = logging.getLogger(__name__)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post('/api/swarm')
async def receiver_swarm(request: Request):
    body = await request.body()
    swarm_list = json.loads(body)
    print(body)

    global ip_addresses
    global swarm_app

    ip_addresses.clear()

    for i, drone in enumerate(swarm_list):
        ip_addresses.append(drone['ipAddress'])
    swarm_app = TelloSwarm.fromIps(ip_addresses)
    return {'message': 'Swarm updated successfully'}


@app.get('/api/swarm')
async def read_swarm():
    global swarm_app

    if swarm_app is None:
        return {'There is no swarm setup yet.'}
    else:
        return {str(swarm_app.tellos[0].address[0])}


async def generate_frames():
    cascade_path = os.path.abspath('haarcascade_frontalface_default.xml')  # Provide the absolute path to the cascade file
    logger.debug(cascade_path)
    face_cascade = cv2.CascadeClassifier(cascade_path)
    camera = cv2.VideoCapture(0)
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            detected_regions = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

            # Draw target circle over detected persons
            for (x, y, w, h) in detected_regions:
                center_x = x + w // 2
                center_y = y + h // 2
                radius = max(w, h) // 2
                cv2.circle(frame, (center_x, center_y), radius, (0, 0, 255), 2)

            ret, buffer = cv2.imencode('.jpg', frame)
            frame_data = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_data + b'\r\n\r\n')
        await asyncio.sleep(0)  # Adjust the delay time as needed
    camera.release()



@app.get("/video-stream")
async def video_stream():
    return StreamingResponse(media_type="multipart/x-mixed-replace; boundary=frame", content=generate_frames())

if __name__ == "__main__":
    import uvicorn

    uvicorn.run('main:app', host="localhost", port=8000, log_level='debug', reload=True)
