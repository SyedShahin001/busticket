import React, { useEffect } from 'react';
import Home from './Component/Home';
import Slide from './Slide';
import About from './About';
import './Landingpage.css'; // Import the CSS file for styling
import Contactus from './Contactus'; // Update component name to ContactUs
import ImageComponent from './ImageComponent';

function Landingpage() {
  return (
    <div className="landingpage-container">
      <Home />
      <div className="page-space"></div>
      <Slide />
      <div className="page-space"></div>
      <About />
      <div className="page-space"></div>
      <ImageComponent /> <br></br><br></br>
      <div className="page-space"></div>
      <Contactus />
    </div>
  );
}

export default Landingpage;
