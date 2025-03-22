
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

    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      for (let s = 0; s < radius; s++) {
        const rad = (angle * Math.PI) / 180;
        const x = centerX + s * Math.cos(rad);
        const y = centerY + s * Math.sin(rad);
        
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, 2 * Math.PI, false);
        ctx.fillStyle = `hsl(${angle}, ${(s / radius) * 100}%, 50%)`;
        ctx.fill();
      }
    }

    // Draw selector
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    if (hsl.s > 0) { // Only draw selector for non-grayscale colors
      const selectorRad = (hsl.h * Math.PI) / 180;
      const selectorDist = hsl.s * radius / 100;
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
    }
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

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  // Convert HSL to Hex
  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    const toHex = (x: number) => {
      const hex = Math.round(x).toString(16);
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
    let distance = Math.sqrt(x * x + y * y);
    const saturationValue = Math.min(1, Math.max(0, distance / radius));
    
    // Calculate color based on angle (hue) and distance (saturation)
    const newColor = hslToHex(angle, saturationValue * 100, 50);
    
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
      className="relative rounded-full overflow-hidden cursor-pointer"
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
