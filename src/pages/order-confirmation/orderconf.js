import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './orderconf.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('cart');
  }, []);

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-content">
          <div className="check-mark">✓</div>
          <h1 className="confirmation-title fade-in">Order Confirmed!</h1>
          <p className="confirmation-message slide-up">
            Thanks for placing an order. You will receive a confirmation soon.
          </p>
          <button className="continue-shopping-btn slide-up-delay" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
