from pydantic import BaseModel, EmailStr
from typing import Optional

class SupplierBase(BaseModel):
    name: str
    contact_person: Optional[str]
    phone: Optional[str]
    email: Optional[EmailStr]

class SupplierCreate(SupplierBase):
    pass

class SupplierRead(SupplierBase):
    id: int

    class Config:
        from_attributes = True


