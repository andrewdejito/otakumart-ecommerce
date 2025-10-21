import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderList from './components/Orders/OrderList';
import OrderDetails from './components/Orders/OrderDetails';
import AdminLogin from './components/Admin/AdminLogin';
import AdminProductForm from './components/Admin/AdminProductForm';
import { CartProvider } from './context/CartContext';
import './styles/App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/products" element={<AdminProductForm />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
