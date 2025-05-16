import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSuppliers } from "../services/supplierService";
import { getOrders, updateOrder } from "../services/orderService";
import { addToStock } from "../services/inventoryService";
import dayjs from "dayjs";


export default function OrderEdit() {
  const { index } = useParams();
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setSuppliers(getSuppliers());
    const orders = getOrders();
    const existingOrder = orders[parseInt(index)];
    if (existingOrder) {
      setOrder(existingOrder);
    } else {
      navigate("/orders"); // если заказ не найден
    }
  }, [index, navigate]);

  const handleChange = (field, value) => {
    setOrder((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orders = getOrders();
    const previous = orders[parseInt(index)];

    // 🎯 Если статус изменился на "Отгружен" — и раньше не был
    if (previous.status !== "Отгружен" && order.status === "Отгружен") {
      addToStock(order.item, order.quantity);
    }

    const daysSince = dayjs().diff(dayjs(order.date), "day");
    const wasOverdue =
      order.status === "Ожидает" && dayjs().diff(dayjs(order.date), "day") > 5 ||
      order.status === "В пути" && dayjs().diff(dayjs(order.date), "day") > 10;

    updateOrder(parseInt(index), {
      ...order,
      overdueBeforeShipped: wasOverdue || order.overdueBeforeShipped
    });
    //updateOrder(parseInt(index), order);
    navigate("/orders");
  };

  if (!order) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Редактирование заказа</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Поставщик</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={order.supplier}
            onChange={(e) => handleChange("supplier", e.target.value)}
          >
            {suppliers.map((s, i) => (
              <option key={i} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Материал</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={order.item}
            onChange={(e) => handleChange("item", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Количество</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={order.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Статус</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={order.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option>Ожидает</option>
            <option>Отгружен</option>
            <option>В пути</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Дата</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={order.date}
            onChange={(e) => handleChange("date", e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Сохранить изменения
        </button>
      </form>
    </div>
  );
}
