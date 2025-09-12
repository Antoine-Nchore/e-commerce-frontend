import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import "../styles/collection.css";

function Collection({ products, onAddToCart }) {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (prod) => prod.category.toLowerCase() === category.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [category, products]);

  const getBanner = () => {
    switch (category.toLowerCase()) {
      case "headphones":
        return "/assets/headphones-banner.jpg";
      case "laptops":
        return "/assets/laptops-banner.jpg";
      default:
        return "/assets/default-banner.jpg";
    }
  };

  return (
    <>
      <div className="collection-page">
        <Header banner={getBanner()} title={category} />
      </div>

      <div className="collection-container">
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h2>No products found in {category}</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default Collection;
