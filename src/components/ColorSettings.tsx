
import React from 'react';
import ColorInput from './ColorInput';
import ColorWheel from './ColorWheel';

interface ColorSettingsProps {
  label: string;
  color: string;
  onColorChange: (color: string) => void;
  onHexChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorSettings = ({
  label,
  color,
  onColorChange,
  onHexChange
}: ColorSettingsProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center">
        <span 
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: color }}
        ></span>
        {label}
      </label>
      
      <div className="flex items-center gap-4">
        <ColorWheel 
          color={color} 
          onChange={onColorChange} 
        />
        
        <div className="flex-1">
          <ColorInput color={color} onChange={onHexChange} />
        </div>
      </div>
    </div>
  );
};

export default ColorSettings;
