from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.session import Base


# Модель закупки
class Purchase(Base):
    __tablename__ = 'purchases'

    id = Column(Integer, primary_key=True, index=True)
    material_name = Column(String, index=True)
    quantity = Column(Integer)
    price = Column(Integer)
    supplier_id = Column(Integer, ForeignKey('suppliers.id'))
    order_date = Column(DateTime, default=datetime.utcnow)
    delivery_date = Column(DateTime)

    supplier = relationship('Supplier', back_populates='purchases')

# Модель поставки
class Delivery(Base):
    __tablename__ = 'deliveries'

    id = Column(Integer, primary_key=True, index=True)
    purchase_id = Column(Integer, ForeignKey('purchases.id'))
    status = Column(String)
    expected_delivery_date = Column(DateTime)
    actual_delivery_date = Column(DateTime, nullable=True)

    purchase = relationship('Purchase', back_populates='deliveries')

# Модель поставщика
class Supplier(Base):
    __tablename__ = 'suppliers'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    contact_info = Column(String)
    reliability_score = Column(Integer, default=100)

    purchases = relationship('Purchase', back_populates='supplier')
