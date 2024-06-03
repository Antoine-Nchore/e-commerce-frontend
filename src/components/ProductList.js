import React from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductList.css";

const ProductList = ({ onAddToCart, product }) => {
  return (
    <div className="product-list">
      {product.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
