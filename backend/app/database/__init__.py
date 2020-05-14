from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app import AppConfig

SQLALCHEMY_DATABASE_URL = AppConfig.DATABASE_URL

connect_args = {}

if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    # Only needed for SQLite
    connect_args.update({"check_same_thread": False})

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args=connect_args
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()