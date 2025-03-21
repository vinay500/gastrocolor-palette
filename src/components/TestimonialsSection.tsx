
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "IBS Patient",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    quote: "After years of struggling with IBS symptoms, Dr. Chen provided a treatment plan that actually worked. Her approach was comprehensive and personalized. I've never felt better!",
  },
  {
    name: "Michael Rodriguez",
    position: "GERD Patient",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    quote: "The care I received at GastroCare was exceptional. Dr. Chen took the time to explain my condition and treatment options. The staff was friendly and professional throughout my visits.",
  },
  {
    name: "Jennifer Lee",
    position: "Colonoscopy Patient",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    quote: "I was extremely nervous about my first colonoscopy, but the team at GastroCare made the experience as comfortable as possible. The procedure was quick and the recovery was smooth.",
  },
  {
    name: "David Thompson",
    position: "Crohn's Disease Patient",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    quote: "Managing Crohn's disease seemed impossible until I found Dr. Chen. Her expertise and compassionate care have helped me regain control of my life. I'm grateful for her dedication.",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handlePrev = () => {
    if (animating) return;
    
    setAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (animating) return;
    
    setAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setAnimating(false);
    }, 500);
  };

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

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-1/3 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-section relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-secondary/10 text-secondary mb-4 reveal" style={{ '--reveal-delay': '1' } as React.CSSProperties}>
            Testimonials
          </span>
          <h2 className="heading-lg mb-6 reveal" style={{ '--reveal-delay': '2' } as React.CSSProperties}>
            What Our <span className="text-primary">Patients</span> Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal" style={{ '--reveal-delay': '3' } as React.CSSProperties}>
            Read about the experiences of our patients and how our care has improved their quality of life.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto reveal" style={{ '--reveal-delay': '4' } as React.CSSProperties}>
          <div className="overflow-hidden rounded-2xl glass p-10 shadow-sm">
            <div className="absolute top-6 left-10 text-primary/20">
              <Quote size={64} />
            </div>
            
            <div className="relative">
              <div
                className={cn(
                  "transition-all duration-500 flex flex-col md:flex-row items-center",
                  animating ? "opacity-0" : "opacity-100"
                )}
              >
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-md transform -rotate-6"></div>
                    <div className="absolute inset-0 rounded-full bg-secondary/20 blur-md transform rotate-6"></div>
                    <div className="relative overflow-hidden rounded-full border-2 border-white h-full">
                      <img
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 text-center md:text-left">
                  <p className="text-lg mb-4 italic text-foreground/90">
                    "{testimonials[activeIndex].quote}"
                  </p>
                  <div>
                    <p className="font-display font-semibold text-lg">{testimonials[activeIndex].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[activeIndex].position}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30"
              onClick={handlePrev}
              disabled={animating}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className={cn(
                  "h-2 w-2 rounded-full p-0 border",
                  index === activeIndex
                    ? "bg-primary border-primary"
                    : "bg-muted border-muted-foreground/30 hover:bg-primary/20 hover:border-primary/30"
                )}
                onClick={() => {
                  if (animating) return;
                  setAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => {
                    setAnimating(false);
                  }, 500);
                }}
              />
            ))}
            
            <Button
              variant="outline"
              size="icon"
              className="border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30"
              onClick={handleNext}
              disabled={animating}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
