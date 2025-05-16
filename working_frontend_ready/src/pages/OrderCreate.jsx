import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderCreate() {
  const [supplier, setSupplier] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("Ожидает");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ supplier, item, quantity, status, date });
    navigate("/orders");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Создание нового заказа</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <input type="text" placeholder="Поставщик" value={supplier} onChange={e => setSupplier(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        <input type="text" placeholder="Материал" value={item} onChange={e => setItem(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        <input type="number" placeholder="Количество" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border px-3 py-2 rounded">
          <option>Ожидает</option>
          <option>Отгружен</option>
          <option>В пути</option>
        </select>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Сохранить</button>
      </form>
    </div>
  );
}