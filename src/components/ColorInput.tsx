
import React from 'react';
import { Input } from '@/components/ui/input';

interface ColorInputProps {
  color: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorInput = ({ color, onChange }: ColorInputProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div
        className="w-8 h-8 rounded-md border border-gray-200"
        style={{ backgroundColor: color }}
      ></div>
      <Input
        type="text"
        value={color}
        onChange={onChange}
        placeholder="#000000"
        className="w-full"
      />
    </div>
  );
};

export default ColorInput;
