import React from 'react';
import "../styles/AboutUs.css";
import { Heading } from '@chakra-ui/react';


function AboutUs() {
  return (
    <div className='body'>
      <header className='cover-image'>
        <img src="https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg" alt="" />
      </header>
      <div className="column-boxes">
        <div className="column-box">
          <Heading>Culture and Values;</Heading>
          <div className="content">
            <p>To make it easy to do business anywhere.</p>
          </div>
        </div>
        <div className="column-box">
          <Heading>Mission;</Heading>
          <div className="content">
            <p>To enable our customers to access products and shop at their own comfort.</p>
          </div>
        </div>
        <div className="column-box">
          <Heading>Vision;</Heading>
          <div className="content">
            <p>We aspire to be a good company that will last for 100 plus years. We envision that our customers will meet, work, and live with us.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AboutUs;
