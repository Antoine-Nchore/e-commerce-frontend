// src/components/Checkout.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/checkout.css";

const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState(null);
  const location = useLocation();
  const [showCheckmark, setShowCheckmark] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    mobile: "",
    email: "",
    cardHolderName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    mpesaName: "",
    mpesaPhone: "",
    paypalName: "",
    paypalEmail: "",
    paymentMethod: "credit",
  });

  const [errors, setErrors] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [returningCustomer, setReturningCustomer] = useState(false);

  const navigate = useNavigate();

  // Load checkoutData from sessionStorage on mount
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("checkoutData"));
    if (stored) setCheckoutData(stored);

    // cleanup: only remove when leaving /checkout
    return () => {
      if (location.pathname !== "/checkout") {
        sessionStorage.removeItem("checkoutData");
      }
    };
  }, [location.pathname]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePaymentMethodChange = (method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const saveInfo = () => {
    localStorage.setItem("checkoutInfo", JSON.stringify(formData));
    alert("Delivery information saved!");
  };

  const loadSavedInfo = () => {
    const saved = JSON.parse(localStorage.getItem("checkoutInfo"));
    if (saved) setFormData(saved);
  };

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "DISCOUNT10") {
      alert("Coupon applied! You will get 10% off at payment.");
    } else {
      alert("Invalid coupon code.");
    }
  };

  const generateTransactionId = () =>
    "TXN-" + Math.random().toString(36).substring(2, 10).toUpperCase();

  const validateFields = () => {
    const newErrors = {};

    // Delivery info required
    ["firstName", "lastName", "address", "city", "zipCode", "mobile", "email"].forEach(
      (field) => {
        if (!formData[field]) newErrors[field] = "Required";
      }
    );

    // Payment info required depending on method
    if (formData.paymentMethod === "mpesa") {
      if (!formData.mpesaName) newErrors.mpesaName = "Required";
      if (!formData.mpesaPhone) newErrors.mpesaPhone = "Required";
    }
    if (formData.paymentMethod === "paypal") {
      if (!formData.paypalName) newErrors.paypalName = "Required";
      if (!formData.paypalEmail) newErrors.paypalEmail = "Required";
    }
    if (formData.paymentMethod === "credit") {
      ["cardHolderName", "cardNumber", "expiry", "cvc"].forEach((field) => {
        if (!formData[field]) newErrors[field] = "Required";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    // validate delivery + relevant payment fields
    if (!validateFields()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      // txn + timestamp
      const txnId = generateTransactionId();
      setTransactionId(txnId);
      const ts = new Date().toLocaleString();
      setTimestamp(ts);

      // show modal & animation
      setShowModal(true);
      setShowCheckmark(true);

      // Save order to localStorage (prepend)
      const existing = JSON.parse(localStorage.getItem("orders")) || [];
      const newOrder = {
        id: txnId,
        timestamp: new Date().toISOString(),
        displayTime: ts,
        items: checkoutData?.items || [],
        total: Math.round(checkoutData?.total ?? 0), // saved rounded total
        paymentMethod: formData.paymentMethod,
        deliveryInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          mobile: formData.mobile,
          email: formData.email,
        },
      };
      localStorage.setItem("orders", JSON.stringify([newOrder, ...existing]));

      // IMPORTANT: don't clear checkoutData/sessionStorage here,
      // keep them until user closes modal so modal can render.
    }, 2000);
  };

  // When user clicks Continue Shopping: close modal, clear checkout data, navigate home
  const handleContinueShopping = () => {
    setShowModal(false);
    sessionStorage.removeItem("checkoutData");
    setCheckoutData(null);
    navigate("/");
  };

  // When user clicks Close: close modal, clear checkout data, navigate to orders list
  const handleCloseModal = () => {
    setShowModal(false);
    sessionStorage.removeItem("checkoutData");
    setCheckoutData(null);
    navigate("/orders");
  };

  if (!checkoutData) {
    return (
      <div className="checkout-container">
        <p>No checkout data found.</p>
      </div>
    );
  }

  const { items, subtotal, tax, total } = checkoutData;

  return (
    <div className="checkout-container">
      <div className="breadcrumb">
        <span  onClick={handleContinueShopping}>Home</span> / <span className="current">Checkout</span>
      </div>

      <div className="checkout-content">
        {/* Left Section */}
        <div className="left-section">
          {/* Review Items */}
          <div className="review-section">
            <h2>Review Items & Shipping</h2>

            {items.length === 0 ? (
              <p>No items in checkout.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="product-item">
                  <div className="product-image">
                    <img
                      src={item.image_url || item.image}
                      alt={item.product_name || item.name}
                      onClick={() => {
                        navigate(`/product/${item.id}`);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  </div>

                  <div className="product-details">
                    <h3
                      onClick={() => {
                        navigate(`/product/${item.id}`);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      {item.product_name || item.name}
                    </h3>
                    <p className="product-color">Qty: {item.quantity}</p>
                  </div>

                  <div className="product-price">
                    <span className="price">
                      {item.price} × {item.quantity}
                    </span>
                  </div>
                </div>
              ))
            )}

            <div className="returning-customer">
              <label>
                <input
                  type="checkbox"
                  checked={returningCustomer}
                  onChange={() => {
                    setReturningCustomer(!returningCustomer);
                    if (!returningCustomer) loadSavedInfo();
                  }}
                />
                Returning Customer?
              </label>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="delivery-section">
            <div className="section-header">
              <h2>Delivery Information</h2>
              <button className="save-info" onClick={saveInfo}>
                Save Information
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>First Name*</label>
                <input name="firstName" value={formData.firstName} onChange={handleInputChange} />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name*</label>
                <input name="lastName" value={formData.lastName} onChange={handleInputChange} />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Address*</label>
              <input name="address" value={formData.address} onChange={handleInputChange} />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City*</label>
                <input name="city" value={formData.city} onChange={handleInputChange} />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>Zip Code*</label>
                <input name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                {errors.zipCode && <span className="error">{errors.zipCode}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mobile*</label>
                <input name="mobile" value={formData.mobile} onChange={handleInputChange} />
                {errors.mobile && <span className="error">{errors.mobile}</span>}
              </div>
              <div className="form-group">
                <label>Email*</label>
                <input name="email" value={formData.email} onChange={handleInputChange} />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <p>Total Items: {items.length}</p>
            <p>Subtotal: KSh {subtotal}</p>
            <p>Tax: KSh {tax}</p>
            <h3>Total: KSh {Math.round(total)}</h3>

            <div className="coupon-section">
              <input
                type="text"
                placeholder="Free Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className="apply-coupon" onClick={applyCoupon}>
                Apply coupon
              </button>
            </div>
          </div>

          {/* Payment Section */}
          <div className="payment-section">
            <h2>Payment Details</h2>

            <div className="payment-methods">
              <div className="payment-option">
              <label>
                <input
                  type="radio"
                  checked={formData.paymentMethod === "cash"}
                  onChange={() => handlePaymentMethodChange("cash")}
                />
                Cash on Delivery
              </label>
              </div>
              <div className="payment-option">

              <label>
                <input
                  type="radio"
                  checked={formData.paymentMethod === "mpesa"}
                  onChange={() => handlePaymentMethodChange("mpesa")}
                />
                Mpesa
              </label>
              </div>
              <div className="payment-option">

              <label>
                <input
                  type="radio"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={() => handlePaymentMethodChange("paypal")}
                />
                PayPal
              </label>
              </div>
              <div className="payment-option">

              <label>
                <input
                  type="radio"
                  checked={formData.paymentMethod === "credit"}
                  onChange={() => handlePaymentMethodChange("credit")}
                />
                Credit/Debit Card
              </label>
              </div>
            </div>

            {/* Mpesa */}
            {formData.paymentMethod === "mpesa" && (
              <>
                <div className="form-group">
                  <label>Full Name*</label>
                  <input name="mpesaName" value={formData.mpesaName} onChange={handleInputChange} />
                  {errors.mpesaName && <span className="error">{errors.mpesaName}</span>}
                </div>
                <div className="form-group">
                  <label>Phone*</label>
                  <input name="mpesaPhone" value={formData.mpesaPhone} onChange={handleInputChange} />
                  {errors.mpesaPhone && <span className="error">{errors.mpesaPhone}</span>}
                </div>
                <button className="make-payment-btn green" onClick={handlePayment}>
                  {loading ? "Processing..." : `Pay with Mpesa KSh ${Math.round(total)}`}
                </button>
              </>
            )}

            {/* Paypal */}
            {formData.paymentMethod === "paypal" && (
              <>
                <div className="form-group">
                  <label>Full Name*</label>
                  <input name="paypalName" value={formData.paypalName} onChange={handleInputChange} />
                  {errors.paypalName && <span className="error">{errors.paypalName}</span>}
                </div>
                <div className="form-group">
                  <label>Email*</label>
                  <input name="paypalEmail" value={formData.paypalEmail} onChange={handleInputChange} />
                  {errors.paypalEmail && <span className="error">{errors.paypalEmail}</span>}
                </div>
                <button className="make-payment-btn blue" onClick={handlePayment}>
                  {loading ? "Processing..." : `Pay with PayPal KSh ${Math.round(total)}`}
                </button>
              </>
            )}

            {/* Credit */}
            {formData.paymentMethod === "credit" && (
              <>
                <div className="form-group">
                  <label>Card Holder Name*</label>
                  <input name="cardHolderName" value={formData.cardHolderName} onChange={handleInputChange} />
                  {errors.cardHolderName && <span className="error">{errors.cardHolderName}</span>}
                </div>

                <div className="form-group">
                  <label>Card Number*</label>
                  <input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
                  {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry*</label>
                    <input name="expiry" value={formData.expiry} onChange={handleInputChange} />
                    {errors.expiry && <span className="error">{errors.expiry}</span>}
                  </div>

                  <div className="form-group">
                    <label>CVC*</label>
                    <input name="cvc" value={formData.cvc} onChange={handleInputChange} />
                    {errors.cvc && <span className="error">{errors.cvc}</span>}
                  </div>
                </div>

                <button className="make-payment-btn" onClick={handlePayment}>
                  {loading ? "Processing..." : `Pay with Card KSh ${Math.round(total)}`}
                </button>
              </>
            )}

            {/* Cash */}
            {formData.paymentMethod === "cash" && (
              <button className="make-payment-btn teal" onClick={handlePayment}>
                {loading ? "Placing Order..." : `Order Now (KSh ${Math.round(total)})`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal (renders while checkoutData still exists) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Floating elements */}
            <div className="floating-elements">
              <div className="floating-dot dot-1"></div>
              <div className="floating-dot dot-2"></div>
              <div className="floating-dot dot-3"></div>
              <div className="floating-circle circle-1"></div>
              <div className="floating-circle circle-2"></div>
              <div className="floating-line line-1"></div>
              <div className="floating-line line-2"></div>
            </div>

            {/* Close (X) button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#fff",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              ✕
            </button>

            {/* Checkmark animation */}
            <div className="checkmark-container animate">
              <div className="checkmark-circle">
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <path
                    className="checkmark-path"
                    fill="none"
                    stroke="white"
                    strokeWidth="5"
                    d="M14 27l7 7 16-16"
                  />
                </svg>
              </div>
            </div>

            {/* Modal text */}
            <div className="modal-text">
              <h2>Payment Successful!</h2>
              <p className="transaction-id">
                Transaction ID: MPESA{Math.floor(Math.random() * 1000000)}
              </p>
            </div>

            {/* Continue Shopping button */}
            <button
              className="continue-button"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
