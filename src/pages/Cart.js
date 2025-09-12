import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import "../styles/Cart.css";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";

const Cart = ({
  cartItems,
  onAddToCart,
  onDecrementFromCart,
  onRemoveFromCart,
  onClearCart,
  cartCount,
  fetchOrdersForUser,
  products,
}) => {
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session?.user?.id) {
      fetchOrdersForUser(session.user.id);
    }

    // Load wishlist & recently viewed from localStorage
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);

    const storedRecentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(storedRecentlyViewed);
  }, [fetchOrdersForUser]);

  // 🔹 Calculate totals
  const calculateItemTotal = (item) => {
    const price = item.price
      ? parseFloat(item.price.toString().replace(/[^\d.]/g, ""))
      : 0;
    return price * item.quantity;
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + calculateItemTotal(item);
  }, 0);

  const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const totalSavings = cartItems.reduce((savings, item) => {
    const currentPrice = item.price
      ? parseFloat(item.price.toString().replace(/[^\d.]/g, ""))
      : 0;
    const originalPrice = currentPrice * 1.4; // simulate 40% discount
    const itemSavings = (originalPrice - currentPrice) * item.quantity;
    return savings + itemSavings;
  }, 0);

  const formatPrice = (price) => `KSh ${price.toFixed(0)}`;
  const getOriginalPrice = (currentPrice) => currentPrice * 1.4;

    const handleCardClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  // Get the product's total quantity from the full product list
const getProductQuantity = (itemId) => {
  const product = products.find((p) => p.id === itemId);
  return product ? product.quantity : 0; // fallback to 0 if not found
};

  // ✅ Save cart to session storage & go to checkout
  const handleCheckout = () => {
    sessionStorage.setItem(
      "checkoutData",
      JSON.stringify({
        items: cartItems,
        subtotal,
        tax: subtotal * 0.16,
        total: subtotal + subtotal * 0.16,
      })
    );
    navigate("/checkout");
  };



// 🔹 Determine stock status based on product's total quantity
const getStockStatus = (productQuantity) => {
  if (productQuantity > 50) {
    return { text: "In Stock", color: "#14b8a6" }; // teal/green
  } else if (productQuantity > 10 && productQuantity <= 50) {
    return { text: "⚠️ Few items left", color: "#facc15" }; // yellow
  } else {
    return { text: `❗ ${productQuantity} items left`, color: "#ef4444" }; // red
  }
};





  // 🔹 Empty cart screen
  if (cartItems.length === 0) {
    return (
      <>
        <div className="cart-container">
          <div className="cart-main">
            <div className="cart-empty">
              <div className="cart-empty-icon">
                <ShoppingCart size={60} />
              </div>
              <h2>Your Shopcart is empty</h2>
              <p>Looks like you haven't made your choice yet...</p>
              <div className="empty-cart-actions">
                <button className="continue-shopping-btn">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Section */}
        <div className="extra-section">
          <h2 className="extra-title">Wishlist</h2>
          {wishlist.length > 0 ? (
            <ProductList
              products={wishlist.map((item) => ({
                ...item,
                isWishlisted: true,
              }))}
            />
          ) : (
            <p>No wishlist products yet.</p>
          )}
        </div>

        {/* Recently Viewed Section */}
        <div className="extra-section">
          <h2 className="extra-title">Recently Viewed</h2>
          {recentlyViewed.length > 0 ? (
            <ProductList products={recentlyViewed} />
          ) : (
            <p>No recently viewed products yet.</p>
          )}
        </div>
      </>
    );
  }

  // 🔹 Cart with items
  return (
    <>
      <div className="cart-container">
        {/* Main Cart Section */}
        <div className="cart-main">
          <h1 className="cart-header">
            Cart <span className="cart-counts">({cartCount})</span>
          </h1>

          <div className="cart-items-container">
            {cartItems.map((item) => {
              const currentPrice = item.price
                ? parseFloat(item.price.toString().replace(/[^\d.]/g, ""))
                : 0;
              const originalPrice = getOriginalPrice(currentPrice);
              const discount = calculateDiscount(originalPrice, currentPrice);

              return (
                <div key={item.id} className="cart-item">
                  {/* Product Image */}
                  <div className="cart-item-image"  onClick={() => handleCardClick(item)}>
                    <img
                      src={item.image_url || item.image}
                      alt={item.product_name || item.name}
                    />
                  </div>

                  {/* Details */}
                  <div className="cart-item-details">
                    <h3 className="cart-item-name"  onClick={() => handleCardClick(item)}>
                      {item.product_name || item.name}
                    </h3>
<div
  className="cart-item-stock"
  style={{ color: getStockStatus(getProductQuantity(item.id)).color }}
>
  {getStockStatus(getProductQuantity(item.id)).text}
</div>


                    <div className="cart-item-actions">
                      <button
                        className="remove-btn"
                        onClick={() => onRemoveFromCart(item)}
                      >
                        <Trash2 className="remove-icon" />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="cart-item-price-section">
                    <div className="cart-item-current-price">
                      {formatPrice(currentPrice)}
                    </div>
                    <div>
                      <span className="cart-item-original-price">
                        {formatPrice(originalPrice)}
                      </span>
                      <span className="cart-item-discount">-{discount}%</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => onDecrementFromCart(item)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => onAddToCart(item)}
                      disabled={item.quantity >= (item.availableQuantity || 10)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart Summary Sidebar */}
        <div className="cart-summary">
          <h2 className="cart-summary-title">Cart Summary</h2>

          {totalSavings > 0 && (
            <div className="savings-badge">
              You're saving {formatPrice(totalSavings)}!
            </div>
          )}

          <div className="cart-summary-item">
            <span className="cart-summary-label">Subtotal</span>
            <span className="cart-summary-value">{formatPrice(subtotal)}</span>
          </div>

          <div className="cart-summary-item">
            <span className="cart-summary-label">Shipping</span>
            <span className="cart-summary-value">Free</span>
          </div>

          <div className="cart-summary-item">
            <span className="cart-summary-label">Tax</span>
            <span className="cart-summary-value">
              {formatPrice(subtotal * 0.16)}
            </span>
          </div>

          <div className="cart-total-section">
            <div className="cart-total">
              <span>Total</span>
              <span>{formatPrice(subtotal + subtotal * 0.16)}</span>
            </div>
          </div>

         <div className="cart-actions">
            <button className="cart-proceed" onClick={() => {
  handleCheckout();
  onClearCart();
}}
>
              Checkout ({formatPrice(subtotal + subtotal * 0.16)})
            </button>
            <button className="cart-clear" onClick={onClearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>

 {/* Wishlist Section */}
<div className="extra-section">
  <ProductList
    products={wishlist.map((item) => ({ ...item, isWishlisted: true }))}
    title="Wishlist"
    seeAllRoute="/wishlist"
  />
</div>

{/* Recently Viewed Section */}
<div className="extra-section">
  <ProductList
    products={recentlyViewed}
    title="Recently Viewed"
    seeAllRoute="/recent"
  />
</div>

    </>
  );
};

export default Cart;
