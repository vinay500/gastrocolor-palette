
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
          const translateY = scrollPosition * 0.3;
          heroRef.current.style.transform = `translateY(${translateY}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2"></div>
        <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl transform -translate-x-1/2"></div>
      </div>
      
      <div className="container-tight relative z-10 pt-20 pb-10 md:py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="relative">
              <span 
                className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4 reveal"
                style={{ '--reveal-delay': '1' } as React.CSSProperties}
              >
                Advanced Gastroenterology Care
              </span>
              
              <h1 
                className={cn(
                  "heading-xl mb-6 reveal",
                )}
                style={{ '--reveal-delay': '2' } as React.CSSProperties}
              >
                <span className="text-primary">Expert</span> Digestive Health <span className="text-secondary">Solutions</span>
              </h1>
              
              <p 
                className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0 reveal"
                style={{ '--reveal-delay': '3' } as React.CSSProperties}
              >
                Your journey to optimal digestive health begins here. We combine cutting-edge technology with compassionate care for comprehensive gastroenterological treatments.
              </p>
              
              <div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start reveal"
                style={{ '--reveal-delay': '4' } as React.CSSProperties}
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
                  Learn More
                </Button>
              </div>
              
              <div 
                className="mt-12 flex justify-center md:justify-start space-x-6 reveal"
                style={{ '--reveal-delay': '5' } as React.CSSProperties}
              >
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">20+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">5,000+</p>
                  <p className="text-sm text-muted-foreground">Patients Treated</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">98%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
          
          <div ref={heroRef} className="md:w-1/2 mt-12 md:mt-0 reveal" style={{ '--reveal-delay': '3' } as React.CSSProperties}>
            <div className="relative">
              {/* Floating elements for visual interest */}
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-primary/20 blur-md"></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-secondary/20 blur-md"></div>
              
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-white to-muted/50 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Modern gastroenterology clinic with advanced medical equipment"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
