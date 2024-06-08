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
        <img src={product.image_url} alt={product.product_name} />
      </div>
      <div className="details-container">
        <h3>{product.product_name}</h3>
        <p>{`Ksh: ${product.price}`}</p>
        <p>{`Rating: ${product.rating}`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
