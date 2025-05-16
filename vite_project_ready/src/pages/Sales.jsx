import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSales } from "../services/saleService";

export default function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    setSales(getSales());
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📦 Продажи</h1>
        <Link to="/sales/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Добавить продажу
        </Link>
      </div>

      {sales.length === 0 ? (
        <p className="text-gray-600">Пока нет записей о продажах.</p>
      ) : (
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Товар</th>
              <th className="px-4 py-2">Количество</th>
              <th className="px-4 py-2">Дата</th>
              <th className="px-4 py-2">Покупатель</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{s.item}</td>
                <td className="px-4 py-2">{s.quantity}</td>
                <td className="px-4 py-2">{s.date}</td>
                <td className="px-4 py-2">{s.client || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
