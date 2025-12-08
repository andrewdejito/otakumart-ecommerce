// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Homepage from './components/HomePage';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminLogin from './components/Admin/AdminLogin';
import AdminProductForm from "./components/Admin/AdminProductForm";
import OrderList from './components/Orders/OrderList';
import OrderDetails from './components/Orders/OrderDetails';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from "./context/AuthContext";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />

          <div>
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<Homepage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              {/* Admin Pages */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/products" element={<AdminProductForm />} />
              <Route path="/admin/orders" element={<OrderList />} />
              <Route path="/admin/orders/:id" element={<OrderDetails />} />
            </Routes>
          </div>

          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
