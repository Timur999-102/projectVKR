from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.supplier import SupplierRead, SupplierCreate
from app.crud import supplier as crud_supplier
from app.api.dependencies import get_db
from pydantic import BaseModel
from typing import List

router = APIRouter()

class SupplierRating(BaseModel):
    id: int
    name: str
    reliability: float
    delivery_speed: float
    price_level: int

@router.get("/ratings", response_model=List[SupplierRating])
def get_supplier_ratings():
    return [
        SupplierRating(id=1, name="Поставщик А", reliability=92.0, delivery_speed=4.5, price_level=3),
        SupplierRating(id=2, name="Поставщик B", reliability=88.0, delivery_speed=3.9, price_level=4),
        SupplierRating(id=3, name="Поставщик C", reliability=95.0, delivery_speed=4.8, price_level=2),
    ]

@router.get("/suppliers/", response_model=list[SupplierRead])
def read_suppliers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_supplier.get_suppliers(db, skip=skip, limit=limit)

@router.post("/suppliers/", response_model=SupplierRead)
def create_supplier(supplier: SupplierCreate, db: Session = Depends(get_db)):
    return crud_supplier.create_supplier(db, supplier)
