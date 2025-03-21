
import React from 'react';

interface ColorInputProps {
  color: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorInput = ({ color, onChange }: ColorInputProps) => {
  return (
    <div className="relative flex h-9 overflow-hidden rounded-md">
      <div
        className="w-10 h-full pointer-events-none"
        style={{ backgroundColor: color }}
      ></div>
      <input
        type="text"
        value={color}
        onChange={onChange}
        className="flex-1 px-3 py-1 bg-white/60 backdrop-blur-sm text-sm"
      />
    </div>
  );
};

export default ColorInput;
