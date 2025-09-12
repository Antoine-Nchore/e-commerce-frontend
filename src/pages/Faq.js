import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/faq.css';


const faqs = [
  {
    question: 'How can I place an order?',
    answer:
      'Placing an order is easy! Simply browse our website, select the products you want, add them to your cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept a variety of payment methods, including credit cards and cash on delivery. Choose the one that suits you best during the checkout process.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Delivery times may vary depending on your location and the product. We strive to deliver your orders as quickly as possible, and you can check the estimated delivery time during the checkout process.',
  },
  {
    question: 'Do you offer refunds or returns?',
    answer:
      "Yes, we have a hassle-free return and refund policy. If you're not satisfied with your purchase, you can initiate a return request, and we'll guide you through the process.",
  },
  {
    question: 'Is my personal information safe?',
    answer:
      'Absolutely. We take data security seriously and have robust measures in place to protect your personal information. Your data is safe with us.',
  },
];



const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  
    const handleClick = () => {
    navigate("/contact");
      window.scrollTo({
    top: 0,
    behavior: "smooth", 
  });
  };

  return (
    <div className="faq-wrapper">
      <div className="faq-container">
        {/* Header Section */}
        <div className="faq-header">
          <div className="faq-badge">
            <span>Support Center</span>
          </div>
          <h1 className="faq-title">
            Frequently Asked
            <span className="faq-title-gradient">Questions</span>
          </h1>
          <p className="faq-subtitle">
            Find answers to common questions about our services and get the help you need.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="faq-list">
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleAnswer(index)}
            >
              <div className="faq-question-container">
                <h3 className="faq-question">{item.question}</h3>
                <div className={`faq-icon ${activeIndex === index ? 'rotated' : ''}`}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              
              <div className={`faq-answer-container ${activeIndex === index ? 'expanded' : ''}`}>
                <div className="faq-answer-content">
                  <div className="faq-divider"></div>
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="faq-contact">
          <div className="faq-contact-content">
            <h2 className="faq-contact-title">Still have questions?</h2>
            <p className="faq-contact-description">
              Can't find the answer you're looking for? Our friendly customer support team is here to help.
            </p>
            <div className="faq-contact-buttons">
              <button className="faq-btn-primary" onClick={handleClick}>Contact Support</button>
              <button className="faq-btn-secondary">Live Chat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;