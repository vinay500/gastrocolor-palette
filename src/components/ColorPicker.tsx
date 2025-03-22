
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PaintBucket, RefreshCw } from 'lucide-react';
import ColorSettings from './ColorSettings';
import { hslToHex } from '@/utils/colorUtils';

const ColorPicker = () => {
  const { 
    primaryColor, 
    secondaryColor, 
    setPrimaryColor, 
    setSecondaryColor, 
    resetColors, 
    hexToHSL 
  } = useTheme();
  
  const [open, setOpen] = useState(false);

  // State for HSL values
  const [primaryHSL, setPrimaryHSL] = useState(() => hexToHSL(primaryColor));
  const [secondaryHSL, setSecondaryHSL] = useState(() => hexToHSL(secondaryColor));
  
  // Update HSL values when hex values change (from outside)
  React.useEffect(() => {
    setPrimaryHSL(hexToHSL(primaryColor));
  }, [primaryColor, hexToHSL]);
  
  React.useEffect(() => {
    setSecondaryHSL(hexToHSL(secondaryColor));
  }, [secondaryColor, hexToHSL]);

  // Handle primary color HSL changes
  const handlePrimaryHueChange = (value: number[]) => {
    const newHSL = { ...primaryHSL, h: value[0] };
    setPrimaryHSL(newHSL);
    setPrimaryColor(hslToHex(newHSL.h, newHSL.s, newHSL.l));
  };
  
  const handlePrimarySaturationChange = (value: number[]) => {
    const newHSL = { ...primaryHSL, s: value[0] };
    setPrimaryHSL(newHSL);
    setPrimaryColor(hslToHex(newHSL.h, newHSL.s, newHSL.l));
  };
  
  const handlePrimaryLightnessChange = (value: number[]) => {
    const newHSL = { ...primaryHSL, l: value[0] };
    setPrimaryHSL(newHSL);
    setPrimaryColor(hslToHex(newHSL.h, newHSL.s, newHSL.l));
  };

  // Handle primary color wheel change
  const handlePrimaryColorWheelChange = (hue: number, saturation: number) => {
    const newHSL = { ...primaryHSL, h: hue, s: saturation };
    setPrimaryHSL(newHSL);
    setPrimaryColor(hslToHex(newHSL.h, newHSL.s, newHSL.l));
  };

  // Handle secondary color HSL changes
  const handleSecondaryHueChange = (value: number[]) => {
    const newHSL = { ...secondaryHSL, h: value[0] };
    setSecondaryHSL(newHSL);
    setSecondaryColor(hslToHex(newHSL.h, newHSL.s, newHSL.l));
  };
  
  const handleSecondarySaturationChange = (value: number[]) => {
    const newHSL = { ...secondaryHSL, s: value[0] };
    setSecondaryHSL(newHSL);
    setSecondaryColor(hslToHex(newHSL.h, newHSL.s, newHSL.l));
  };
  
  const handleSecondaryLightnessChange = (value: number[]) => {
    const newHSL = { ...secondaryHSL, l: value[0] };
    setSecondaryHSL(newHSL);
    setSecondaryColor(hslToHex(newHSL.h, newHSL.s, newHSL.l));
  };

  // Handle secondary color wheel change
  const handleSecondaryColorWheelChange = (hue: number, saturation: number) => {
    const newHSL = { ...secondaryHSL, h: hue, s: saturation };
    setSecondaryHSL(newHSL);
    setSecondaryColor(hslToHex(newHSL.h, newHSL.s, newHSL.l));
  };

  // Handle manual hex code input
  const handlePrimaryHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.startsWith('#') && e.target.value.length <= 7) {
      if (e.target.value.length === 7) {
        try {
          setPrimaryColor(e.target.value);
          setPrimaryHSL(hexToHSL(e.target.value));
        } catch (error) {
          console.error('Invalid hex color');
        }
      } else {
        setPrimaryColor(e.target.value);
      }
    }
  };
  
  const handleSecondaryHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.startsWith('#') && e.target.value.length <= 7) {
      if (e.target.value.length === 7) {
        try {
          setSecondaryColor(e.target.value);
          setSecondaryHSL(hexToHSL(e.target.value));
        } catch (error) {
          console.error('Invalid hex color');
        }
      } else {
        setSecondaryColor(e.target.value);
      }
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="glass glass-hover rounded-full h-12 w-12 p-0 flex items-center justify-center">
            <PaintBucket className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="glass p-5 rounded-xl shadow-xl w-[340px] border border-white/40" align="end">
          <div className="space-y-6">
            <div className="text-center mb-3">
              <h3 className="font-display font-semibold">Customize Theme</h3>
              <p className="text-sm text-muted-foreground">Choose your preferred colors</p>
            </div>
            
            {/* Primary Color Section */}
            <ColorSettings 
              label="Primary Color"
              color={primaryColor}
              hslColor={primaryHSL}
              onHueChange={handlePrimaryHueChange}
              onSaturationChange={handlePrimarySaturationChange}
              onLightnessChange={handlePrimaryLightnessChange}
              onHexChange={handlePrimaryHexChange}
              onColorWheelChange={handlePrimaryColorWheelChange}
            />
            
            {/* Secondary Color Section */}
            <div className="pt-2 border-t border-gray-100">
              <ColorSettings 
                label="Secondary Color"
                color={secondaryColor}
                hslColor={secondaryHSL}
                onHueChange={handleSecondaryHueChange}
                onSaturationChange={handleSecondarySaturationChange}
                onLightnessChange={handleSecondaryLightnessChange}
                onHexChange={handleSecondaryHexChange}
                onColorWheelChange={handleSecondaryColorWheelChange}
              />
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetColors} 
              className="w-full flex items-center justify-center text-sm"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset to Default
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPicker;
