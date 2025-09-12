// src/components/Orders.js
import React, { useEffect, useState } from "react";
import "../styles/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="orders-container">
      <h1 className="orders-title">Orders</h1>

      <div className="orders-list">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-block">
              {/* Transaction ID as title */}
              <h2 className="order-id-title">Order {order.id}</h2>

              {order.items.map((item, index) => (
                <div key={index} className="order-card">
                  <div className="order-image-container">
                    <img
                      src={item.image || "/api/placeholder/80/80"} // ✅ load actual image from localStorage
                      alt={item.name}
                      className="order-image"
                    />
                  </div>

                  <div className="order-details">
                    <h3 className="order-title">{item.name}</h3>
                    <p className="order-number">Order Number: {order.id}</p>
                    <p className="order-variation">Quantity: {item.quantity}</p>
                    <div className="order-status-container">
                      <span className="status-badge">In progress</span>
                    </div>
                    <p className="placed-date">Placed on {order.displayTime}</p>
                  </div>

                  <div className="order-actions">
                    <button className="see-details-btn">See details</button>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
