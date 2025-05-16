import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInventory } from "../services/inventoryService";
import { getSales } from "../services/saleService";
import dayjs from "dayjs";

export default function Inventory() {
  const [materials, setMaterials] = useState([]);
  const today = dayjs().format("DD.MM.YYYY");

  useEffect(() => {
    const inventory = getInventory();
    const sales = getSales();
    const last30 = dayjs().subtract(30, "day");

    const stats = {};

    sales.forEach((s) => {
      if (!s.item || !s.date) return;
      const date = dayjs(s.date);
      if (date.isBefore(last30)) return;

      stats[s.item] = (stats[s.item] || 0) + parseInt(s.quantity || 1);
    });


  const result = inventory.map((inv) => {
    const totalUsed = stats[inv.item] || 0;
    const avgPerDay = totalUsed / 30;
    const daysLeft = avgPerDay > 0 ? Math.floor(inv.stock / avgPerDay) : "∞";
    // Автоматический минимум: расход * 14
    const autoMin = Math.ceil(avgPerDay * 14);
    // Рекомендуемое количество: максимум между недостающим до min и на 14 дней
    const recommended = Math.max(0, autoMin - inv.stock, inv.min - inv.stock);

    return {
      ...inv,
      avgPerDay: avgPerDay.toFixed(2),
      min: autoMin,
      daysLeft,
      recommend: (daysLeft !== "∞" && daysLeft < 14) || inv.stock < autoMin,
      recommended,
    };
  });

  setMaterials(result);
}, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📦 Склад: анализ запасов</h1>
      <div className="bg-white p-4 rounded shadow print-area">
        <div className="print-header hidden">
          <div className="date">Дата печати: {today}</div>
        </div>
        <table className="w-full text-left table-auto print-table">
          <thead>
            <tr>
              <th className="py-2 px-3">Материал</th>
              <th className="py-2 px-3">Остаток</th>
              <th className="py-2 px-3">Мин. запас</th>
              <th className="py-2 px-3">Средний расход/день</th>
              <th className="py-2 px-3">Прогноз (дней)</th>
              <th className="py-2 px-3">Статус</th>
              <th className="px-4 py-2">Рекомендуем закупить</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((m, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-3">{m.item}</td>
                <td className="py-2 px-3">{m.stock}</td>
                <td className="py-2 px-3">{m.min}</td>
                <td className="py-2 px-3">{m.avgPerDay}</td>
                <td className="py-2 px-3">{m.daysLeft}</td>
                <td className="py-2 px-3">
                  {m.recommend ? (
                    <span className="text-red-600 font-semibold">🔻 Требуется пополнение</span>
                  ) : (
                    <span className="text-green-600">✅ Достаточно</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {m.recommended > 0 ? (
                    <>
                      <span className="font-medium text-blue-700">{m.recommended}</span>
                      <Link 
                        to={`/orders/new?item=${encodeURIComponent(m.item)}&qty=${m.recommended}`}
                        className="ml-2 text-blue-600 underline text-sm"
                      >
                        Заказать
                      </Link>
                    </>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="print-footer hidden print:block mt-8 text-sm">
          Печать выполнена через систему “VKR Logistica”
        </div>
        <div className="flex justify-end mt-4 print-hidden">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            🖨️ Печать
          </button>
        </div>
      </div>
    </div>
  );
}

// Math.max(0, autoMin - inv.stock, inv.min - inv.stock),
/*<div className="bg-white p-4 rounded shadow print-area">
<div className="print-header hidden">
            <h1>📦 Склад — анализ запасов</h1>
            <div className="date">Дата печати: {today}</div>
          </div>
</div>*/

//
