import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { BsFillBasketFill, BsPerson } from "react-icons/bs";
import "../styles/Navbar.css";

const Navbar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchInput);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <Link to="/">
            <BsFillBasketFill className="logo-icon" />
            Mill
          </Link>
        </div>
        <div className="navbar-links">
          <a href="#categories">Categories</a>
          <a href="#deals">Deals</a>
          <a href="#whatsnew">What's New</a>
          <a href="#delivery">Delivery</a>
        </div>
      </div>
      <div className="navbar-right">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="I'm looking for..."
            value={searchInput}
            onChange={handleInputChange}
            className="search-input"
          />
          <button className="search-button" onClick={handleSearchClick}>
            Search
          </button>
        </div>
        <div className="account-links">
          <BsPerson className="person-icon" />
          <Link to="/login">Login</Link>
          <span className="divider">|</span>
          <Link to="/registration">Registration</Link>
        </div>
        <Link to="/cart" className="cart-link">
          <FaShoppingCart className="cart-icon" />
          <span>Cart</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
