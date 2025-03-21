
import React from 'react';

interface ColorWheelProps {
  hue: number;
}

const ColorWheel = ({ hue }: ColorWheelProps) => {
  // Generate color wheel background
  const getHueGradient = () => {
    return `conic-gradient(
      from 0deg,
      hsl(0, 100%, 50%),
      hsl(60, 100%, 50%),
      hsl(120, 100%, 50%),
      hsl(180, 100%, 50%),
      hsl(240, 100%, 50%),
      hsl(300, 100%, 50%),
      hsl(360, 100%, 50%)
    )`;
  };

  return (
    <div 
      className="w-24 h-24 rounded-full overflow-hidden relative cursor-pointer border border-gray-200"
      style={{ background: getHueGradient() }}
    >
      <div 
        className="absolute w-4 h-4 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ 
          left: `${(hue / 360) * 100}%`, 
          top: '50%',
          boxShadow: '0 0 3px rgba(0,0,0,0.5)'
        }}
      ></div>
    </div>
  );
};

export default ColorWheel;
