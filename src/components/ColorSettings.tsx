
import React from 'react';
import ColorInput from './ColorInput';
import ColorWheel from './ColorWheel';
import { Label } from '@/components/ui/label';

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
    <div className="space-y-4">
      <Label className="text-sm font-medium flex items-center gap-2">
        <span 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        ></span>
        {label}
      </Label>
      
      <div className="flex flex-col items-center gap-4">
        <ColorWheel 
          color={color} 
          onChange={onColorChange} 
        />
        
        <div className="w-full">
          <ColorInput color={color} onChange={onHexChange} />
        </div>
      </div>
    </div>
  );
};

export default ColorSettings;
