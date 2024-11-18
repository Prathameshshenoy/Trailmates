import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cartpage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [stockWarning, setStockWarning] = useState('');
  const [productStock, setProductStock] = useState({});
  const [totalStock, setTotalStock] = useState({}); // New state for total stock

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
    calculateTotal(items);
    setItemCount(items.reduce((acc, item) => acc + item.quantity, 0));
    
    // Fetch stock information for all cart items
    const fetchStockInfo = async () => {
      try {
        const stockData = {};
        const totalStockData = {}; // Store the total stock
        for (const item of items) {
          const response = await fetch(`http://localhost:8000/api/products/${item.id}`);
          if (response.ok) {
            const product = await response.json();
            stockData[item.id] = product.quantity;
            totalStockData[item.id] = product.quantity + item.quantity; // Add current cart quantity
          }
        }
        setProductStock(stockData);
        setTotalStock(totalStockData); // Set total stock
      } catch (error) {
        console.error('Error fetching stock info:', error);
      }
    };
    
    fetchStockInfo();
  }, []);

  const calculateTotal = (items) => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(subtotal);
  };

  const updateProductStock = async (productId, quantityChange) => {
    try {
      await fetch(`http://localhost:8000/api/products/${productId}/update-stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantityChange }),
      });
    } catch (error) {
      console.error('Error updating product stock:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  const handleRemoveItem = (itemId, itemQuantity) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    setItemCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));

    // Add the removed quantity back to the stock
    updateProductStock(itemId, itemQuantity);
    
    // Update available stock
    setProductStock(prev => ({
      ...prev,
      [itemId]: prev[itemId] + itemQuantity
    }));
  };

  const showStockWarning = (message) => {
    setStockWarning(message);
    setTimeout(() => setStockWarning(''), 3000);
  };

  const handleUpdateQuantity = async (itemId, amount) => {
    const item = cartItems.find(item => item.id === itemId);
    const newQuantity = item.quantity + amount;
    const maxAllowedQuantity = totalStock[itemId]; // Use total stock instead of current stock

    // Check if we're trying to increase quantity
    if (amount > 0) {
      // Verify against total stock
      if (newQuantity > maxAllowedQuantity) {
        showStockWarning(`Only ${maxAllowedQuantity} items available in total`);
        return;
      }
    }

    // If we're decreasing and already at 1, do nothing
    if (amount < 0 && item.quantity <= 1) {
      return;
    }

    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Update backend stock
    await updateProductStock(itemId, amount > 0 ? -1 : 1);

    // Update local state
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    setItemCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));

    // Update stock in state
    setProductStock(prev => ({
      ...prev,
      [itemId]: prev[itemId] + (amount > 0 ? -1 : 1)
    }));
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="cart-page">
      {stockWarning && <div className="stock-warning">{stockWarning}</div>}
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <button className="continue-shopping" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={`http://localhost:8000${item.image}`} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h2>{item.name}</h2>
                    <div className="item-price-mobile">
                      ₹{item.price.toFixed(2)}
                    </div>
                    
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        disabled={item.quantity >= totalStock[item.id]}
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id, item.quantity)}
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="item-price">
                    ₹{item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="summary-total">
                    <span>Total</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;