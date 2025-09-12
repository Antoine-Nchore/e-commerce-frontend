import React from 'react';
import '../styles/contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Left Section */}
      <div className="contact-left">
        <img 
          src="/assets/contact.png" 
          alt="Contact illustration" 
          className="contact-image"
        />
      </div>

      {/* Right Section */}
      <div className="contact-right">
        <h2>Contact Us</h2>
        <p>We will get back to you as soon as possible!</p>
        <form>
          <input className="inpu" type="text" placeholder="Name" required />
          <input className="inpu" type="email" placeholder="E-mail" required />
          <textarea placeholder="Message" rows="5" required></textarea>
          <button className='submit' type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
