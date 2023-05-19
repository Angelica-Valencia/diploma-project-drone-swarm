from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import cv2
import djitellopy as tellopy
import threading
import io
import numpy as np

app = FastAPI()
drone = tellopy.Tello()

# Start video streaming in separate thread
def start_drone_stream():
    drone.connect()
    drone.start_video()

streaming_thread = threading.Thread(target=start_drone_stream)
streaming_thread.start()

@app.get("/")
async def stream_video():
    def generate_frame():
        while True:
            frame_read = drone.get_frame_read()
            if frame_read.stopped:
                break
            frame = cv2.cvtColor(frame_read.frame, cv2.COLOR_BGR2GRAY)
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n')

    return StreamingResponse(generate_frame(), media_type="multipart/x-mixed-replace; boundary=frame")
