import React from "react";
import './Cart.css'

const Cart = ({ cartItems, onAddToCart, onRemoveFromCart, onClearCart }) => {
  const totalPrice = cartItems.reduce(
    (price, item) =>
      price + item.quantity * parseFloat(item.price.replace("ksh.", "")),
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-header">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="cart-empty">Your Mill Cart is empty.</div>
      ) : (
        <div className="cart-items-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => onAddToCart(item)}>+</button>
                <button onClick={() => onRemoveFromCart(item)}>-</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <span>
          Subtotal ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""}):{" "}
        </span>
        <span className="cart-total-price">ksh{totalPrice.toFixed(2)}</span>
      </div>
      <div className="cart-actions">
        <button className="cart-clear" onClick={onClearCart}>
          Delete all items
        </button>
        <button className="cart-proceed">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default Cart;
