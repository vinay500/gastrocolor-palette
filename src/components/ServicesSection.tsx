
import React, { useEffect } from 'react';
import { Activity, Stethoscope, Microscope, ClipboardCheck, Flask, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: <Stethoscope className="h-10 w-10" />,
    title: "Diagnostic Consultations",
    description: "Comprehensive evaluation of digestive symptoms with personalized treatment plans.",
  },
  {
    icon: <Microscope className="h-10 w-10" />,
    title: "Endoscopy Procedures",
    description: "Advanced upper endoscopy and colonoscopy with minimal discomfort and quick recovery.",
  },
  {
    icon: <Activity className="h-10 w-10" />,
    title: "GI Disorder Management",
    description: "Specialized treatment for IBS, GERD, IBD, and other gastrointestinal conditions.",
  },
  {
    icon: <ClipboardCheck className="h-10 w-10" />,
    title: "Preventive Screenings",
    description: "Regular colorectal cancer screenings and early detection procedures.",
  },
  {
    icon: <Flask className="h-10 w-10" />,
    title: "Nutritional Counseling",
    description: "Personalized dietary advice for managing digestive conditions and improving gut health.",
  },
  {
    icon: <Pill className="h-10 w-10" />,
    title: "Medication Management",
    description: "Optimized medication regimens with regular follow-ups to manage side effects.",
  },
];

const ServicesSection = () => {
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
    <section id="services" className="py-20 bg-white/50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-section relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4 reveal" style={{ '--reveal-delay': '1' } as React.CSSProperties}>
            Our Services
          </span>
          <h2 className="heading-lg mb-6 reveal" style={{ '--reveal-delay': '2' } as React.CSSProperties}>
            Comprehensive <span className="text-secondary">Gastroenterology</span> Care
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal" style={{ '--reveal-delay': '3' } as React.CSSProperties}>
            We offer a wide range of services to diagnose, treat, and manage digestive disorders with the latest technology and evidence-based approaches.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={cn(
                "p-6 glass glass-hover rounded-xl group transition-all duration-300 reveal"
              )}
              style={{ '--reveal-delay': index + 4 } as React.CSSProperties}
            >
              <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110 text-primary">
                {service.icon}
              </div>
              <h3 className="heading-sm mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
