import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");

      // Start fade out and then fade in with new content
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("fadeIn");
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div
      key={displayLocation.pathname}
      className={`transition-all duration-300 ease-in-out ${
        transitionStage === "fadeIn"
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-4"
      }`}
    >
      {children}
    </div>
  );
};
