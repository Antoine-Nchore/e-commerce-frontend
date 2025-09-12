// src/components/Navbar.js
import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { BsFillBasketFill, BsPerson } from "react-icons/bs";
import { MapPin, ChevronDown } from "lucide-react";
import { AuthContext } from "../components/AuthContext";
import "../styles/Navbar.css";

const CATEGORIES = [
  { id: "furniture", name: "Furniture", icon: "🪑", iconClass: "furniture" },
  { id: "headphones", name: "Headphones", icon: "🎧", iconClass: "headphones" },
  { id: "sneakers", name: "Sneakers", icon: "👟", iconClass: "sneakers" },
  { id: "handbag", name: "HandBag", icon: "👜", iconClass: "handbag" },
  { id: "tech", name: "Tech", icon: "💻", iconClass: "tech" },
  { id: "books", name: "Books", icon: "📚", iconClass: "books" },
];

const Avatar = ({ firstName }) => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const abbreviation = firstName ? firstName.charAt(0).toUpperCase() : "U";

  return (
    <div className="avatar" style={{ backgroundColor: randomColor }}>
      {abbreviation}
    </div>
  );
};

/* Desktop categories dropdown (unchanged, uses CATEGORIES) */
const CategoriesDropdown = ({ products = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const categories = CATEGORIES.map((cat) => {
    const total = products
      .filter((p) => p.category.toLowerCase() === cat.id.toLowerCase())
      .reduce((sum, p) => sum + (p.quantity || 0), 0);

    return {
      ...cat,
      count: `${total} Ads Available`,
    };
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/collection/${categoryId}`);
    setIsOpen(false);
  };

  return (
    <div className="categories-dropdown" ref={dropdownRef}>
      <button
        className={`categories-trigger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Categories
        <ChevronDown className={`dropdown-arrow ${isOpen ? "open" : ""}`} size={16} />
      </button>

      <div className={`categories-dropdown-menu ${isOpen ? "show" : ""}`}>
        <div className="categories-dropdown-header">Popular Categories</div>
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-item"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className={`category-icon ${category.iconClass}`}>{category.icon}</div>
              <div className="category-details">
                <div className="category-name">{category.name}</div>
                <div className="category-count">{category.count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* SearchDropdown as before (unchanged) */
const SearchDropdown = ({ searchInput, products = [], onSearch, onCategoryClick, onProductClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredCategories = CATEGORIES.filter(category =>
    category.name.toLowerCase().includes(searchInput.toLowerCase()) && searchInput.length > 0
  );

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchInput.toLowerCase()) && searchInput.length > 0
  ).slice(0, 5);

  const shouldShowDropdown = searchInput.length > 0 && (filteredCategories.length > 0 || filteredProducts.length > 0);

  useEffect(() => {
    setIsOpen(shouldShowDropdown);
  }, [shouldShowDropdown]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (categoryId) => {
    onCategoryClick(categoryId);
    setIsOpen(false);
  };

  const handleProductClick = (productName) => {
    onProductClick(productName);
    setIsOpen(false);
  };

  return (
    <div className="search-dropdown" ref={dropdownRef}>
      <div className={`search-dropdown-menu ${isOpen ? "show" : ""}`}>
        {filteredCategories.length > 0 && (
          <>
            <div className="search-dropdown-header">Categories</div>
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="search-dropdown-item category-result"
                onClick={() => handleCategoryClick(category.id)}
              >
                <span className="item-icon">{category.icon}</span>
                <span className="item-text">{category.name}</span>
                <span className="item-type">Category</span>
              </div>
            ))}
          </>
        )}
        {filteredProducts.length > 0 && (
          <>
            {filteredCategories.length > 0 && <div className="search-dropdown-divider"></div>}
            <div className="search-dropdown-header">Products</div>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="search-dropdown-item product-result"
                onClick={() => handleProductClick(product.product_name)}
              >
                <img src={product.image_url} alt={product.product_name} className="product-image" />
                <div className="product-details">
                  <span className="product-name">{product.product_name}</span>
                  <span className="product-price">Ksh {product.price}</span>
                </div>
              </div>
            ))}
          </>
        )}
        {searchInput.length > 0 && (
          <>
            <div className="search-dropdown-divider"></div>
            <div className="search-dropdown-item show-all" onClick={() => onSearch(searchInput)}>
              <FaSearch className="search-icon-small" />
              <span>Search for "{searchInput}"</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


const Navbar = ({ onSearch, cartCount, products = [] }) => {
  const [searchInput, setSearchInput] = useState("");
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    if (onSearch) onSearch(searchInput);
    setSearchInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearchClick();
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/collection/${categoryId}`);
    setSearchInput("");
  };

  const handleProductClick = (productName) => {
    navigate(`/search?q=${encodeURIComponent(productName)}`);
    setSearchInput("");
  };

  const handleLogout = () => {
    logout();
    alert("Logged out");
    navigate("/");
  };

  const isAdmin = () => user && user.role === "admin";

  // close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="navbar-top">
        <div className="navbar-top-content">
          <div className="navbar-top-left">
            <span>📞 +00234567890</span>
            <span>Get 50% Off on Selected Items</span>
            <a href="#shop" className="shop-now-link">Shop Now</a>
          </div>
          <div className="navbar-top-right">
            <span>Eng <ChevronDown className="inline w-4 h-4" /></span>
            <span>
              <MapPin className="w-4 h-4 mr-1" /> Location{" "}
              <ChevronDown className="inline w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="navbar-left">
          {/* Hamburger Menu */}
          <div
            className={`hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            role="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Logo */}
          <div className="logo">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <BsFillBasketFill className="logo-icon" />
              Mill
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="navbar-links">
            <CategoriesDropdown products={products} />
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
            <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact us</Link>
            <Link to="/faq" className={location.pathname === "/faq" ? "active" : ""}>FAQs</Link>
            <Link to="/orders" className={location.pathname === "/orders" ? "active" : ""}>Your orders</Link>
            {isAdmin() && (
              <button className="admin">
                <Link to="/admin">Admin</Link>
              </button>
            )}
          </div>
        </div>

        <div className="navbar-right">
          {/* Desktop Search Container */}
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search Product"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            <SearchDropdown
              searchInput={searchInput}
              products={products}
              onSearch={handleSearchClick}
              onCategoryClick={handleCategoryClick}
              onProductClick={handleProductClick}
            />
            <button className="search-button" onClick={handleSearchClick}>Search</button>
          </div>

          {/* User Authentication Section */}
          {isAuthenticated && user ? (
            <div className="account-dropdown">
              <span className="dropdown-toggle" onClick={() => setDropdownVisible(!dropdownVisible)}>
                <Avatar firstName={user.first_name} /> Hi, {user.first_name}
              </span>
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <Link to="/account">My Account</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="account-links">
              <BsPerson className="person-icon" />
              <Link to="/login">Login</Link>
              <span className="divider">|</span>
              <Link to="/registration">Registration</Link>
            </div>
          )}

          {/* Cart Link */}
          <Link to="/cart" className="cart-link">
            <FaShoppingCart className="cart-icon" />
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </nav>

      {/* Mobile Search Container */}
      <div className="mobile-search-container">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Product"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <SearchDropdown
            searchInput={searchInput}
            products={products}
            onSearch={handleSearchClick}
            onCategoryClick={handleCategoryClick}
            onProductClick={handleProductClick}
          />
          <button className="search-button" onClick={handleSearchClick}>Search</button>
        </div>
      </div>

      {/* MOBILE OVERLAY + DRAWER (NEW) */}
      {mobileOpen && (
        <>
          <div
            className="mobile-backdrop"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="mobile-menu-overlay" role="dialog" aria-modal="true">
            <div className="mobile-menu-header">
              <button
                className="mobile-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
              <div className="mobile-title" onClick={() => { setMobileOpen(false); navigate("/"); }}>
                <BsFillBasketFill /> <span>Mill</span>
              </div>
            </div>

            <nav className="mobile-nav-links">
              <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
              <Link to="/faq" onClick={() => setMobileOpen(false)}>FAQs</Link>
              <Link to="/orders" onClick={() => setMobileOpen(false)}>Your orders</Link>
              {isAdmin() && <Link to="/admin" onClick={() => setMobileOpen(false)}>Admin</Link>}
            </nav>

            <div className="mobile-categories">
              <h4>Categories</h4>
              <div className="mobile-cats-grid">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    className="mobile-cat"
                    onClick={() => {
                      navigate(`/collection/${c.id}`);
                      setMobileOpen(false);
                    }}
                  >
                    <span className={`mobile-cat-icon ${c.iconClass}`}>{c.icon}</span>
                    <span className="mobile-cat-name">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Navbar;
