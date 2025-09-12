import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "../styles/recent.css";

const Recent = ({ onAddToCart, onDecrementFromCart }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const storedRecentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(storedRecentlyViewed);
  }, []);

  return (
    <div className="recent-container">
      <h2>Recently Viewed Products</h2>
      {recentlyViewed.length > 0 ? (
        <div className="product-grid">
          {recentlyViewed.map((product, index) => (
            <Card
              key={index}
              product={product}
              onAddToCart={onAddToCart}
              onDecrementFromCart={onDecrementFromCart}
            />
          ))}
        </div>
      ) : (
        <p>No recently viewed products yet.</p>
      )}
    </div>
  );
};

export default Recent;
