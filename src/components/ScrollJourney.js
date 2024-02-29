import React, {useState, useEffect, useRef} from "react";
import {motion, useAnimation} from "framer-motion";
import Timeline from "./Timeline";
import ImageGrid from "./ImageGrid";
import ParallaxImage from "../components/ParallaxImage";
import My3DComponent from "./3DComponent";

const confrence21_text = [
    {
        date: "27 September 2021",
        text: "Rachel Reeves the UK's first 'green chancellor' walks onto stage at the Brightion party confrence, stating a £28bn anual comitment to green investments.",
    },
];
const muni_budget = [
    {
        date: "23 September 2022",
        text: "Liz Truss's mini-budget creates a £30bn fiscal black hole, prompting Labour to reassess its financial strategies.",
    },
];
const scale_back = [
    {
        date: "9 June 2023",
        text: "Labour scales back plans to borrow £28bn a year to invest in green jobs and industry. Citing the poor economic backdrop and interest rate rises since the Truss mini-budget.",
    },
];

const interview = [
    {
        date: "1 February 2024",
        text: "In an interview on Sky News Reeves was asked 10 times if she backed the pledge. She chose not to mention the specific figure, focusing instead on the broader principle that 'the importance of economic and fiscal stability … will always come first'.",
    },
];

const confrence21 = [ "/images/01.png", "/images/02.png", "/images/03.png" ];

const stackedComponentsStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center the children horizontally
    width: "100%", // Take full width to respect the parent's layout
};

const ScrollJourney = () => {
    const controls = useAnimation();
    const [ scrolled, setScrolled ] = useState(false);
    const testRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 50 ? setScrolled(true) : setScrolled(false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (scrolled) {
            controls.start({opacity: 0, y: -50});
        }
        else {
            controls.start({opacity: 1, y: 0});
        }
    }, [ scrolled, controls ]);

    const scrollToTest = () => {
        testRef.current.scrollIntoView({behavior: "smooth"});
    };

    const [ isMobile, setIsMobile ] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <motion.div
                animate={controls}
                initial={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                style={{
                    height: "40vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    marginTop: "8em",
                }}
            >
                <p style={{fontSize: "calc(5vw + 1rem)"}}>Scroll to start investigation</p>
                <motion.span
                    onClick={scrollToTest}
                    style={{
                        fontSize: "calc(5vw + 1rem)",
                        color: "#3da9de",
                        cursor: "pointer",
                        textAlign: isMobile ? "left" : "center",
                    }}
                    animate={{y: [ "0%", "-20%", "0%" ]}}
                    transition={{
                        duration: 2.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                >
                    ↓
                </motion.span>
            </motion.div>

            <motion.div
                ref={testRef}
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.3}}
                style={{height: "70vh", display: "flex", justifyContent: "center", alignItems: "center"}}
            >
                <Timeline data={confrence21_text} />
            </motion.div>

            <motion.div>
                <ImageGrid images={confrence21} />
            </motion.div>

            <div>
                <motion.div
                    ref={testRef}
                    initial={{opacity: 0, y: 100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.3}}
                    style={{height: "60vh", display: "flex", justifyContent: "center", alignItems: "center"}}
                >
                    <Timeline data={muni_budget} />
                </motion.div>

                <ParallaxImage src="/images/04.webp" alt="Descriptive text about the image" strength={30} />
            </div>
            <div style={stackedComponentsStyle}>
                <motion.div
                    initial={{opacity: 0, y: 100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.3}}
                    style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}
                >
                    <Timeline data={scale_back} />
                </motion.div>

                <My3DComponent />
            </div>

            <motion.div
                ref={testRef}
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.3}}
                style={{height: "60vh", display: "flex", justifyContent: "center", alignItems: "center"}}
            >
                <Timeline data={interview} />
            </motion.div>
        </div>
    );
};

export default ScrollJourney;
