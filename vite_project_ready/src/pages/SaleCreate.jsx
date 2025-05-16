import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSale } from "../services/saleService";
import { getInventory } from "../services/inventoryService";

export default function SaleCreate() {
  const navigate = useNavigate();
  const inventory = getInventory();

  const [item, setItem] = useState(inventory[0]?.item || "");
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [client, setClient] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addSale({ item, quantity: parseInt(quantity), date, client });
    navigate("/sales");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">➕ Добавить продажу</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Товар</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          >
            {inventory.map((m, i) => (
              <option key={i} value={m.item}>
                {m.item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Количество</label>
          <input
            type="number"
            min="1"
            className="w-full border px-3 py-2 rounded"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
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
        <div>
          <label className="block text-sm font-medium mb-1">Покупатель (необязательно)</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Сохранить продажу
        </button>
      </form>
    </div>
  );
}
