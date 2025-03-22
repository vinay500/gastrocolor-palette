
import React, { useRef, useEffect } from 'react';

interface ColorWheelProps {
  hue: number;
  saturation: number;
  onChange: (hue: number, saturation: number) => void;
}

const ColorWheel = ({ hue, saturation, onChange }: ColorWheelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

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
    const selectorRad = (hue * Math.PI) / 180;
    const selectorDist = (saturation / 100) * radius;
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
  }, [hue, saturation]);

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
    const saturationValue = Math.min(100, Math.max(0, (distance / radius) * 100));
    
    onChange(angle, saturationValue);
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
