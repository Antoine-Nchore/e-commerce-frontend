import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";
import "../styles/Home.css";
import ProductList from "../components/ProductList";

function Home({ products }) {
  const navigate = useNavigate();
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const handleCategoryClick = (category) => {
    navigate(`/collection/${category.toLowerCase()}`);
  };

    const handleClick = () => {
    navigate("/about");
  };

  // Load recently viewed products from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("recentlyViewed");
    if (storedProducts) {
      setRecentlyViewed(JSON.parse(storedProducts));
    }
  }, []);

  return (
     <>
    <div className="App">
 {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <div className="hero-text">
          <h1>Your Everyday Marketplace</h1>
            <p>
              Discover quality products at unbeatable prices — from fashion to tech, 
              home essentials to lifestyle must-haves. Shop smart, save more, and 
              enjoy a seamless shopping experience with Mill.
            </p>
            <button className="learn-more-btn" onClick={handleClick}>Learn More</button>
          </div>
          <div className="hero-visual">
            <div className="platform-container">
              <div className="platform platform-1">
                <div className="product-group">
                  <div className="product-item suitcase">🧳</div>
                  <div className="product-item laptop">💻</div>
                </div>
              </div>
              <div className="platform platform-2">
                <div className="product-group">
                  <div className="product-item groceries">🛒</div>
                  <div className="product-item games">🎮</div>
                </div>
              </div>
              <div className="platform platform-3">
                <div className="product-group">
                  <div className="product-item bags">👜</div>
                  <div className="product-item tech">📱</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop Our Top Categories</h2>
        <Category onSelectCategory={handleCategoryClick} />
      </section>

    
    </div>
    
      <div className="viewed-section">
          {recentlyViewed && recentlyViewed.length > 0 ? (
            <ProductList products={recentlyViewed}
    title="Your Recent Finds"
    seeAllRoute="/recent" />
          ) : (
            <p>No recently viewed products yet.</p>
          )}
        </div>
     </>
  );
}

export default Home;
