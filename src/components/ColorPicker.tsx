
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PaintBucket, RefreshCw } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const ColorPicker = () => {
  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor, resetColors } = useTheme();
  const [open, setOpen] = useState(false);

  // Convert hex to HSL for the color wheel visualization
  const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
    // Remove the # if present
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    let r = parseInt(hex.slice(0, 2), 16) / 255;
    let g = parseInt(hex.slice(2, 4), 16) / 255;
    let b = parseInt(hex.slice(4, 6), 16) / 255;

    // Find the maximum and minimum values
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: h * 360,
      s: s * 100,
      l: l * 100
    };
  };
  
  // Convert HSL to hex
  const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
  };

  // State for HSL values
  const [primaryHSL, setPrimaryHSL] = useState(hexToHSL(primaryColor));
  const [secondaryHSL, setSecondaryHSL] = useState(hexToHSL(secondaryColor));
  
  // Update HSL values when hex values change (from outside)
  React.useEffect(() => {
    setPrimaryHSL(hexToHSL(primaryColor));
  }, [primaryColor]);
  
  React.useEffect(() => {
    setSecondaryHSL(hexToHSL(secondaryColor));
  }, [secondaryColor]);

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
    <div className="fixed top-20 right-4 z-50 flex flex-col space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="glass glass-hover rounded-full h-12 w-12 p-0 flex items-center justify-center">
            <PaintBucket className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="glass p-5 rounded-xl shadow-xl w-80 border border-white/40" align="end">
          <div className="space-y-6">
            <div className="text-center mb-3">
              <h3 className="font-display font-semibold">Customize Theme</h3>
              <p className="text-sm text-muted-foreground">Choose your preferred colors</p>
            </div>
            
            {/* Primary Color Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
                  Primary Color
                </label>
                
                {/* Color wheel visualization */}
                <div className="flex items-center gap-3">
                  <div 
                    className="w-24 h-24 rounded-full overflow-hidden relative cursor-pointer border border-gray-200"
                    style={{ background: getHueGradient() }}
                  >
                    <div 
                      className="absolute w-4 h-4 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ 
                        left: `${(primaryHSL.h / 360) * 100}%`, 
                        top: '50%',
                        boxShadow: '0 0 3px rgba(0,0,0,0.5)'
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    {/* Hex input */}
                    <div className="relative flex h-9 overflow-hidden rounded-md">
                      <div
                        className="w-10 h-full pointer-events-none"
                        style={{ backgroundColor: primaryColor }}
                      ></div>
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={handlePrimaryHexChange}
                        className="flex-1 px-3 py-1 bg-white/60 backdrop-blur-sm text-sm"
                      />
                    </div>
                    
                    {/* HSL sliders */}
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Hue</span>
                          <span>{Math.round(primaryHSL.h)}°</span>
                        </div>
                        <Slider 
                          value={[primaryHSL.h]} 
                          min={0} 
                          max={360} 
                          step={1} 
                          onValueChange={handlePrimaryHueChange}
                          className="h-1.5"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Saturation</span>
                          <span>{Math.round(primaryHSL.s)}%</span>
                        </div>
                        <Slider 
                          value={[primaryHSL.s]} 
                          min={0} 
                          max={100} 
                          step={1} 
                          onValueChange={handlePrimarySaturationChange}
                          className="h-1.5"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Lightness</span>
                          <span>{Math.round(primaryHSL.l)}%</span>
                        </div>
                        <Slider 
                          value={[primaryHSL.l]} 
                          min={0} 
                          max={100} 
                          step={1} 
                          onValueChange={handlePrimaryLightnessChange}
                          className="h-1.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Secondary Color Section */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-sm font-medium flex items-center">
                  <span className="w-3 h-3 rounded-full bg-secondary mr-2"></span>
                  Secondary Color
                </label>
                
                {/* Color wheel visualization */}
                <div className="flex items-center gap-3">
                  <div 
                    className="w-24 h-24 rounded-full overflow-hidden relative cursor-pointer border border-gray-200"
                    style={{ background: getHueGradient() }}
                  >
                    <div 
                      className="absolute w-4 h-4 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ 
                        left: `${(secondaryHSL.h / 360) * 100}%`, 
                        top: '50%',
                        boxShadow: '0 0 3px rgba(0,0,0,0.5)'
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    {/* Hex input */}
                    <div className="relative flex h-9 overflow-hidden rounded-md">
                      <div
                        className="w-10 h-full pointer-events-none"
                        style={{ backgroundColor: secondaryColor }}
                      ></div>
                      <input
                        type="text"
                        value={secondaryColor}
                        onChange={handleSecondaryHexChange}
                        className="flex-1 px-3 py-1 bg-white/60 backdrop-blur-sm text-sm"
                      />
                    </div>
                    
                    {/* HSL sliders */}
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Hue</span>
                          <span>{Math.round(secondaryHSL.h)}°</span>
                        </div>
                        <Slider 
                          value={[secondaryHSL.h]} 
                          min={0} 
                          max={360} 
                          step={1} 
                          onValueChange={handleSecondaryHueChange}
                          className="h-1.5"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Saturation</span>
                          <span>{Math.round(secondaryHSL.s)}%</span>
                        </div>
                        <Slider 
                          value={[secondaryHSL.s]} 
                          min={0} 
                          max={100} 
                          step={1} 
                          onValueChange={handleSecondarySaturationChange}
                          className="h-1.5"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Lightness</span>
                          <span>{Math.round(secondaryHSL.l)}%</span>
                        </div>
                        <Slider 
                          value={[secondaryHSL.l]} 
                          min={0} 
                          max={100} 
                          step={1} 
                          onValueChange={handleSecondaryLightnessChange}
                          className="h-1.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
