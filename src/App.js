import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import LoginForm from "./pages/Login";
import ProductDetail from "./components/ProductDetail";
import { Toaster } from "react-hot-toast"; 

const products = [
  {
    id: 1,
    name: "Wireless Earbuds, IPX8",
    price: "ksh.9900.99",
    rating: 4.5,
    image:
      "https://i5.walmartimages.com/seo/Wireless-Earbuds-Bluetooth-5-0-Headphones-IPX8-Waterproof-Built-in-Mic-LED-Charging-Case-21-Hours-Playtime-Hight-Fidelity-Stereo-Sound-Quality-Ear-He_a7e7bef7-f039-4d00-bfe4-15676c26ad7c.24eca05c39f5baa6894dc7c693055b49.jpeg",
    category: "Electronics",
  },
  {
    id: 2,
    name: "AirPods Max",
    price: "ksh.55900.99",
    rating: 4.7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy2s6jM9xfBedPYTm86XEZ6ZMZL7ViC_BxmA&s",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Jordan 1 Retro Black and White",
    price: "ksh.55900.99",
    rating: 4.7,
    image:
      "https://kickskenya.com/cdn/shop/products/Jordan1BlackandWhite.jpg?v=1645521626",
    category: "Shoes",
  },
  {
    id: 4,
    name: "ESTALON Tote Bag for Women",
    price: "ksh.55900.99",
    rating: 4.7,
    image: "https://m.media-amazon.com/images/I/81P9uu4P2JL._AC_UY1000_.jpg",
    category: "Bags",
  },
  {
    id: 5,
    name: "Cocoon sofa",
    price: "ksh.45000.99",
    rating: 4.7,
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRzyHzxnv83pxF2GmjB-UrbpXPYKdxUkpsztO3tTZlRGPp1aIn1Kpm_kmkinCPRYN6TWxrls89jenncUvHpE6Na74qlpkKoHXnYd2omuK50QKzN4Y69QNPXHw&usqp=CAc",
    category: "Furniture",
  },
  {
    id: 6,
    name: "The Amber Dress",
    price: "ksh.39000.99",
    rating: 4.7,
    image: "https://is4.fwrdassets.com/images/p/fw/z/HLSA-WD86_V4.jpg",
    category: "Clothings",
  },
  {
    id: 7,
    name: "FLEUR DU MAL",
    price: "ksh.55900.99",
    rating: 4.7,
    image: "https://is4.fwrdassets.com/images/p/fw/z/FLEF-WD113_V1.jpg",
    category: "Clothings",
  },
  {
    id: 8,
    name: "Brian Tracy",
    price: "ksh.5000.99",
    rating: 4.7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe-Zzsvw9vqwBjeW6bDg4-m6WPOFH7Dt2uPA&s",
    category: "Books",
  },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleAddProduct = (product) => {
    const productExists = cartItems.find((item) => item.id === product.id);
    if (productExists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveProduct = (product) => {
    const productExists = cartItems.find((item) => item.id === product.id);
    if (productExists) {
      if (productExists.quantity === 1) {
        setCartItems(cartItems.filter((item) => item.id !== product.id));
      } else {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }
    }
  };

  const handleCartClearance = () => {
    setCartItems([]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    navigate("/");
  };

  return (
    <div className="App">
      <Toaster /> 
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/registration" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={<Home product={products} searchTerm={searchTerm} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onAddToCart={handleAddProduct}
              onRemoveFromCart={handleRemoveProduct}
              onClearCart={handleCartClearance}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetail products={products} onAddToCart={handleAddProduct} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
