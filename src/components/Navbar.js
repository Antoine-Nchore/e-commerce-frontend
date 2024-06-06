import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { BsFillBasketFill, BsPerson } from "react-icons/bs";
import { AuthContext } from "../components/AuthContext";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Avatar = ({ firstName }) => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  const abbreviation = firstName.charAt(0).toUpperCase();

  return (
    <div className="avatar" style={{ backgroundColor: randomColor }}>
      {abbreviation}
    </div>
  );
};

const Navbar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const { isAuthenticated, user } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchInput);
  };

  const handleLogout = () => {
    logout();
    alert("Logged out");
    navigate("/");
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
        {isAuthenticated && user ? (
          <div className="account-dropdown">
            <span
              className="dropdown-toggle"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
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
        <Link to="/cart" className="cart-link">
          <FaShoppingCart className="cart-icon" />
          <span>Cart</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
