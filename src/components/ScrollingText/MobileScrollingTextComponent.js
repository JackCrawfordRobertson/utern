import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import EmissionsPieChart from "./EmissionsPieChart";
import { texts, additionalTexts } from "./TextsComponent";

const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const MobileScrollingTextComponent = () => {
    const [currentText, setCurrentText] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const handleScroll = () => {
            const sectionHeight = container.scrollHeight / texts.length;
            const currentIdx = Math.floor(container.scrollTop / sectionHeight);
            setCurrentText(currentIdx);
        };

        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, [texts.length]);

    return (
        <div style={{ flexDirection: "column", height: "70vh" }}>
            <div
                ref={containerRef}
                style={{
                    overflowY: "scroll",
                    width: "100%",
                    height: "70vh", // Adjust based on your design, leaving space for the pie chart
                    scrollSnapType: "y mandatory",
                }}>
                {texts.map((text, index) => (
                    <motion.div
                        key={index}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        style={{
                            scrollSnapAlign: "start",
                            minHeight: "80vh", 
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            textAlign: "left",
                            padding: "20px",
                        }}>
                        <h1 style={{ color: index === currentText ? "#007bff" : "#000" }}>{text}</h1>
                        <p>{additionalTexts[index]}</p>
                    </motion.div>
                ))}
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                <EmissionsPieChart currentSection={currentText} totalSections={texts.length} />
            </div>
        </div>
    );
};

export default MobileScrollingTextComponent;
