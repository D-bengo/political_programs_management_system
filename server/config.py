from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

db = SQLAlchemy()


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # SAFE FALLBACK (IMPORTANT)
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-key")

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=2)