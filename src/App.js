import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import TrailDetails from './pages/TrailDetails/TrailDetails';
import Shop from './pages/Shop/Shop';
import ProductDetails from './pages/Shop/ProductDetails';
import Community from './pages/Community/Community';
import About from './pages/About/about'; // Import About component
import CartPage from './pages/Cart/cartpage'; // Adjust the import path as needed
import PaymentPage from './pages/Payments/payments';
import OrderConfirmation from './pages/order-confirmation/orderconf';


import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="app">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/trails/:id" element={<TrailDetails />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetails />} />
        <Route path="/community" element={<Community />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </div>
  );
}

export default App;
