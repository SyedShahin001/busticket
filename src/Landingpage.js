import React,{useEffect} from 'react';
import Home from './Component/Home';
import Slide from './Slide';
import About from './About';
import './Landingpage.css'; // Create a separate CSS file for styling
import Contactus from './Contactus';
import ImageComponent from './ImageComponent';

function Landingpage() {


  return (
    
    <div className="landingpage-container">
      <br />
      <Home />
      
      <div className="page-space"></div> {/* Adjust the height as needed */}
      <Slide /> <br /><br />
      <br></br><br></br>
      <div className="page-space"></div> {/* Adjust the height as needed */}
      <About />
      <br></br><br></br><br/>
      <div className="page-space"></div> {/* Adjust the height as needed */}
      <ImageComponent />
      <br></br>
      <div className="page-space"></div>
      <Contactus />
    </div>
    
  );
}

export default Landingpage;
