
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
}

const ColorSettings = ({
  label,
  color,
  hslColor,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
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
      
      <div className="flex items-center gap-3">
        <ColorWheel hue={hslColor.h} />
        
        <div className="flex-1 space-y-4">
          <ColorInput color={color} onChange={onHexChange} />
          
          <div className="space-y-2">
            <HSLColorSlider 
              label="Hue" 
              value={hslColor.h} 
              max={360} 
              onChange={onHueChange} 
              unit="°"
            />
            
            <HSLColorSlider 
              label="Saturation" 
              value={hslColor.s} 
              max={100} 
              onChange={onSaturationChange} 
              unit="%"
            />
            
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
