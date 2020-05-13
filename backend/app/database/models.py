from sqlalchemy import Column, Integer, String, String

from app.database import Base


class Bot(Base):
    __tablename__ = "bots"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    base64_encoded_bot = Column(String)

