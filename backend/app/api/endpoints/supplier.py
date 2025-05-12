from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.supplier import SupplierRead, SupplierCreate
from app.crud import supplier as crud_supplier
from app.api.dependencies import get_db

router = APIRouter()

@router.get("/suppliers/", response_model=list[SupplierRead])
def read_suppliers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_supplier.get_suppliers(db, skip=skip, limit=limit)

@router.post("/suppliers/", response_model=SupplierRead)
def create_supplier(supplier: SupplierCreate, db: Session = Depends(get_db)):
    return crud_supplier.create_supplier(db, supplier)
