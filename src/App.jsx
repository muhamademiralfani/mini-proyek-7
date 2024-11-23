/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './layouts/SideBar';
import Header from './layouts/Header';
import NotFound from './pages/NotFound';
import MainDashboard from './pages/MainDashboard';
import ProductList from './pages/ProductList';
import InputProduct from './components/InputProduct';
import ProductDetail from './pages/ProductDetail';
import ScanProduct from './components/ScanProduct ';
import ManageStock from './pages/ManageStock';
import ProductLog from './pages/ProductLog';
import Settings from './pages/Settings';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <Router>
      <div className="grid-container">
      <Header onToggleSidebar={toggleSidebar} />
      <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add" element={<InputProduct />} />
          <Route path="/edit/:id" element={<InputProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/scan" element={<ScanProduct />} />
          <Route path="/stock" element={<ManageStock />} />
          <Route path="/logs" element={<ProductLog />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
