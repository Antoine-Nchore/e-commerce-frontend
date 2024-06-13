import React, { useState, useEffect } from "react";
import "../styles/Modal.css";

const Modal = ({ item, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (item && item.image_url) {
      const img = new Image();
      img.src = item.image_url;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(false);
    }
  }, [item, item?.image_url]);

  if (!item || Object.keys(item).length === 0) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{item.product_name}</h2>
          <button className="close-button" onClick={onClose}>
            <span className="close-icon">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-description">
            <p>{item.description}</p>
            <p className="modal-price">Price: ksh.{item.price}</p>
          </div>
          {imageLoaded ? (
            <div className="modal-image">
              <img src={item.image_url} alt={item.product_name} />
            </div>
          ) : (
            <div className="modal-image-placeholder">Loading image...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
