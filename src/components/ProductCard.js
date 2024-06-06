import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="image-container">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="details-container">
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <p>{`Rating: ${product.rating}`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
