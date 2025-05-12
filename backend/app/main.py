from app.database import init_db
from fastapi import FastAPI
from app.api.endpoints import supplier

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(supplier.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Backend with PostgreSQL is running"}
