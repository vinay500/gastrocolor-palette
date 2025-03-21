
import React, { useEffect } from 'react';
import { Award, Bookmark, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const AboutSection = () => {
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
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/3 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-section relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-secondary/10 text-secondary mb-4 reveal" style={{ '--reveal-delay': '1' } as React.CSSProperties}>
            About Us
          </span>
          <h2 className="heading-lg mb-6 reveal" style={{ '--reveal-delay': '2' } as React.CSSProperties}>
            Meet <span className="text-primary">Dr. Emily Chen</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal" style={{ '--reveal-delay': '3' } as React.CSSProperties}>
            Board-certified gastroenterologist with over 20 years of experience in diagnosing and treating digestive disorders.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal" style={{ '--reveal-delay': '4' } as React.CSSProperties}>
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-full h-full bg-primary/10 rounded-2xl transform rotate-3"></div>
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-secondary/10 rounded-2xl transform -rotate-3"></div>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Dr. Emily Chen"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className={cn("p-6 glass rounded-xl reveal")} style={{ '--reveal-delay': '5' } as React.CSSProperties}>
              <h3 className="heading-sm mb-3 flex items-center">
                <Award className="h-5 w-5 text-primary mr-2" />
                Qualifications
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  M.D. from Johns Hopkins School of Medicine
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Fellowship in Gastroenterology at Mayo Clinic
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Board Certified in Gastroenterology and Internal Medicine
                </li>
              </ul>
            </div>
            
            <div className={cn("p-6 glass rounded-xl reveal")} style={{ '--reveal-delay': '6' } as React.CSSProperties}>
              <h3 className="heading-sm mb-3 flex items-center">
                <UserCheck className="h-5 w-5 text-secondary mr-2" />
                Experience
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  Over 20 years of clinical experience
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  Treated more than 5,000 patients with digestive disorders
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  Performed 3,000+ endoscopic procedures
                </li>
              </ul>
            </div>
            
            <div className={cn("p-6 glass rounded-xl reveal")} style={{ '--reveal-delay': '7' } as React.CSSProperties}>
              <h3 className="heading-sm mb-3 flex items-center">
                <Bookmark className="h-5 w-5 text-primary mr-2" />
                Specialties
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Irritable Bowel Syndrome (IBS)
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Gastroesophageal Reflux Disease (GERD)
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Inflammatory Bowel Disease (IBD)
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Advanced Endoscopy Procedures
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
