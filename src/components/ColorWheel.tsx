
import React, { useRef, useEffect } from 'react';

interface ColorWheelProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorWheel = ({ color, onChange }: ColorWheelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Draw color wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 5;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw color wheel with varying brightness
    for (let angle = 0; angle < 360; angle++) {
      for (let s = 0; s < radius; s++) {
        const rad = (angle * Math.PI) / 180;
        const x = centerX + s * Math.cos(rad);
        const y = centerY + s * Math.sin(rad);
        
        // Calculate brightness based on distance from center
        const brightness = 1 - (s / radius) * 0.5;
        
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, 2 * Math.PI, false);
        ctx.fillStyle = `hsl(${angle}, ${(s / radius) * 100}%, ${brightness * 50}%)`;
        ctx.fill();
      }
    }

    // Draw selector
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    const selectorRad = (hsl.h * Math.PI) / 180;
    const selectorDist = hsl.s * radius;
    const selectorX = centerX + selectorDist * Math.cos(selectorRad);
    const selectorY = centerY + selectorDist * Math.sin(selectorRad);

    ctx.beginPath();
    ctx.arc(selectorX, selectorY, 6, 0, 2 * Math.PI, false);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(selectorX, selectorY, 5, 0, 2 * Math.PI, false);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [color]);

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }

    return { h: h * 360, s: s, l: l };
  };

  // Convert HSL to Hex
  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Handle mouse and touch events
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    handlePointerMove(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate position relative to canvas center
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 5;
    
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    
    // Convert to polar coordinates
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    if (angle < 0) angle += 360; // Convert to 0-360 range
    
    // Calculate distance from center (for saturation)
    const distance = Math.sqrt(x * x + y * y);
    const saturationValue = Math.min(1, Math.max(0, distance / radius));
    
    // Calculate color based on angle (hue) and distance (saturation)
    // Use a fixed lightness value for vivid colors
    const lightness = 0.5 - (saturationValue * 0.15); // Adjust lightness to make colors more vivid
    const newColor = hslToHex(angle, saturationValue, lightness);
    
    onChange(newColor);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener('pointerup', handlePointerUp);
    return () => {
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative rounded-full overflow-hidden cursor-pointer border border-gray-200"
      style={{ width: '150px', height: '150px' }}
    >
      <canvas 
        ref={canvasRef}
        width={150}
        height={150}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="touch-none"
      />
    </div>
  );
};

export default ColorWheel;
