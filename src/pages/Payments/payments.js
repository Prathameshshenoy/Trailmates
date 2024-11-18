import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './payments.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('address');
  const [formData, setFormData] = useState({
    // Address details
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    
    // Payment details
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the payment
    console.log('Processing payment:', formData);
    // Navigate to order confirmation page
    navigate('/order-confirmation');
  };

  const handleBack = () => {
    navigate('/cart');
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <h1 className="payment-title">Checkout</h1>
          <button className="back-button" onClick={handleBack}>
            Back to Cart
          </button>
        </div>

        <div className="payment-sections">
          {/* Progress indicator */}
          <div className="progress-bar">
            <div 
              className={`progress-step ${activeSection === 'address' ? 'active' : ''}`}
              onClick={() => setActiveSection('address')}
            >
              1. Shipping Address
            </div>
            <div 
              className={`progress-step ${activeSection === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveSection('payment')}
            >
              2. Payment Details
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Address Section */}
            <div className={`form-section ${activeSection === 'address' ? 'active' : ''}`}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="addressLine1">Address Line 1</label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">PIN Code</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button 
                type="button" 
                className="continue-btn"
                onClick={() => setActiveSection('payment')}
              >
                Continue to Payment
              </button>
            </div>

            {/* Payment Section */}
            <div className={`form-section ${activeSection === 'payment' ? 'active' : ''}`}>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cardName">Name on Card</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;