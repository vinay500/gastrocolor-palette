
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled ? 'py-2 glass shadow-sm' : 'py-4 bg-transparent'
      )}
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <span className="text-primary font-display font-bold text-2xl">Gastro</span>
            <span className="text-secondary font-display font-bold text-2xl">Care</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md"
              >
                {item.label}
              </a>
            ))}
            <Button className="ml-2 bg-primary hover:bg-primary/90 text-white">
              Book Appointment
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 glass shadow-md transition-all duration-300 ease-in-out overflow-hidden',
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-3 space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-primary/10 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 pb-1">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
