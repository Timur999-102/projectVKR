import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderCreate from "./pages/OrderCreate";
import OrderEdit from "./pages/OrderEdit";
import Suppliers from "./pages/Suppliers";
import History from "./pages/History";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import SaleCreate from "./pages/SaleCreate";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow p-4 flex space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Аналитика</Link>
          <Link to="/orders" className="text-blue-600 hover:underline">Заказы</Link>
          <Link to="/suppliers" className="text-blue-600 hover:underline">Поставщики</Link>
          <Link to="/inventory" className="text-blue-600 hover:underline">Склад</Link>
          <Link to="/sales" className="text-blue-600 hover:underline">Продажи</Link>
          <Link to="/history" className="text-blue-600 hover:underline">История</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/new" element={<OrderCreate />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/orders/edit/:index" element={<OrderEdit />} />
          <Route path="/history" element={<History />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/new" element={<SaleCreate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
