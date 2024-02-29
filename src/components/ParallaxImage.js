import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';

const ParallaxImage = ({ src, speed = -20 }) => {
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
    width: isMobile ? '70%' : '40%', // 50% width on mobile, 40% on desktop
    height: 'auto',
    marginLeft: isMobile ? 'auto' : 'auto', // Aligns the image to the right on desktop
    marginRight: isMobile ? '0' : '0', // Ensures the image stays right-aligned on desktop
    display: 'block',
  };
  

  return (
    <Parallax speed={speed} className="parallax-image-container">
      <img src={src} alt="" style={imageStyle} />
    </Parallax>
  );
};

export default ParallaxImage;
