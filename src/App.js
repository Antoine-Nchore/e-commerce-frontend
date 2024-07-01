import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import LoginForm from "./pages/Login";
import ProductDetail from "./components/ProductDetail";
import { Toaster } from "react-hot-toast";
import { api } from "./utils/Main";
import Footer from "./components/Footer";
import Account from "./components/Account";
import SideBar from "./Admin/SideBar";
import AddProduct from "./Admin/AddProducts";
import Client from "./Admin/Clients";
import AboutUs from "./pages/AboutUs";

const AddProductPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const onClose = () => {
    setIsOpen(false);
    navigate("/admin");
  };

  return <AddProduct isOpen={isOpen} onClose={onClose} />;
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const fetchOrdersForUser = async (userId) => {
    try {
      const response = await api.get("/orders");
      const orders = response.data;

      const userOrders = orders.filter((order) => order.user_id === userId);

      const newCartItems = userOrders.map((order) => ({
        id: order.id,
        name: order.product.product_name,
        price: `Ksh: ${order.product.price}`,
        quantity: 1,
        image: order.product.image_url,
        availableQuantity: order.product.quantity,
      }));

      setCartItems(newCartItems);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  const session = JSON.parse(localStorage.getItem("session"));

  const handleAddProduct = async (product) => {
    try {
      const session = JSON.parse(localStorage.getItem("session"));
      if (!session || !session.user || !session.user.id) {
        console.error("User is not logged in");
        return;
      }

      const userId = session.user.id;
      const productId = product.id;

      if (!productId) {
        console.error("Product ID is undefined:", product);
        return;
      }

      const existingCartItem = cartItems.find((item) => item.id === productId);

      if (existingCartItem) {
        if (existingCartItem.quantity >= existingCartItem.availableQuantity) {
          console.error("Cannot add more than available quantity");
          return;
        }

        setCartItems(
          cartItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        const orderData = {
          user_id: userId,
          product_id: productId,
          quantity: 1,
        };

        await api.post("/orders", orderData);
        fetchOrdersForUser(userId);

        const response = await api.get("/products");
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
    }
  };

  const handleRemoveProduct = async (product) => {
    try {
      const productExists = cartItems.find((item) => item.id === product.id);
      if (productExists) {
        if (productExists.quantity === 1) {
          await api.delete(`/orders/${product.id}`);
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
    } catch (error) {
      console.error("Error removing product:", error.response?.data || error);
    }
  };

  const handleCartClearance = async () => {
    try {
      await api.delete("/orders");
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error.response?.data || error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    navigate("/");
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <Toaster />
      <Navbar onSearch={handleSearch} cartCount={cartCount} />
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin" element={<SideBar />} />
        <Route path="/add-products" element={<AddProductPage />} />
        <Route path="/all-users" element={<Client />} />
        <Route path="/registration" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/account" element={<Account session={session} />} />
        <Route
          path="/"
          element={
            <Home
              products={products}
              searchTerm={searchTerm}
              onAddToCart={handleAddProduct}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onAddToCart={handleAddProduct}
              onRemoveFromCart={handleRemoveProduct}
              onClearCart={handleCartClearance}
              fetchOrdersForUser={fetchOrdersForUser}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              products={products}
              setProducts={setProducts}
              onAddToCart={handleAddProduct}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
