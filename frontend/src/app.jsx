import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Suppliers from './pages/Suppliers';
import OrderCreate from './pages/OrderCreate';


function App() {
  return (
    <div className="bg-black text-white p-4 text-center text-xl">
      Тест Tailwind (должно быть белым на чёрном)
    </div>

    /*<Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow p-4 flex space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Дашборд</Link>
          <Link to="/orders" className="text-blue-600 hover:underline">Заказы</Link>
          <Link to="/suppliers" className="text-blue-600 hover:underline">Поставщики</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/orders/new" element={<OrderCreate />} />

        </Routes>
        <div className="bg-red-500 text-white p-4">Тест Tailwind</div>
      </div>
    </Router>*/
    
  );
}

export default App;

/*
//пример для проверки
import React from 'react';

function App() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-600">Привет из App.jsx</h1>
      <p className="text-gray-700">Это тестовое содержимое. Если ты его видишь — всё работает.</p>
    </div>
  );
}

export default App;*/
