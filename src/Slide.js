import React from 'react';
import ImageSlider from './ImageSlider';
import './Slide.css';  // Import the CSS file

const Slide = () => {
  
  const images = [
    'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202301/generic_banner_ind-sixteen_nine.png?size=948:533',
    'https://www.financialexpress.com/wp-content/uploads/2022/09/Screenshot-2022-09-27-at-4.25.12-PM-1.png',
    
  ];

  return (
    <div className="center-container">
      <div className="image-slider">
        <ImageSlider images={images} />
      </div>
    </div>
  );
};

export default Slide;
