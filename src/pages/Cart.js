import ProductCard from '../components/ProductCard';
import React, { useState } from 'react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleCartClearance = () => {
    setCartItems([]);
  }

  const handleAddProduct = (product) => {
    const productExists = cartItems.find((item) => item.id === product.id);

    if (productExists) {
      setCartItems(cartItems.map((item) =>
        item.id === product.id ?
          { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  const handleRemoveProduct = (product) => {
    const productExists = cartItems.find((item) => item.id === product.id);
    if (productExists) {
      if (productExists.quantity === 1) {
        setCartItems(cartItems.filter((item) => item.id !== product.id));
      } else {
        setCartItems(cartItems.map((item) =>
          item.id === product.id ? 
          { ...item, quantity: item.quantity - 1 } : item
        ));
      }
    }
  }

  const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0);

  return (
    <div className='cart-container'>
      <h1 className='cart-header'>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className='cart-empty'>Your MIll Cart is empty.</div>
      ) : (
        <div className='cart-items-container'>
          {cartItems.map((item) => (
            <div key={item.id} className='cart-item'>
              <ProductCard
                product={item}
                onAddToCart={handleAddProduct}
                onRemoveFromCart={handleRemoveProduct}
                image={item.image}
                price={item.price}
                description={item.description}
              />
              <div className='cart-item-quantity'>
                Qty: <input type="number" min="1" value={item.quantity} readOnly />
                <button className='cart-item-remove' onClick={() => handleRemoveProduct(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='cart-total'>
        <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''}): </span>
        <span className='cart-total-price'>ksh{totalPrice.toFixed(2)}</span>
      </div>
      <div className='cart-actions'>
        <button className='cart-clear' onClick={handleCartClearance}>
          Delete all items
        </button>
        <button className='cart-proceed'>
          Proceed to checkout
        </button>
      </div>
    </div>
  )
}

export default Cart;
