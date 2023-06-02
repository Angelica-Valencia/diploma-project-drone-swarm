from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from djitellopy import TelloSwarm
import logging
import json
from starlette.requests import Request

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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


if __name__ == "__main__":
    import uvicorn

    uvicorn.run('main:app', host="localhost", port=8000, log_level='debug', reload=True)
