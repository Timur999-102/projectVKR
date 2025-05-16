/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderCreate() {
  const [supplier, setSupplier] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('Ожидает');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Здесь можно будет отправить данные на backend
    const newOrder = { supplier, item, quantity, status, date };
    console.log('Новый заказ:', newOrder);

    // Вернуться на страницу заказов
    navigate('/orders');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Создание нового заказа</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium">Поставщик</label>
          <input
            type="text"
            className="mt-1 w-full border px-3 py-2 rounded"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Материал</label>
          <input
            type="text"
            className="mt-1 w-full border px-3 py-2 rounded"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Количество</label>
          <input
            type="number"
            className="mt-1 w-full border px-3 py-2 rounded"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Статус</label>
          <select
            className="mt-1 w-full border px-3 py-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Ожидает</option>
            <option>Отгружен</option>
            <option>В пути</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Дата</label>
          <input
            type="date"
            className="mt-1 w-full border px-3 py-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Сохранить
        </button>
      </form>
    </div>
  );
}*/


//новый вариант с оформлением
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderCreate() {
  const [supplier, setSupplier] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('Ожидает');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = { supplier, item, quantity, status, date };
    console.log('Новый заказ:', newOrder);
    navigate('/orders');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Создание нового заказа</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Поставщик</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-300"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Материал</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-300"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Количество</label>
          <input
            type="number"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-300"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
          <select
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Ожидает</option>
            <option>Отгружен</option>
            <option>В пути</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
          <input
            type="date"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-300"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Сохранить заказ
        </button>
      </form>
    </div>
  );
}
