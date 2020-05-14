import os
from dotenv import load_dotenv

class AppConfig:
    # Load environmental variables from .env file
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    load_dotenv(os.path.join(BASE_DIR, ".env"))
    
    ENVIRONMENT = os.environ["ENV"]
    DATABASE_URL = os.getenv("DATABASE_URL")
    
    if not DATABASE_URL:
        DATABASE_URL = "sqlite:///./sqlite.db"