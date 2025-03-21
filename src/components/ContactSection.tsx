
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const ContactSection = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to a server
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <section id="contact" className="py-20 bg-white/50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute w-96 h-96 -top-48 -right-48 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-section relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4 reveal" style={{ '--reveal-delay': '1' } as React.CSSProperties}>
            Contact Us
          </span>
          <h2 className="heading-lg mb-6 reveal" style={{ '--reveal-delay': '2' } as React.CSSProperties}>
            Get In <span className="text-secondary">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal" style={{ '--reveal-delay': '3' } as React.CSSProperties}>
            We're here to answer your questions and provide the care you need. Reach out to us through any of the methods below.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8 reveal" style={{ '--reveal-delay': '4' } as React.CSSProperties}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white/70"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white/70"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white/70"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white/70 resize-none"
                    placeholder="Please provide details about your inquiry..."
                    required
                  ></textarea>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Send Message
              </Button>
            </form>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-6 reveal" style={{ '--reveal-delay': '5' } as React.CSSProperties}>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1">Location</h4>
                  <p className="text-muted-foreground">123 Medical Plaza, Suite 456</p>
                  <p className="text-muted-foreground">San Francisco, CA 94110</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1">Phone</h4>
                  <p className="text-muted-foreground">(123) 456-7890</p>
                  <p className="text-muted-foreground">Toll-free: (800) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1">Email</h4>
                  <p className="text-muted-foreground">info@gastrocare.com</p>
                  <p className="text-muted-foreground">appointments@gastrocare.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1">Hours</h4>
                  <p className="text-muted-foreground">Monday - Friday: 8am - 5pm</p>
                  <p className="text-muted-foreground">Saturday: 9am - 1pm (by appointment)</p>
                </div>
              </div>
            </div>
            
            <div className="h-64 rounded-xl overflow-hidden shadow-sm border border-border reveal" style={{ '--reveal-delay': '6' } as React.CSSProperties}>
              <iframe
                title="GastroCare Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948793!3d37.75781499004469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1655936000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
