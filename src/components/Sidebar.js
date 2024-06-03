import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ onFilterCategory }) => {
  return (
    <aside className="sidebar">
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
    </aside>
  );
};

export default Sidebar;
