import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // Remove decimal places
  }).format(product.price);

  // Format original price if it exists
  const formattedOriginalPrice = product.originalPrice 
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(product.originalPrice)
    : null;

  // Calculate discount percentage if both prices are available
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <Link to={`/shop/${product._id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={`http://localhost:8000${product.image}`} 
            alt={product.name} 
            className="product-image" 
          />
          {product.isNewArrival && <span className="badge new">New</span>}
          {discountPercentage > 0 && (
            <span className="badge discount">{discountPercentage}% OFF</span>
          )}
        </div>
        
        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <h3 className="product-name">{product.name}</h3>
          
          <div className="product-price">
            <span className="current-price">{formattedPrice}</span>
            {formattedOriginalPrice && (
              <span className="original-price">{formattedOriginalPrice}</span>
            )}
            {discountPercentage > 0 && (
              <span className="discount-tag">{discountPercentage}% off</span>
            )}
          </div>

          {product.stockStatus && (
            <div className={`stock-status ${product.stockStatus.toLowerCase()}`}>
              {product.stockStatus}
            </div>
          )}
        </div>
      </Link>

      {/* <div className="product-actions">
        <button className="action-button view-details">
          Buy Now
        </button>
      </div> */}
    </div>
  );
};

export default ProductCard;
