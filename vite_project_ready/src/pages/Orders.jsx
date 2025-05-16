import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import { getOrders, deleteOrder } from "../services/orderService";
//import { exportOrdersToCSV } from "../utils/exportCSV";
import { addToStock } from "../services/inventoryService";
import dayjs from "dayjs";


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const today = dayjs().format("DD.MM.YYYY");

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleDelete = (index) => {
    deleteOrder(index);
    setOrders(getOrders()); // Обновить после удаления
  };

  const filteredOrders = statusFilter
    ? orders.filter((order) => order.status === statusFilter)
    : orders;

  return (
    <div className="p-6">
      <div className="print-hidden flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Заказы на закупку</h1>
        <Link to="/orders/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Создать заказ
        </Link>
      </div>

      <div className="print-hidden mb-4">
        <label className="text-sm mr-2">Фильтр по статусу:</label>
        <select
          className="border rounded px-2 py-1"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Все</option>
          <option value="Ожидает">Ожидает</option>
          <option value="Отгружен">Отгружен</option>
          <option value="В пути">В пути</option>
        </select>
      </div>

      {orders.length > 0 && (
        /*<button
          onClick={() => exportOrdersToCSV(orders)}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          📤 Экспорт в CSV
        </button>*/
        <div className="mb-4 flex justify-end mt-4 print-hidden">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            🖨️ Печать
          </button>
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <p className="text-gray-600">Нет заказов по выбранному фильтру.</p>
      ) : (
        <div className="bg-white p-4 rounded shadow print-area">
          <div className="print-header hidden">
            <h1>📦 Заказы</h1>
            <div className="date">Дата печати: {today}</div>
          </div>
          <table className="min-w-full bg-white border rounded">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Поставщик</th>
                <th className="px-4 py-2">Материал</th>
                <th className="px-4 py-2">Кол-во</th>
                <th className="px-4 py-2">Статус</th>
                <th className="px-4 py-2">Дата</th>
                <th className="print-hidden px-4 py-2">Действие</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o, i) => {
                const daysSince = dayjs().diff(dayjs(o.date), "day");
                  const isOverdue =
                    (o.status === "Ожидает" && daysSince > 5) ||
                    (o.status === "В пути" && daysSince > 10) ||
                    (o.status === "Отгружен" && o.overdueBeforeShipped);

                return (
                  <tr key={i} className={`hover:bg-gray-50 ${isOverdue ? "bg-red-50" : ""}`}>
                    <td className="px-4 py-2">{o.supplier}</td>
                    <td className="px-4 py-2">{o.item}</td>
                    <td className="px-4 py-2">{o.quantity}</td>
                    <td className="px-4 py-2">{o.status}</td>
                    <td className="px-4 py-2">{o.date}
                      {isOverdue && (
                        <span className="ml-2 text-red-600 font-semibold">⚠ Просрочено</span>
                      )}
                    </td>
                    <td className="print-hidden px-4 py-2 space-x-3">
                      <Link to={`/orders/edit/${i}`} className="text-blue-600 hover:underline">
                        Редактировать
                      </Link>
                      <button
                        onClick={() => handleDelete(i)}
                        className="text-red-600 hover:underline"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="print-footer hidden print:block mt-8 text-sm">
            Печать выполнена через систему “VKR Logistica”
          </div>
        </div>
      )}
    </div>
  );
}

/*
<div className="bg-white p-4 rounded shadow print-area">
  <div className="print-header hidden">
    <h1>📦 Заказы</h1>
    <div className="date">Дата печати: {today}</div>
  </div>
  <table className="w-full text-left table-auto print-table">
    <thead>
      <tr>
        <th>Дата</th>
        <th>Поставщик</th>
        <th>Материал</th>
        <th>Количество</th>
        <th>Статус</th>
      </tr>
    </thead>
    <tbody>
      {orders.map(...)}
    </tbody>
  </table>
</div>
<div className="flex justify-end mt-4 print-hidden">
  <button onClick={() => window.print()} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    🖨️ Печать
  </button>
</div>


<td className="px-4 py-2">
  {o.date}
  {(isOverdue || o.overdueBeforeShipped) && (
    <span className="ml-2 text-red-600 font-semibold">⚠ Просрочено</span>
  )}
</td>

*/