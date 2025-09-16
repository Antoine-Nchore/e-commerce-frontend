import React, { useState, useRef } from 'react';
import { Link} from "react-router-dom";
import { Linkedin, Github } from "lucide-react";
import '../styles/AboutUs.css';


const About = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const developersRef = useRef(null);
  const reviewsRef = useRef(null);

  const handleMouseDown = (e, ref) => {
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e, ref) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="about-container">
      {/* Header Section */}
      <div className="about-header">
        <h1>About Us</h1>
        <div className="breadcrumb">
           <Link to="/">
    <span className="home-link">Home</span>
  </Link> / About
        </div>
      </div>

      {/* Main Content */}
      <div className="about-content">
        <div className="content-left">
          <div className="content-left">
  <img 
    src="/assets/e-commerce.png" 
    alt="E-commerce Illustration" 
    className="about-illustration-img" 
  />
</div>

        </div>

        <div className="content-right">
          <h2>Creating A Community Of Online Shoppers.</h2>
          <p>
            Mill is a community of shoppers including customers, vendors and 
            staff who are dedicated to creating an seamlessly efficient, culturally 
            caring and inclusive shopping environment. We are Reaching Excellence 
            in E-commerce and Changing Shopping Experience!
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon products-icon">📦</div>
              <div className="stat-number">540+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon awards-icon">🏆</div>
              <div className="stat-number">11+</div>
              <div className="stat-label">Awards</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon customers-icon">👤</div>
              <div className="stat-number">1200+</div>
              <div className="stat-label">Customers</div>
            </div>
          </div>
        </div>
      </div>
{/* Our Developers Section */}
      <div className="developers-section">
        <h2>Our Developers</h2>
        <div
          className="developers-slider"
          ref={developersRef}
          onMouseDown={(e) => handleMouseDown(e, developersRef)}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => handleMouseMove(e, developersRef)}
          onMouseLeave={handleMouseUp}
        >
          {/* James */}
          <div className="developer-card">
            <div className="image-wrapper">
              <img src="/assets/James.png" alt="James Ekasiba" className="developer-image" />
              <div className="social-icons">
                <a href="https://www.linkedin.com/in/james-ekasiba-a0a99b23b/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/Jamescjay" target="_blank" rel="noopener noreferrer">
                  <Github size={24} />
                </a>
              </div>
            </div>
            <h3>James Ekasiba</h3>
            <p className="developer-role">Fullstack Developer | UI/UX</p>
          </div>

          {/* Antony */}
          <div className="developer-card">
            <div className="image-wrapper">
              <img src="/assets/Antony.png" alt="Antony Nchore" className="developer-image" />
              <div className="social-icons">
                <a href="https://www.linkedin.com/in/anthony-nchore-a988b0180/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/Antoine-Nchore" target="_blank" rel="noopener noreferrer">
                  <Github size={24} />
                </a>
              </div>
            </div>
            <h3>Anthony Nchore</h3>
            <p className="developer-role">Software Developer | ML</p>
          </div>

          {/* Hillary */}
          <div className="developer-card">
            <div className="image-wrapper">
              <img src="/assets/Hillary.png" alt="Hillary Korir" className="developer-image" />
              <div className="social-icons">
                <a href="https://www.linkedin.com/in/korir-hillary-825926135/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/Korirhillary" target="_blank" rel="noopener noreferrer">
                  <Github size={24} />
                </a>
              </div>
            </div>
            <h3>Hillary Korir</h3>
            <p className="developer-role">Software Developer | Finance</p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
<div className="reviews-section">
  <h2>Customer Reviews</h2>
  <div 
    className="reviews-slider"
    ref={reviewsRef}
    onMouseDown={(e) => handleMouseDown(e, reviewsRef)}
    onMouseUp={handleMouseUp}
    onMouseMove={(e) => handleMouseMove(e, reviewsRef)}
    onMouseLeave={handleMouseUp}
  >
<div className="review-card">
  <div className="review-text">
    Mill has the best customer service that guide 
    you through the shopping process and help you every step of 
    the way.
    <br /><br />
    I am happy that I was able to get such a 
    great shopping experience.
  </div>
  <div className="reviewer-info">
    <div className="reviewer-avatar"><span>BJ</span></div>
    <div className="reviewer-details">
      <h4>Brenda Jones</h4>
      <div className="rating"><span>⭐⭐⭐⭐⭐</span></div>
    </div>
  </div>
</div>

<div className="review-card">
  <div className="review-text">
    Being a frequent shopper at Mill 
    was such a great opportunity for me, I was 
    able to find the best products and 
    have amazing deals with some of 
    the greatest brands ever known to the world 
    enabling me to save so much money.
  </div>
  <div className="reviewer-info">
    <div className="reviewer-avatar"><span>LP</span></div>
    <div className="reviewer-details">
      <h4>Linda Peterson</h4>
      <div className="rating"><span>⭐⭐⭐⭐⭐</span></div>
    </div>
  </div>
</div>

<div className="review-card">
  <div className="review-text">
    I've been shopping online for years, but Mill 
    takes it to another level. The product quality is 
    outstanding and the delivery is always on time.
    <br /><br />
    Highly recommended for anyone looking for 
    reliable e-commerce experience.
  </div>
  <div className="reviewer-info">
    <div className="reviewer-avatar"><span>JD</span></div>
    <div className="reviewer-details">
      <h4>John Doe</h4>
      <div className="rating"><span>⭐⭐⭐⭐⭐</span></div>
    </div>
  </div>
</div>

{/* Hidden initially, revealed only on scroll */}
<div className="review-card">
  <div className="review-text">
    I love the variety of products on Mill. From fashion 
    to electronics, everything I need is available in one place.
  </div>
  <div className="reviewer-info">
    <div className="reviewer-avatar"><span>SK</span></div>
    <div className="reviewer-details">
      <h4>Samuel Kim</h4>
      <div className="rating"><span>⭐⭐⭐⭐</span></div>
    </div>
  </div>
</div>


    <div className="review-card">
      <div className="review-text">
        Mill always delivers on time. The packaging is great 
        and the quality is unmatched. Definitely my go-to online shop.
      </div>
      <div className="reviewer-info">
        <div className="reviewer-avatar"><span>MW</span></div>
        <div className="reviewer-details">
          <h4>Mary Wangari</h4>
          <div className="rating"><span>⭐⭐⭐⭐⭐</span></div>
        </div>
      </div>
    </div>

    <div className="review-card">
      <div className="review-text">
        Great prices and awesome deals! I managed to save a lot 
        during my first order. Highly recommend Mill to everyone.
      </div>
      <div className="reviewer-info">
        <div className="reviewer-avatar"><span>AA</span></div>
        <div className="reviewer-details">
          <h4>Ahmed Ali</h4>
          <div className="rating"><span>⭐⭐⭐⭐</span></div>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
   
  );
};

export default About;
