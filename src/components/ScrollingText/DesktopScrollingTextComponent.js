import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import EmissionsPieChart from "./EmissionsPieChart";
import { texts, additionalTexts } from "./TextsComponent";

const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
};

const DesktopScrollingTextComponent = () => {
    const [currentText, setCurrentText] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const sectionHeight = container.scrollHeight / texts.length;

            const handleContainerScroll = () => {
                const currentIdx = Math.floor(container.scrollTop / sectionHeight);
                setCurrentText(currentIdx);
            };

            container.addEventListener("scroll", handleContainerScroll);
            return () => container.removeEventListener("scroll", handleContainerScroll);
        }
    }, [texts.length]);

    return (
        <div style={{ display: "flex", flexDirection: "row", height: "70vh" }}>
            {/* Navigation Indicator */}
            <div style={{ marginRight: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {texts.map((_, index) => (
                    <motion.div
                        key={index}
                        style={{
                            fontWeight: currentText === index ? "bold" : "normal", // Highlight the current text
                            marginBottom: "10px",
                            cursor: "pointer",
                        }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => {
                            // Optional: Allow clicking on the indicator to scroll to the section
                            const sectionHeight = containerRef.current.scrollHeight / texts.length;
                            containerRef.current.scrollTop = sectionHeight * index;
                        }}
                    >
                        {index + 1}
                    </motion.div>
                ))}
            </div>

            {/* Text Sections */}
            <div
                ref={containerRef}
                style={{
                    overflowY: "scroll",
                    scrollSnapType: "y proximity",
                    width: "50%",
                    height: "70vh",
                    backgroundColor: "#e5e5e5",
                    borderRadius: "10px",
                    marginRight: "20px",
                }}
            >
                {texts.map((text, index) => (
                    <motion.div
                        key={index}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        style={{
                            scrollSnapAlign: "start",
                            height: "70vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "left",
                            padding: "20px",
                        }}
                    >
                        <h1>{text}</h1>
                        <p>{additionalTexts[index]}</p>
                    </motion.div>
                ))}
            </div>

            {/* Pie Chart */}
            <div style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <EmissionsPieChart currentSection={currentText} totalSections={texts.length} />
            </div>
        </div>
    );
};

export default DesktopScrollingTextComponent;
