import React from "react";
import "../styles/Category.css";

const categories = [
  { title: "Furniture", image: "/assets/furniture.jpg" },
  { title: "HandBag", image: "/assets/handbag.jpg" },
  { title: "Books", image: "/assets/books.png" },
  { title: "Tech", image: "/assets/tech.png" },
  { title: "Sneakers", image: "/assets/sneakers-min.png" },
  { title: "Headphones", image: "/assets/headphone.jpg" },
];

function Category({ onSelectCategory }) {
  return (
    <div className="category-grid">
      {categories.map((cat) => (
        <div
          key={cat.title}
          className="category-card"
          onClick={() => onSelectCategory(cat.title)}
        >
          <img src={cat.image} alt={cat.title} className="category-image" />
          <div className="overlay">
            <p className="category-title">{cat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Category;
