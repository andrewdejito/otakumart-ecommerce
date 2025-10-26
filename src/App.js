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
import { CartProvider } from './context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';  
import './styles/App.css';                      


function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* Keep other routes you had */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
