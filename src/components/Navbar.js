import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillBasketFill } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import "../styles/Navbar.css";

const Navbar = () => {
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
        <input type="text" placeholder="Search Product" />
        <div className="account-links">
          <BsPerson className="person-icon" />
          <Link to="/login">Login</Link>
          <span className="divider">|</span>
          <Link to="/registration">Registration</Link>
        </div>
        <Link to="/cart">
          <FaShoppingCart className="cart-icon" />
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;