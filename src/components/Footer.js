import React from 'react';
import '../styles/Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <section>
        <div className="social-links">
  <h4>Follow Us:</h4>
  <ul>
    <li>
      <a href="https://twitter.com/home" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter"></i>
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/james-ekasiba-a0a99b23b/" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/anthony-nchore-a988b0180/" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </li>
  </ul>
    </div>
    </section>
        <div className="contact-info">
            <div className='about-us'> <Link to = "/about">About Us</Link> </div>
          <h4>Contact Us:</h4>
          <ul>
            <li>
              <i className="fas fa-phone-alt"></i>
              <a href="tel:+254110948244">+254110948244</a>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <a href="mill.com">millenterprises@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='developers'>
        <h5>Developed by KAJ developers </h5>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} Mill-Kenya. All rights reserved.
      </div>
      
    </footer>
  );
};

export default Footer;
