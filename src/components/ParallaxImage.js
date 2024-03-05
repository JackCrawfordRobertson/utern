import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';

const ParallaxImage = ({ src }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', checkIfMobile);
    checkIfMobile(); // Initial check

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const imageStyle = {
    width: isMobile ? '100%' : '30%', // Adjusted width for mobile and desktop
    height: 'auto',
    marginLeft: isMobile ? 'auto' : 'auto', // Aligns the image to the right on desktop
    marginRight: isMobile ? '0' : '0', // Ensures the image stays right-aligned on desktop
    display: 'block',
  };

  // Adjust the Parallax speed based on the device
  const parallaxSpeed = isMobile ? -4 : -10;

  return (
    <Parallax speed={parallaxSpeed} className="parallax-image-container">
      <img src={src} alt="" style={imageStyle} />
    </Parallax>
  );
};

export default ParallaxImage;
