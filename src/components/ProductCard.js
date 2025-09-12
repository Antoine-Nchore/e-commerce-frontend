import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

const handleClick = () => {
  let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
  viewed = viewed.filter((p) => p.id !== product.id);
  viewed.unshift(product);
  localStorage.setItem("recentlyViewed", JSON.stringify(viewed));

  navigate(`/product/${product.id}`);
  
  // Scroll to top after navigation
  window.scrollTo({
    top: 0,
    behavior: "smooth", // optional, smooth scrolling
  });
};


  // Stock bar logic without maxQuantity
  let stockWidth = "10%";
  let stockColor = "red";

  if (product.quantity > 50) {
    stockWidth = "75%";
    stockColor = "teal";
  } else if (product.quantity > 10) {
    stockWidth = "25%";
    stockColor = "orange";
  } else {
    stockWidth = "5%"; // very small
    stockColor = "red";
  }

  return (
    <div className="custom-product-card">
      <div className="custom-image-container" onClick={handleClick}>
        <img src={product.image_url} alt={product.product_name} />
      </div>

      <div className="custom-separator"></div>

      <div className="custom-details-container">
        <h3 className="custom-product-name" onClick={handleClick}>
          {product.product_name}
        </h3>
        <p className="custom-product-price">{`Ksh: ${product.price}`}</p>
        <p className="custom-product-quantity">{`${product.quantity} items left`}</p>

        {/* Stock Indicator */}
        <div className="stock-indicator">
          <div
            className="stock-indicator-fill"
            style={{ width: stockWidth, backgroundColor: stockColor }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
