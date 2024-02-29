// components/AutoPlayVideo.js
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AutoPlayVideo = ({ src, type = "video/mp4" }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          videoRef.current.play();
        } else {
          setIsVisible(false);
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 } // Adjust if necessary to change when the video starts playing
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoRef]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      style={{ width: '100%',  }} // Ensure the container takes up the full width
    >
      <video
        ref={videoRef}
        width="100%"
        loop
        style={{ maxWidth: 'auto', height: 'auto', borderRadius:'20px', marginTop:'2em', marginBottom:'2em' }} // Ensures responsiveness
        playsInline // Improves mobile experience
      >
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
};

export default AutoPlayVideo;
