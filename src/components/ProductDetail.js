import React from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";

const ProductDetail = ({ products, onAddToCart }) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <div className="image-container">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="details-container">
        <h1>{product.name}</h1>
        <p>{product.price}</p>
        <p>{`Rating: ${product.rating}`}</p>
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
