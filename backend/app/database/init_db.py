from .session import Base, engine
from app import models  # <--- ВАЖНО: это нужно для регистрации моделей

def init_db():
    Base.metadata.create_all(bind=engine)
