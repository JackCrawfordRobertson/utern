import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Timeline from "../Timeline";
import MasterScrollingTextComponent from '../ScrollingText/MasterScrollingTextComponent';




const confirmation = [
  {
    date: "8 February 2024",
    text: "Labour confirms the party does not now believe it will be able to meet the commitment of £28bn a year in its green prosperity plan, blaming the Conservatives for “crashing” the economy, and what it described as the government’s plan to “max out the country’s credit card”. Instead, Labour “reconfirms” its commitment to policies under the plan to create jobs and cut bills. It says the policies would represent £23.7bn of investment over the course of the next parliament, funded in large part by a windfall tax on oil and gas companies, with the remainder coming through borrowing.",
  },
];

const ScrollJourneyBottom = () => {
  const controls = useAnimation();
  const testRef = useRef(null);
  const scrollRef = useRef(null); // Ref for the scrolling text component
  const [isMobile, setIsMobile] = useState(false);

  // Resize event for mobile check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 });
        } else {
          controls.start({ opacity: 0, y: -50 });
        }
      },
      {
        root: null, // viewport
        threshold: 1.0, // Trigger when 100% of the target is visible
      }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current);
      }
    };
  }, [controls]);

  const scrollToTest = () => {
    testRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <motion.div
        ref={testRef}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Timeline data={confirmation} />
      </motion.div>

      <div ref={scrollRef} style={{ minHeight: "85vh" }}> {/* Ensuring this div is in view before starting text scroll */}
        <p style={{ fontSize: "calc(5vw + 1rem)", margin: '0' }}>
          But what could have been
          <motion.span
            onClick={scrollToTest}
            style={{
              fontSize: "calc(5vw + 1rem)",
              color: "#3da9fc", 
              cursor: "pointer",
              textAlign: isMobile ? "left" : "center",
            }}
            animate={{ y: ["0%", "-20%", "0%"] }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            ?
          </motion.span>
        </p>
        
        <MasterScrollingTextComponent />

      </div>
    </div>
  );
};

export default ScrollJourneyBottom;
