import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar";
import "../styles/App.css";
import "../styles/ProductCard.css"; 

function Home({ onAddToCart, products, searchTerm }) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let updatedProducts = products;

    if (searchTerm) {
      updatedProducts = products.filter((prod) =>
        prod.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [products, searchTerm]);

  const filterProductsByCategory = (selectedCategory) => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
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
          <div className="product-grid">
            <ProductList onAddToCart={onAddToCart} products={filteredProducts} />
          </div>
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