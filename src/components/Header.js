import React, { useState } from "react";
import "../styles/Header.css";
import myImage from "../Remove background project.png";
import { api } from "../utils/Main";
import Modal from "./Modal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [randomItem, setRandomItem] = useState(null);

  const handleBuyNow = async () => {
    try {
      const response = await api.get("/products");
      const { data, status } = response;

      if (status === 200) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomItem = data[randomIndex];
        setRandomItem(randomItem);
        setShowModal(true);
      } else {
        console.error("Error fetching products:", response);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h2>
          Grab Upto 50% Off On <br /> Selected Product
        </h2>
        <button onClick={handleBuyNow}>Buy Now</button>
      </div>
      <img src={myImage} alt="Headphones" className="header-image" />
      {showModal && randomItem && (
        <Modal item={randomItem} onClose={handleCloseModal} />
      )}
    </header>
  );
};

export default Header;
