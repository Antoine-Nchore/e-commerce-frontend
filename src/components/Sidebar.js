import React from "react";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Popular Categories</h3>
      <ul>
        <li>Furniture</li>
        <li>Headphones</li>
        <li>Shoes</li>
        <li>Bags</li>
        <li>Laptops</li>
        <li>Books</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
