
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PaintBucket, RefreshCw } from 'lucide-react';

const ColorPicker = () => {
  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor, resetColors } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="glass glass-hover rounded-full h-12 w-12 p-0 flex items-center justify-center">
            <PaintBucket className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="glass p-5 rounded-xl shadow-xl w-64 border border-white/40" align="end">
          <div className="space-y-4">
            <div className="text-center mb-3">
              <h3 className="font-display font-semibold">Customize Theme</h3>
              <p className="text-sm text-muted-foreground">Choose your preferred colors</p>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
                  Primary Color
                </label>
                <div className="relative flex h-9 overflow-hidden rounded-md">
                  <div
                    className="w-12 h-full pointer-events-none"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => {
                      if (e.target.value.startsWith('#') && e.target.value.length <= 7) {
                        setPrimaryColor(e.target.value);
                      }
                    }}
                    className="flex-1 px-3 py-1 bg-white/60 backdrop-blur-sm text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <span className="w-3 h-3 rounded-full bg-secondary mr-2"></span>
                  Secondary Color
                </label>
                <div className="relative flex h-9 overflow-hidden rounded-md">
                  <div
                    className="w-12 h-full pointer-events-none"
                    style={{ backgroundColor: secondaryColor }}
                  ></div>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => {
                      if (e.target.value.startsWith('#') && e.target.value.length <= 7) {
                        setSecondaryColor(e.target.value);
                      }
                    }}
                    className="flex-1 px-3 py-1 bg-white/60 backdrop-blur-sm text-sm"
                  />
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
