import React, { useState, useEffect } from "react";
import DesktopScrollingTextComponent from "./DesktopScrollingTextComponent";
import MobileScrollingTextComponent from "./MobileScrollingTextComponent";

const MasterScrollingTextComponent = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileScrollingTextComponent />
      ) : (
        <DesktopScrollingTextComponent />
      )}
    </>
  );
};

export default MasterScrollingTextComponent;
