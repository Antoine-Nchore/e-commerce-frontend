import React, { useState } from "react";
import "../styles/Header.css";
import myImage from "../categ.png";
import { api } from "../utils/Main";
import Modal from "./Modal";

const Header = () => {
 

  return (
    <header className="header">
      <div className="header-content">
        <h2>
          Shop now on Mill to enjoy our Amazing Offers on <br /> Selected Products
        </h2>
      </div>
      <img src={myImage} alt="Headphones" className="header-image" />
    </header>
  );
};

export default Header;
