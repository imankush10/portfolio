// components/LenisProvider.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

// 1. Create the context
const LenisContext = createContext(null);

// 2. Create a custom hook for easy access to the context
export const useLenis = () => {
  return useContext(LenisContext);
};

// 3. Create the provider component
export const LenisProvider = ({ children }) => {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    // Initialize Lenis, using your existing options
    const lenisInstance = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.1,
    });

    // Store the instance in state
    setLenis(lenisInstance);

    // RAF loop for animations
    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // Your optional scroll progress bar logic
    const bar = document.getElementById("scroll-progress");
    if (bar) {
      lenisInstance.on("scroll", ({ scroll, limit }) => {
        const p = limit ? (scroll / limit) * 100 : 0;
        bar.style.height = `${p}%`;
      });
    }

    // Cleanup on component unmount
    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
};
