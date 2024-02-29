import React from "react";
import {motion} from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "../../styles/page.module.css";

const TimelineItem = ({item, index}) => {
    const {ref, inView} = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });

    return (
        <motion.div
            ref={ref}
            key={index}
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5}}
            transition={{duration: 0.5, ease: "easeOut"}}
            style={{
                marginBottom: "40px",
                borderLeft: "2px solid #3da9de",
                paddingLeft: "20px",
                position: "relative",
                width: "100%", // Ensure this element takes the full width of its parent
            }}
        >
            <span
                style={{
                    fontWeight: "bold",
                    background: "#fff",
                    position: "absolute",
                    left: "-10.9px",
                    top: "0",
                    borderRadius: "50%",
                    width: "16px",
                    height: "16px",
                    display: "inline-block",
                    border: "2px solid #3da9de",
                }}
            ></span>
        

            <p className={styles.dateText}>{item.date}</p>
            <p className={styles.detailText}>{item.text}</p>
        </motion.div>
    );
};

const Timeline = ({data}) => {
    return (
        <div
            style={{
                padding: "20px",
                width: "100%", // Set to 100% width
            }}
        >
            {data.map((item, index) => (
                <TimelineItem item={item} index={index} key={index} />
            ))}
        </div>
    );
};

export default Timeline;
