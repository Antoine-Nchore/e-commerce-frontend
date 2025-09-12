import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/wishlist.css";

const Wishlist = ({ cartItems, onAddToCart, onDecrementFromCart }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, []);

  const removeItem = (itemId) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== itemId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleCardClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const isInCart = (productId) => cartItems.find((item) => item.id === productId);

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1 className="wishlist-title">
          Wishlist <span className="wishlist-count">({wishlistItems.length})</span>
        </h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <h3>Your wishlist is empty</h3>
          <p>Add some items to see them here!</p>
        </div>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map((item) => {
            const cartItem = isInCart(item.id);
            const maxQuantity = item.quantity ?? Infinity; // fallback if undefined

            return (
              <div key={item.id} className="wishlist-item">
                <div className="item-image-container">
                  <img
                    src={item.image_url || item.image}
                    alt={item.product_name || item.name}
                    className="item-image"
                    onClick={() => handleCardClick(item)}
                  />
                </div>

                <div className="item-details">
                  <h3 className="item-title" onClick={() => handleCardClick(item)}>
                    {item.product_name || item.name}
                  </h3>
                  <div className="item-pricing">
                    <span className="current-price">KSh {item.price}</span>
                  </div>
                </div>

                <div className="item-actions">
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>

                  {!cartItem ? (
                    <button className="add-to-cart-btn" onClick={() => onAddToCart(item)}>
                      Add to Cart
                    </button>
                  ) : (
                    <div className="quantity-controls">
                      <button
                        className="decrement-btn"
                        disabled={cartItem.quantity <= 1}
                        onClick={() => onDecrementFromCart(item)}
                      >
                        –
                      </button>
                      <span className="quantity">{cartItem.quantity}</span>
                      <button
                        className="increment-btn"
                        onClick={() => onAddToCart(item)}
                        disabled={cartItem.quantity >= maxQuantity} // ✅ disable when cart quantity reaches stock
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
