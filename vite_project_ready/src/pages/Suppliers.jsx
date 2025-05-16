import React, { useEffect, useState } from "react";
import { getSuppliers, saveSupplier, deleteSupplier } from "../services/supplierService";
//import { exportSuppliersToCSV } from "../utils/exportSuppliersCSV";
import dayjs from "dayjs";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const today = dayjs().format("DD.MM.YYYY");

  useEffect(() => {
    setSuppliers(getSuppliers());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSupplier = { name, contact };
    saveSupplier(newSupplier);
    setSuppliers(getSuppliers());
    setName("");
    setContact("");
  };

  const handleDelete = (index) => {
  deleteSupplier(index);
  setSuppliers(getSuppliers());
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="print-hidden text-2xl font-bold mb-6">Поставщики</h1>

      <form onSubmit={handleSubmit} className="print-hidden bg-white p-4 rounded shadow mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Контактная информация</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Добавить поставщика
        </button>
      </form>

      {suppliers.length > 0 && (
        /*<button
          onClick={() => exportSuppliersToCSV(suppliers)}
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

      {suppliers.length === 0 ? (
        <p className="text-gray-600">Поставщиков пока нет.</p>
      ) : (
        <div className="bg-white p-4 rounded shadow print-area">
          <div className="print-header hidden">
            <h1>📋 Поставщики</h1>
            <div className="date">Дата печати: {today}</div>
          </div>
          <table className="w-full bg-white border rounded shadow text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Название</th>
                <th className="px-4 py-2">Контакт</th>
                <th className="print-hidden px-4 py-2">Действие</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.contact}</td>
                  <td className="print-hidden px-4 py-2">
                    <button
                      onClick={() => handleDelete(i)}
                      className="text-red-600 hover:underline"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
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
    <h1>📋 Поставщики</h1>
    <div className="date">Дата печати: {today}</div>
  </div>
  <table className="w-full text-left table-auto print-table">
    <thead>
      <tr>
        <th>Название</th>
        <th>Надёжность</th>
        <th>Всего заказов</th>
        <th>Активных</th>
      </tr>
    </thead>
    <tbody>
      {suppliers.map(...)}
    </tbody>
  </table>
</div>
<div className="flex justify-end mt-4 print-hidden">
  <button onClick={() => window.print()} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    🖨️ Печать
  </button>
</div>
*/