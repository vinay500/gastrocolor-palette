
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface HSLColorSliderProps {
  label: string;
  value: number;
  max: number;
  onChange: (value: number[]) => void;
  unit?: string;
}

const HSLColorSlider = ({ label, value, max, onChange, unit = '' }: HSLColorSliderProps) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span>{label}</span>
        <span>{Math.round(value)}{unit}</span>
      </div>
      <Slider 
        value={[value]} 
        min={0} 
        max={max} 
        step={1} 
        onValueChange={onChange}
        className="h-1.5"
      />
    </div>
  );
};

export default HSLColorSlider;
