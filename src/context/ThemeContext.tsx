
import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeContextType = {
  primaryColor: string;
  secondaryColor: string;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  resetColors: () => void;
  hexToHSL: (hex: string) => { h: number; s: number; l: number };
};

const DEFAULT_PRIMARY = "#1E88E5"; // Default blue
const DEFAULT_SECONDARY = "#26C6DA"; // Default teal

const ThemeContext = createContext<ThemeContextType>({
  primaryColor: DEFAULT_PRIMARY,
  secondaryColor: DEFAULT_SECONDARY,
  setPrimaryColor: () => {},
  setSecondaryColor: () => {},
  resetColors: () => {},
  hexToHSL: () => ({ h: 0, s: 0, l: 0 }),
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [primaryColor, setPrimaryColorState] = useState(() => {
    return localStorage.getItem("primaryColor") || DEFAULT_PRIMARY;
  });
  
  const [secondaryColor, setSecondaryColorState] = useState(() => {
    return localStorage.getItem("secondaryColor") || DEFAULT_SECONDARY;
  });

  const setPrimaryColor = (color: string) => {
    setPrimaryColorState(color);
    localStorage.setItem("primaryColor", color);
    updateCssVariables(color, secondaryColor);
  };

  const setSecondaryColor = (color: string) => {
    setSecondaryColorState(color);
    localStorage.setItem("secondaryColor", color);
    updateCssVariables(primaryColor, color);
  };

  const resetColors = () => {
    setPrimaryColorState(DEFAULT_PRIMARY);
    setSecondaryColorState(DEFAULT_SECONDARY);
    localStorage.removeItem("primaryColor");
    localStorage.removeItem("secondaryColor");
    updateCssVariables(DEFAULT_PRIMARY, DEFAULT_SECONDARY);
  };

  const updateCssVariables = (primary: string, secondary: string) => {
    const root = document.documentElement;
    
    // Convert hex to HSL for primary
    const primaryHsl = hexToHSL(primary);
    root.style.setProperty("--primary", `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
    
    // Convert hex to HSL for secondary
    const secondaryHsl = hexToHSL(secondary);
    root.style.setProperty("--secondary", `${secondaryHsl.h} ${secondaryHsl.s}% ${secondaryHsl.l}%`);
  };

  useEffect(() => {
    updateCssVariables(primaryColor, secondaryColor);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        secondaryColor,
        setPrimaryColor,
        setSecondaryColor,
        resetColors,
        hexToHSL,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Helper function to convert hex to HSL
export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove the # if present
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  let r = parseInt(hex.slice(0, 2), 16) / 255;
  let g = parseInt(hex.slice(2, 4), 16) / 255;
  let b = parseInt(hex.slice(4, 6), 16) / 255;

  // Find the maximum and minimum values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  // Calculate lightness
  let l = (max + min) / 2;
  
  let h = 0, s = 0;
  
  if (max === min) {
    // Achromatic (gray)
    h = 0;
    s = 0;
  } else {
    // Calculate saturation
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    
    // Calculate hue
    switch (max) {
      case r:
        h = ((g - b) / (max - min)) + (g < b ? 6 : 0);
        break;
      case g:
        h = ((b - r) / (max - min)) + 2;
        break;
      case b:
        h = ((r - g) / (max - min)) + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  // Convert to degrees, percentage, percentage
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}
