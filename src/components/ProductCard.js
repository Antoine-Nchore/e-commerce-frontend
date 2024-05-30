import React from "react";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="details-container">
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <p>{`Rating: ${product.rating}`}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
