import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [supplierStats, setSupplierStats] = useState([]);
  const [statusStats, setStatusStats] = useState([]);
  const [topSupplier, setTopSupplier] = useState(null);
  const [reliabilityStats, setReliabilityStats] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);

    //Активный поставщик за 30 дней
    const last30Days = dayjs().subtract(30, "day");
    const recentOrders = stored.filter((o) => o.date && dayjs(o.date).isAfter(last30Days));

    const recentCounts = recentOrders.reduce((acc, order) => {
      acc[order.supplier] = (acc[order.supplier] || 0) + 1;
      return acc;
    }, {});

    const sorted = Object.entries(recentCounts).sort((a, b) => b[1] - a[1]);
    if (sorted.length > 0) {
      const [top, count] = sorted[0];
      setTopSupplier({ name: top, count });
    }else {
      setTopSupplier(null);
    }

    // 1. Группировка по поставщику
    const supplierCounts = stored.reduce((acc, order) => {
      acc[order.supplier] = (acc[order.supplier] || 0) + 1;
      return acc;
    }, {});
    const supplierData = Object.entries(supplierCounts).map(([name, count]) => ({ name, count }));
    setSupplierStats(supplierData);

    // 2. Группировка по статусу
    const statusCounts = stored.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
    setStatusStats(statusData);

    // Надежность поставшика
    const today = dayjs();

    const statsMap = {};

    stored.forEach((order) => {
      if (!order.supplier || !order.date) return;

      const supplier = order.supplier;
      const orderDate = dayjs(order.date);
      const daysInTransit = today.diff(orderDate, "day");

      // Просроченные условия:
      const isOverdue =
        (order.status === "Ожидает" && daysInTransit > 5) ||
        (order.status === "В пути" && daysInTransit > 10) ||
        order.overdueBeforeShipped;

      if (!statsMap[supplier]) {
        statsMap[supplier] = { total: 0, overdue: 0 };
      }

      statsMap[supplier].total += 1;
      if (isOverdue) {
        statsMap[supplier].overdue += 1;
      }
    });

    const reliability = Object.entries(statsMap).map(([supplier, { total, overdue }]) => ({
      name: supplier,
      percent: Math.round(100 - (overdue / total) * 100),
    }));

    setReliabilityStats(reliability);


  }, []);

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Аналитика</h1>
      <p className="mb-6 text-gray-700">
        Добро пожаловать в систему управления закупками.
      </p>

      {/* 📊 Диаграмма по статусам */}
      <h2 className="text-xl font-semibold mb-2">Статистика по статусам</h2>
      <div className="bg-white p-4 rounded shadow w-full max-w-2xl mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusStats}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {statusStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📦 Рейтинг поставщиков */}
      <h2 className="text-xl font-semibold mb-2">Рейтинг поставщиков</h2>
      {topSupplier && (
        <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded mt-6 mb-8 max-w-xl">
          <strong>🔥 Активный поставщик за 30 дней:</strong> {topSupplier.name} — {topSupplier.count} заказ(ов)
        </div>
      )}
      <div className="bg-white p-4 rounded shadow w-full max-w-3xl">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={supplierStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📦 Надежность поставщиков */}
      <h2 className="text-xl font-semibold mb-2 mt-6">📉 Надёжность поставщиков</h2>
      <div className="bg-white p-4 rounded shadow w-full max-w-3xl">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reliabilityStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Bar dataKey="percent" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;


