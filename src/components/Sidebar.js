import React, { useState } from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ onFilterCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h3>Popular Categories</h3>
        <ul>
          <li onClick={() => onFilterCategory("all")}>All Products</li>
          <li onClick={() => onFilterCategory("Furniture")}>Furniture</li>
          <li onClick={() => onFilterCategory("Electronics")}>Electronics</li>
          <li onClick={() => onFilterCategory("Shoes")}>Shoes</li>
          <li onClick={() => onFilterCategory("Bags")}>Bags</li>
          <li onClick={() => onFilterCategory("Clothings")}>Clothings</li>
          <li onClick={() => onFilterCategory("Books")}>Books</li>
        </ul>
      </div>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        ☰ 
      </div>
    </>
  );
};

export default Sidebar;