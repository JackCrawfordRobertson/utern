import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/page.module.css'; 

const ImageGrid = ({ images }) => {
  return (
    <div className={styles.gridContainer}> 
      {images.map((image, index) => (
        <div className={styles.imageContainer} key={index}> 
          <motion.img
            src={image}
            className={styles.image} 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
