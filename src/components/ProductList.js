// src/components/ProductList.js
import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../styles/ProductList.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductList = ({ products, title, seeAllRoute }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  const showLimit = 5;
  const displayedProducts =
    products.length > showLimit ? products.slice(0, showLimit) : products;

  return (
    <div className="product-list-wrapper">
      {title && (
        <div className="product-list-header">
          <h2 className="extra-title">
            {title} <span>({products.length})</span>
          </h2>
          {seeAllRoute && products.length > 1 && (
            <button
              className="see-all-btn"
              onClick={() => navigate(seeAllRoute)}
            >
              See All &gt;
            </button>
          )}
        </div>
      )}

      {/* Desktop & Tablet Grid */}
      <div className="desktop-grid">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="mobile-slider">
        <Swiper spaceBetween={15} slidesPerView={2}>
          {displayedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductList;
