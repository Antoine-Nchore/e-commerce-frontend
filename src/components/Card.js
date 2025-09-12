// src/components/Card.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import "../styles/recent.css";

const Card = ({ product, onAddToCart, onDecrementFromCart }) => {
  const [cartItem, setCartItem] = useState(null);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = storedCart.find((i) => i.id === product.id);
    setCartItem(item);
  }, [product.id]);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const availableStock = product.quantity ?? Infinity;

  // Render stars with half-star support
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="rc-star" fill="currentColor" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span className="rc-star-half" key="half">
          <Star className="rc-star empty" />
          <span className="rc-half-fill">
            <Star className="rc-star" fill="currentColor" />
          </span>
        </span>
      );
    }

    const remaining = 5 - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<Star key={`empty-${i}`} className="rc-star empty" />);
    }

    return stars;
  };

  // Handle Add
  const handleAdd = () => {
    onAddToCart(product);
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = updatedCart.find((i) => i.id === product.id);
    setCartItem(item);
  };

  // Handle Decrement
  const handleDecrement = () => {
    onDecrementFromCart(product);
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = updatedCart.find((i) => i.id === product.id);
    setCartItem(item);
  };

  return (
    <div className="product-card">
      <img
        src={product.image_url || `images/${product.image_url}`}
        alt={product.title || product.product_name}
        onClick={handleCardClick}
      />
      <h3 onClick={handleCardClick}>{product.title || product.product_name}</h3>
      <p className="price">KSh {product.price}</p>

      {product.rating && (
        <div className="rating">
          {renderStars(product.rating)}
          <span className="rating-value">({product.rating})</span>
        </div>
      )}

      <div className="card-actions">
        {!cartItem ? (
          <button className="add-to-cart" onClick={handleAdd}>
            Add to Cart
          </button>
        ) : (
          <div className="quantity-controls">
            <button
              className="decrement-btn"
              disabled={cartItem.quantity <= 1}
              onClick={handleDecrement}
            >
              –
            </button>
            <span className="quantity">{cartItem.quantity}</span>
            <button
              className="increment-btn"
              onClick={handleAdd}
              disabled={cartItem.quantity >= availableStock}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
