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
        <Link to="/login">
          <BsPerson className="person" />
          Account
        </Link>
        <Link to="/cart">
          <FaShoppingCart className="person" />
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
