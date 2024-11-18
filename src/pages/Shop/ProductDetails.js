import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [alertMessage, setAlertMessage] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product details');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(''), 3000); 
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity < 1) return;

    if (newQuantity > product.quantity) {
      showAlert(`Only ${product.quantity} items in stock`);
      return;
    }

    setQuantity(newQuantity);
  };

  const updateProductQuantity = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}/decrement`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) throw new Error('Failed to update product quantity');
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = existingCart.findIndex(item => item.id === cartItem.id);
    
    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    updateProductQuantity();
    showAlert('Item added to cart successfully!');
  };

  const handleBuyNow = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = existingCart.findIndex(item => item.id === cartItem.id);
    
    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    updateProductQuantity();
    navigate('/cart');
  };

  const isSoldOut = product?.quantity <= 0;

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="product-container">
      {alertMessage && <div className="alert-message">{alertMessage}</div>}
      <div className="product-grid">
        <div className="product-image-section">
          <div className={`image-wrapper ${isSoldOut ? 'sold-out' : ''}`}>
            <img src={`http://localhost:8000${product.image}`} alt={product.name} />
            {isSoldOut && <div className="sold-out-overlay">
              <span className="sold-out-text">Sold Out</span>
            </div>}
          </div>
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>

          {isSoldOut ? (
            <div className="stock-status">
              <div className="sold-out-badge">Sold Out</div>
              <p className="restock-message">This item is currently out of stock. Please check back later.</p>
            </div>
          ) : (
            <>
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>
                  -
                </button>
                <input type="text" className="quantity-input" value={quantity} readOnly />
                <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>
                  +
                </button>
              </div>

              <div className="product-actions">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button className="buy-now-btn" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;