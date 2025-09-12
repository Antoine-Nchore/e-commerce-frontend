// src/components/SearchResults.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/search.css";

const SearchResults = ({ products = [], onAddToCart, onDecrementFromCart }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // Get search query from URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  useEffect(() => {
    // Filter products based on search query
    if (query && products.length > 0) {
      const filteredProducts = products.filter(
        (product) =>
          product.product_name.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProducts);
    }
    setLoading(false);
  }, [query, products]);

  useEffect(() => {
    // Load wishlist & cart from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    let updatedWishlist;

    if (isInWishlist) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? "star filled" : "star"}
      />
    ));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getCartItem = (productId) =>
    cartItems.find((item) => item.id === productId);

  if (loading) {
    return (
      <div className="search-loading">
        <div className="loading-spinner"></div>
        <p>Searching for products...</p>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-header">
        <h1>Search Results for "{query}"</h1>
        <p className="results-count">
          {searchResults.length}{" "}
          {searchResults.length === 1 ? "product" : "products"} found
        </p>
      </div>

      {searchResults.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h2>No products found</h2>
          <p>We couldn't find any products matching "{query}"</p>
          <div className="search-suggestions">
            <h3>Try:</h3>
            <ul>
              <li>Checking your spelling</li>
              <li>Using fewer keywords</li>
              <li>Using more general terms</li>
              <li>Browsing our categories</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="search-results-grid">
          {searchResults.map((product) => {
            const isInWishlist = wishlist.some((item) => item.id === product.id);
            const cartItem = getCartItem(product.id);
            const availableStock = product.quantity ?? Infinity;

            return (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="product-image"
                    onClick={() => handleProductClick(product.id)}
                  />
                  <button
                    className={`wishlist-btn ${isInWishlist ? "active" : ""}`}
                    onClick={() => handleWishlistToggle(product)}
                  >
                    {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  {product.quantity === 0 && (
                    <div className="out-of-stock-overlay">Out of Stock</div>
                  )}
                </div>

                <div className="product-info">
                  <h3
                    className="product-name"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.product_name}
                  </h3>

                  <div className="product-rating">
                    {renderStars(product.rating)}
                    <span className="rating-text">({product.rating})</span>
                  </div>

                  <div className="product-pricing">
                    <span className="current-price">Ksh {product.price}</span>
                    {product.original_price && (
                      <span className="original-price">
                        Ksh {product.original_price}
                      </span>
                    )}
                  </div>

                  <div className="product-category">
                    <span className="category-tag">{product.category}</span>
                  </div>

                  <div className="card-actions">
                    {!cartItem ? (
                      <button
                        className={`add-to-cart-btn ${
                          product.quantity === 0 ? "disabled" : ""
                        }`}
                        onClick={() => {
                          if (product.quantity > 0) {
                            onAddToCart(product);
                            const updatedCart =
                              JSON.parse(localStorage.getItem("cart")) || [];
                            setCartItems(updatedCart);
                          }
                        }}
                        disabled={product.quantity === 0}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="quantity-controls">
                        <button
                          className="decrement-btn"
                          disabled={cartItem.quantity <= 1}
                          onClick={() => {
                            onDecrementFromCart(product);
                            const updatedCart =
                              JSON.parse(localStorage.getItem("cart")) || [];
                            setCartItems(updatedCart);
                          }}
                        >
                          –
                        </button>
                        <span className="quantity">{cartItem.quantity}</span>
                        <button
                          className="increment-btn"
                          onClick={() => {
                            onAddToCart(product);
                            const updatedCart =
                              JSON.parse(localStorage.getItem("cart")) || [];
                            setCartItems(updatedCart);
                          }}
                          disabled={cartItem.quantity >= availableStock}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Related Categories */}
      {searchResults.length > 0 && (
        <div className="related-categories">
          <h3>Related Categories</h3>
          <div className="category-tags">
            {[...new Set(searchResults.map((product) => product.category))].map(
              (category) => (
                <button
                  key={category}
                  className="category-filter-btn"
                  onClick={() => navigate(`/collection/${category.toLowerCase()}`)}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
