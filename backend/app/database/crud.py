from sqlalchemy.orm import Session
from app.database import models, schemas


def get_bot(db: Session, bot_id: int):
    return db.query(models.Bot).filter(models.Bot.id == bot_id).first()


def get_bot_by_name(db: Session, name: str):
    return db.query(models.Bot).filter(models.Bot.name == name).first()


def get_bots(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Bot).offset(skip).limit(limit).all()


def create_bot(db: Session, bot: schemas.BotBase):
    db_bot = models.Bot(name=bot.name, base64_encoded_bot=bot.base64_encoded_bot)
    db.add(db_bot)
    db.commit()
    db.refresh(db_bot)
    return db_bot