import React, {useState, useEffect, useRef} from "react";
import {motion} from "framer-motion";
import EmissionsPieChart from "./EmissionsPieChart"; // Adjust the import path as necessary

const textVariants = {
    hidden: {y: 50, opacity: 0},
    visible: {y: 0, opacity: 1},
};

const additionalTexts = [
    "The UK has some of the oldest and draughtiest housing stock in Western Europe. Buildings are the UK’s second highest-emitting sector, accounting for 17% of total emissions in 2022. Using more energy than necessary to heat our homes is pushing up bills. The next government must focus on reducing the amount of energy we waste through a national energy efficiency programme. A government-funded insulation scheme would help keep homes warmer in winter and cooler in summer, saving money and lives.",
    "Electric vehicles are essential for reaching net zero. They’re nice to drive, and cheaper to run. But few people can afford a new electric car, and there aren’t enough charging points around the country. Labour could scale up charging infrastructure and support investment in 10 battery gigafactories by 2040, the amount experts say is needed. Our failing public transport system could also be completely transformed with proper investment to expand and electrify bus and train services across the country. Transport is the UK’s highest-emitting sector, contributing 23% of total UK emissions in 2022. Upgrading transport would also massively improve air quality.",
    "Over-reliance on fossil fuels is behind our skyrocketing energy bills. Renewable energy is much cheaper – at one point last year, wind was nine times cheaper than gas. The UK has vast untapped access to wind, solar and tidal power. But years of neglect means we’re stuck in a ridiculous situation. Renewable energy projects are waiting around fifteen 15 years to connect to our outdated electricity grid. Labour’s £28 billion could fund greener, cheaper renewable energy and grid upgrades. This would mean real, homegrown energy security.",
];

const ScrollingTextComponent = ({ texts }) => {
    const [currentText, setCurrentText] = useState(0);
    const [isMobile, setIsMobile] = useState(false); // Initially set to false
    const containerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Execute once to set initial state based on current viewport width
        handleResize();

        // Setup resize event listener to adjust isMobile state on viewport changes
        window.addEventListener('resize', handleResize);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Adjusted to handle scroll on both desktop and mobile
    const handleScroll = () => {
        if (!containerRef.current) return;
        const { scrollTop, offsetHeight } = containerRef.current;
        const index = Math.floor(scrollTop / offsetHeight);
        if (index !== currentText) setCurrentText(index);
    };

    useEffect(() => {
        // Apply scroll event listener to handle both desktop and mobile
        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, [currentText]);

    return (
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", height: isMobile ? "auto" : "70vh" }}>

<div style={{ zIndex: "",width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px 0" }}>
                <EmissionsPieChart currentSection={currentText} totalSections={texts.length} />
            </div>
            <div
                ref={containerRef}
                style={{
                    overflowY: "scroll",
                    width: "100%",
                    height: isMobile ? "100vh" : "70vh",
                    scrollSnapType: "y mandatory",
                }}
            >
                {texts.map((text, index) => (
                    <motion.div
                        key={index}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        transition={{ duration: 0.5 }}
                        style={{
                            height: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            scrollSnapAlign: "start",
                            textAlign: "left",
                            padding: "0 20px",
                        }}
                    >
                        <h1>{text}</h1>
                        <p>{additionalTexts[index]}</p>
                    </motion.div>
                ))}
            </div>
           
        </div>
    );
};

export default ScrollingTextComponent;
