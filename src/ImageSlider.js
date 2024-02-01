import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = ({ images }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    // Initialize slick carousel after the component is mounted
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0); // Ensure the slider is at the first slide
    }
  }, [images]);

  // Check if 'images' is defined and is an array
  if (!images || !Array.isArray(images) || images.length === 0) {
    // Return some placeholder content or an error message
    return <p>No images to display.</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="slick-container">
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
