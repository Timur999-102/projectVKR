import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveOrder } from "../services/orderService";
import { getSuppliers } from "../services/supplierService";
import { getOrders } from "../services/orderService";
import { addToStock } from "../services/inventoryService";
import dayjs from "dayjs";

export default function OrderCreate() {
  const [searchParams] = useSearchParams();
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState("");
  const defaultItem = searchParams.get("item") || "";
  const defaultQty = searchParams.get("qty") || "";
  const [item, setItem] = useState(defaultItem);
  const [quantity, setQuantity] = useState(defaultQty);
  const [status, setStatus] = useState("Ожидает");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [supplierInfo, setSupplierInfo] = useState(null);



  useEffect(() => {
    const allSuppliers = getSuppliers();
    setSuppliers(allSuppliers);
    if (allSuppliers.length > 0) {
      const defaultName = allSuppliers[0].name;
      setSupplier(defaultName);
      analyzeSupplier(defaultName);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Сохраняем заказ:", item, quantity, status)
    if (status === "Отгружен") {
      addToStock(item, quantity);
    }
    saveOrder({ supplier, item, quantity, status, date });
    navigate("/orders");
  };

  const analyzeSupplier = (name) => {
    const orders = getOrders();
    const relevant = orders.filter((o) => o.supplier === name);
    const total = relevant.length;

    const active = relevant.filter(
      (o) => o.status === "Ожидает" || o.status === "В пути"
    ).length;

    const today = dayjs();

    const overdue = relevant.filter((o) => {
      if (!o.date) return false;
      const daysPassed = today.diff(dayjs(o.date), "day");

      return (
        (o.status === "Ожидает" && daysPassed > 5) ||
        (o.status === "В пути" && daysPassed > 10) ||
        o.overdueBeforeShipped === true
      );
    }).length;

    const reliability = total > 0 ? Math.round(100 - (overdue / total) * 100) : 100;

    setSupplierInfo({ total, active, reliability });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Создание нового заказа</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Поставщик</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={supplier}
            onChange={(e) => {
              setSupplier(e.target.value);
              analyzeSupplier(e.target.value);
            }}
            required
          >
            {suppliers.length === 0 ? (
              <option disabled>Нет поставщиков</option>
            ) : (
              suppliers.map((s, i) => (
                <option key={i} value={s.name}>
                  {s.name}
                </option>
              ))
            )}
          </select>
          {supplierInfo && (
            <div className="mt-2 text-sm text-gray-700 bg-gray-100 p-3 rounded">
              <strong>🟢 Надёжность:</strong> {supplierInfo.reliability}%{" "}
              <span className="ml-2 italic text-sm text-gray-600">
                ({supplierInfo.reliability >= 90
                  ? "высокая"
                  : supplierInfo.reliability >= 70
                  ? "средняя"
                  : "низкая"})
              </span>
              <br />
              📦 <strong>Всего заказов:</strong> {supplierInfo.total}, из них активных: {supplierInfo.active}
            </div>
          )}
          {supplierInfo?.reliability < 70 && (
            <div className="mt-3 text-sm bg-red-100 text-red-800 border border-red-300 p-3 rounded">
              ⚠ <strong>Внимание:</strong> надёжность этого поставщика ниже 70%.
              <br />
              Рекомендуется использовать более надёжного поставщика.
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Материал</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Количество</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Статус</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Сохранить</button>
      </form>
    </div>
  );
}

/*📍 <strong>Поставщик:</strong> {supplier}
              <br />*/