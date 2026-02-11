"use client";
import { useEffect, useState } from "react";

export default function Preloader({ onLoaded }) {
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onLoaded();
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onLoaded]);

  if (!isVisible) return null;

  return (
    <div className={`preloader ${loadPercentage === 100 ? "fade-out" : ""}`}>
      <div className="loader-logo-container">
        <div
          className="logo-fill-bar"
          style={{ width: `${loadPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
