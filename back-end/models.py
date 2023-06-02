from pydantic import BaseModel, Field
from typing import List
from djitellopy import Tello


class TelloDrone(BaseModel):
    name: str
    ipAddress: str


class Swarm(BaseModel):
    drones: List[Tello] = Field(default_factory=list)

    class Config:
        arbitrary_types_allowed = True
