import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar";
import "../styles/App.css";

function Home({ onAddToCart, product, searchTerm }) {
  const [filteredProducts, setFilteredProducts] = useState(product);

  useEffect(() => {
    let updatedProducts = product;

    if (searchTerm) {
      updatedProducts = product.filter((prod) =>
        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [product, searchTerm]);

  const filterProductsByCategory = (selectedCategory) => {
    if (selectedCategory === "all") {
      setFilteredProducts(product);
    } else {
      const filtered = product.filter(
        (prod) => prod.category === selectedCategory
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
        {filteredProducts.length > 0 ? (
          <ProductList onAddToCart={onAddToCart} products={filteredProducts} />
        ) : (
          <div className="no-results-message">
            <h1>Found 0 ads in Mill</h1>
            <h3>
              Unfortunately, we did not find anything that matches these
              criteria.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
