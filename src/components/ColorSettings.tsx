
import React from 'react';
import HSLColorSlider from './HSLColorSlider';
import ColorInput from './ColorInput';
import ColorWheel from './ColorWheel';

interface HSLColor {
  h: number;
  s: number;
  l: number;
}

interface ColorSettingsProps {
  label: string;
  color: string;
  hslColor: HSLColor;
  onHueChange: (value: number[]) => void;
  onSaturationChange: (value: number[]) => void;
  onLightnessChange: (value: number[]) => void;
  onHexChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onColorWheelChange: (hue: number, saturation: number) => void;
}

const ColorSettings = ({
  label,
  color,
  hslColor,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
  onHexChange,
  onColorWheelChange
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
          hue={hslColor.h} 
          saturation={hslColor.s} 
          onChange={onColorWheelChange} 
        />
        
        <div className="flex-1 space-y-4">
          <ColorInput color={color} onChange={onHexChange} />
          
          <div className="space-y-2">
            <HSLColorSlider 
              label="Lightness" 
              value={hslColor.l} 
              max={100} 
              onChange={onLightnessChange} 
              unit="%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSettings;
