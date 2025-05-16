import React from "react";
import { Link } from "react-router-dom";

const orders = [
  { id: 1, supplier: "ООО Альфа", item: "Шурупы", quantity: 1000, status: "Ожидает", date: "2025-05-01" },
  { id: 2, supplier: "ЗАО Бета", item: "Кабель", quantity: 500, status: "Отгружен", date: "2025-05-03" },
];

export default function Orders() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Заказы на закупку</h1>
        <Link to="/orders/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Создать заказ
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left">№</th>
            <th className="px-4 py-2 border-b text-left">Поставщик</th>
            <th className="px-4 py-2 border-b text-left">Материал</th>
            <th className="px-4 py-2 border-b text-left">Кол-во</th>
            <th className="px-4 py-2 border-b text-left">Статус</th>
            <th className="px-4 py-2 border-b text-left">Дата</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{order.id}</td>
              <td className="px-4 py-2 border-b">{order.supplier}</td>
              <td className="px-4 py-2 border-b">{order.item}</td>
              <td className="px-4 py-2 border-b">{order.quantity}</td>
              <td className="px-4 py-2 border-b">{order.status}</td>
              <td className="px-4 py-2 border-b">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}