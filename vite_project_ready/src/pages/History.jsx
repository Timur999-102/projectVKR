import React, { useEffect, useState } from "react";
import { getOrders } from "../services/orderService";
import dayjs from "dayjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


export default function History() {
  const [chartData, setChartData] = useState([]);
  const [period, setPeriod] = useState("all"); // "7", "30", "all"

  useEffect(() => {
    const orders = getOrders();

    const now = dayjs();
    const startDate =
      period === "7"
        ? now.subtract(6, "day")//включая сегодня
        : period === "30"
        ? now.subtract(29, "day")
        : null;

    const grouped = {};

    orders.forEach((order) => {
      if (!order.date) return;

      const orderDate = dayjs(order.date);
      if (startDate && orderDate.isBefore(startDate)) return;

      const formatted = orderDate.format("YYYY-MM-DD");
      grouped[formatted] = (grouped[formatted] || 0) + 1;
    });    

    const result = [];

    if (startDate) {
    // Генерируем каждую дату с count = 0 по умолчанию
    for (let d = startDate; d.isBefore(now) || d.isSame(now, "day"); d = d.add(1, "day")) {
      const dateStr = d.format("YYYY-MM-DD");
      result.push({
        date: dateStr,
        count: grouped[dateStr] || 0,
      });
    }
  } else {
    // Без фильтра — просто показываем все, что есть
    Object.entries(grouped)
      .sort(([a], [b]) => dayjs(a).isAfter(dayjs(b)) ? 1 : -1)
      .forEach(([date, count]) => result.push({ date, count }));
  }

    setChartData(result);
  }, [period]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📈 История заказов</h1>

      {chartData.length === 0 ? (
        <p className="text-gray-600">Нет данных для отображения.</p>
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <div className="flex space-x-3 mb-4">
            <button
              className={`px-3 py-1 rounded ${
                period === "7" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setPeriod("7")}
            >
              Последние 7 дней
            </button>
            <button
              className={`px-3 py-1 rounded ${
                period === "30" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setPeriod("30")}
            >
              Последние 30 дней
            </button>
            <button
              className={`px-3 py-1 rounded ${
                period === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setPeriod("all")}
            >
              Всё время
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

