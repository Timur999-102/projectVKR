import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderCreate from "./pages/OrderCreate";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow p-4 flex space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Дашборд</Link>
          <Link to="/orders" className="text-blue-600 hover:underline">Заказы</Link>
          <Link to="/orders/new" className="text-blue-600 hover:underline">+ Заказ</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/new" element={<OrderCreate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;