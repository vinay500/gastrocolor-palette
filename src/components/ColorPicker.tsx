
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PaintBucket, RefreshCw } from 'lucide-react';
import ColorSettings from './ColorSettings';
import { useIsMobile } from '@/hooks/use-mobile';

const ColorPicker = () => {
  const { 
    primaryColor, 
    secondaryColor, 
    setPrimaryColor, 
    setSecondaryColor, 
    resetColors
  } = useTheme();
  
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  // Handle primary color changes
  const handlePrimaryColorChange = (color: string) => {
    setPrimaryColor(color);
  };

  // Handle secondary color changes
  const handleSecondaryColorChange = (color: string) => {
    setSecondaryColor(color);
  };

  // Handle manual hex code input for primary color
  const handlePrimaryHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrimaryColor(value);
    
    // If it's a valid hex code and complete, update the color
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setPrimaryColor(value);
    }
  };
  
  // Handle manual hex code input for secondary color
  const handleSecondaryHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSecondaryColor(value);
    
    // If it's a valid hex code and complete, update the color
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setSecondaryColor(value);
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
        <PopoverContent className="glass p-5 rounded-xl shadow-xl border border-white/40" align="end" side="left" 
          style={{ width: isMobile ? 'calc(100vw - 40px)' : '400px' }}>
          <div className="space-y-4">
            <div className="text-center mb-3">
              <h3 className="font-display font-semibold">Customize Theme</h3>
              <p className="text-sm text-muted-foreground">Choose your preferred colors</p>
            </div>
            
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 gap-4'}`}>
              {/* Primary Color Section */}
              <ColorSettings 
                label="Primary Color"
                color={primaryColor}
                onColorChange={handlePrimaryColorChange}
                onHexChange={handlePrimaryHexChange}
              />
              
              {/* Secondary Color Section */}
              <ColorSettings 
                label="Secondary Color"
                color={secondaryColor}
                onColorChange={handleSecondaryColorChange}
                onHexChange={handleSecondaryHexChange}
              />
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetColors} 
              className="w-full mt-2 flex items-center justify-center text-sm"
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
