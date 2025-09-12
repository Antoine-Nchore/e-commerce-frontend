import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
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
import Wishlist from "./pages/Wishlist";
import Recent from "./pages/Recent";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import SearchResults from "./pages/SearchResults";
import productsData from "./products.json"; 

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

  const session = JSON.parse(localStorage.getItem("session"));

useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await api.get("/products");
        // const formattedProducts = response.data.map((p) => ({
        //   ...p,
        //   rating: parseFloat(p.rating),
        // }));
        // setProducts(formattedProducts);

        // ✅ Use local products.json instead
        const formattedProducts = productsData.map((p) => ({
          ...p,
          rating: parseFloat(p.rating),
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    fetchProducts();

    if (!session) {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(localCart);
    } else {
      fetchOrdersForUser(session.user.id);
    }
  }, [session]);

  const fetchOrdersForUser = async (userId) => {
    try {
      const response = await api.get("/orders");
      const orders = response.data;
      const userOrders = orders.filter((order) => order.user_id === userId);

      const newCartItems = userOrders.map((order) => ({
        id: order.product.id,
        name: order.product.product_name,
        price: `Ksh: ${order.product.price}`,
        quantity: order.quantity,
        image: order.product.image_url,
        availableQuantity: order.product.quantity,
      }));

      setCartItems(newCartItems);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      const session = JSON.parse(localStorage.getItem("session"));
      const productId = product.id;

      if (!productId) return;

      if (!session) {
        const existingCartItem = cartItems.find((item) => item.id === productId);
        const updatedCart = existingCartItem
          ? cartItems.map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [
              ...cartItems,
              {
                id: productId,
                name: product.product_name,
                price: `Ksh: ${product.price}`,
                quantity: 1,
                image: product.image_url,
                availableQuantity: product.quantity,
              },
            ];

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return;
      }

      const userId = session.user.id;
      const existingCartItem = cartItems.find((item) => item.id === productId);

      if (existingCartItem) {
        if (existingCartItem.quantity >= existingCartItem.availableQuantity) return;

        setCartItems(
          cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        await api.post("/orders", {
          user_id: userId,
          product_id: productId,
          quantity: 1,
        });
        fetchOrdersForUser(userId);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
    }
  };

  // ✅ NEW: Decrement quantity only
  const handleDecrementProduct = async (product) => {
    try {
      const session = JSON.parse(localStorage.getItem("session"));
      if (!session) {
        const updatedCart = cartItems.map((item) =>
          item.id === product.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return;
      }

      const productExists = cartItems.find((item) => item.id === product.id);
      if (productExists && productExists.quantity > 1) {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
        // optional: update backend
        // await api.put(`/orders/${product.id}`, { quantity: productExists.quantity - 1 });
      }
    } catch (error) {
      console.error("Error decrementing product:", error.response?.data || error);
    }
  };

  // ✅ NEW: Remove item entirely
  const handleRemoveProduct = async (product) => {
    try {
      const session = JSON.parse(localStorage.getItem("session"));
      if (!session) {
        const updatedCart = cartItems.filter((item) => item.id !== product.id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return;
      }

      await api.delete(`/orders/${product.id}`);
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } catch (error) {
      console.error("Error removing product:", error.response?.data || error);
    }
  };

  const handleCartClearance = async () => {
    try {
      const session = JSON.parse(localStorage.getItem("session"));
      if (!session) {
        localStorage.removeItem("cart");
        setCartItems([]);
        return;
      }

      await api.delete("/orders");
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error.response?.data || error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Navigate to search page with query parameter
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

return (
    <div className="App">
      <Toaster />
      <Navbar onSearch={handleSearch} cartCount={cartCount} products={products} />

      {/* Main content wrapper */}
      <div className="main-content">
        <Routes>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/faq" element={<Faq/>} />
          <Route path="/admin" element={<SideBar />} />
          <Route path="/add-products" element={<AddProductPage />} />
          <Route path="/all-users" element={<Client />} />
          <Route path="/registration" element={<Signup />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/wishlist" element={<Wishlist cartItems={cartItems} onAddToCart={handleAddProduct} onDecrementFromCart={handleDecrementProduct}/>} />
          <Route path="/recent" element={<Recent cartItems={cartItems} onAddToCart={handleAddProduct} onDecrementFromCart={handleDecrementProduct} />} />
          <Route path="/account" element={<Account session={session} />} />
          
          {/* Add the new search route */}
          <Route
            path="/search"
            element={<SearchResults products={products} onAddToCart={handleAddProduct} onDecrementFromCart={handleDecrementProduct} />}
          />
          
          <Route
            path="/"
            element={<Home products={products} searchTerm={searchTerm} onAddToCart={handleAddProduct} />}
          />
          <Route
            path="/collection/:category"
            element={<Collection products={products} onAddToCart={handleAddProduct} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onAddToCart={handleAddProduct}
                onDecrementFromCart={handleDecrementProduct}
                onRemoveFromCart={handleRemoveProduct}
                onClearCart={handleCartClearance}
                fetchOrdersForUser={fetchOrdersForUser}
                cartCount={cartCount}
                products={products}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail
              products={products}
              setProducts={setProducts}
              onAddToCart={handleAddProduct}
              cartItems={cartItems}
              onDecrementFromCart={handleDecrementProduct}
            />}
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;