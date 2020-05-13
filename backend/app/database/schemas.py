from typing import List
from pydantic import BaseModel


class BotBase(BaseModel):
    name: str
    base64_encoded_bot: str

class Bot(BotBase):
    id: int

    class Config:
        orm_mode = True