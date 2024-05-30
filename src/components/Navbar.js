import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillBasketFill } from "react-icons/bs";
import "../styles/Navbar.css";
import { BsPerson } from "react-icons/bs";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <BsFillBasketFill className="logo-icon" />
          Mill
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
        <a href="#account">
          <BsPerson className="person" />
          Account
        </a>
        <a href="#cart">
          <FaShoppingCart className="person" />
          cart
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
