import React from "react";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react"; // React Lucide icons
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        
        {/* Brand / About */}
        <div className="footer-section">
          <h3 className="footer-logo">Mill Kenya</h3>
          <p className="footer-text">
            Your everyday marketplace — shop smart, save more, and enjoy a seamless experience.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/faq" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Contact Us
              </Link>
            </li>
            <li><Link to="/">Terms of Service</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <i className="fas fa-phone-alt"></i>
              <a href="tel:+254110948244"> +254 110 948 244</a>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <a href="mailto:kajmillempire@gmail.com"> kajmillempire@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul className="social-list">
            <li>
              James{" "}
              <a
                href="https://www.linkedin.com/in/james-ekasiba-a0a99b23b/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
            </li>
            <li>
              Anthony{" "}
              <a
                href="https://www.linkedin.com/in/anthony-nchore-a988b0180/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
            </li>
               <li>
              Hillary{" "}
              <a
                href="https://www.linkedin.com/in/korir-hillary-825926135/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mill-Kenya. All rights reserved.</p>
        <p className="developers">Developed by KAJ Developers</p>
      </div>
    </footer>
  );
};

export default Footer;
