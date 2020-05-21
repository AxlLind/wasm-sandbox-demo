from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.database import crud, models, schemas, SessionLocal, engine
from app.validate_wasm import validate_wasm
from typing import List

models.Base.metadata.create_all(bind=engine) # Dont know what this does

# Initialize the FastAPI instance
app = FastAPI(
    title="WASM Bots",
    description="A simple server for our LangSec project where we can upload base64 encoded wasm bots",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Used to create a connection to the db upon requests to the server
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

@app.get("/bots", response_model=List[schemas.Bot])
def get_bots(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Returns all the wasm bots"""
    bots = crud.get_bots(db, skip=skip, limit=limit)
    return bots

@app.get("/bots/{bot_id}", response_model=schemas.Bot)
def get_bot(bot_id: int, db: Session = Depends(get_db)):
    """Fetched that particular bot"""
    return crud.get_bot(db, bot_id)

@app.post("/bots/get-by-name", response_model=schemas.Bot)
def get_bot_by_name(name: str, db: Session = Depends(get_db)):
    """Fetched that particular bot"""
    return crud.get_bot_by_name(db, name)

@app.post("/bots", response_model=schemas.Bot)
def create_bot(bot: schemas.BotBase, db: Session = Depends(get_db)):
    """Creates a new bot"""
    if not validate_wasm(bot.base64_encoded_bot):
        raise HTTPException(status_code=400, detail="Provided wasm file is invalid")
    db_bot = crud.get_bot_by_name(db, name=bot.name)
    if db_bot:
        # A bot with that name already exists
        raise HTTPException(status_code=400, detail=f"Bot with that name already exists: {bot.name}")
    return crud.create_bot(db, bot)
