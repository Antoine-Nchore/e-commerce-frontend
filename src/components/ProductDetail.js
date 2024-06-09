import React from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";

const ProductDetail = ({ products, onAddToCart }) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id, 10));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <div className="image-container">
        <img src={product.image_url} alt={product.product_name} />
      </div>
      <div className="details-container">
        <h1>{product.product_name}</h1>
        <p>{product.description}</p>
        <p>{`Ksh: ${product.price}`}</p>
        <p>{`Rating: ${product.rating}`}</p>
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
