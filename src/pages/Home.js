import React, { useState } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar";
import "../styles/App.css";

function Home({ onAddToCart, product }) {
  const [filteredProducts, setFilteredProducts] = useState(product);

  const filterProductsByCategory = (selectedCategory) => {
    if (selectedCategory === "all") {
      setFilteredProducts(product);
    } else {
      const filtered = product.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="App">
      <Header />
      <FilterBar />
      <div className="content">
        <Sidebar onFilterCategory={filterProductsByCategory} />
        <ProductList onAddToCart={onAddToCart} product={filteredProducts} />
      </div>
    </div>
  );
}

export default Home;
