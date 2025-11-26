import React from 'react';
import { ViewState } from '../types';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const handleBookNow = () => {
    onNavigate(ViewState.CONTACT);
    // Allow time for render
    setTimeout(() => {
      const section = document.getElementById('booking-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-slow-zoom"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2574&auto=format&fit=crop")',
        }}
      ></div>
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-eko-charcoal/80 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto mt-16">
        <p className="text-eko-gold font-serif italic text-xl md:text-2xl mb-4 animate-fade-in-up tracking-wider">
          Experience Lagos with Elegance
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-bold mb-8 leading-tight animate-fade-in-up delay-100">
          A Sanctuary <br /> in the City
        </h1>
        <p className="text-white/90 max-w-xl text-lg mb-10 font-light leading-relaxed animate-fade-in-up delay-200">
          Where European minimalist design meets the warm, vibrant heart of Nigerian hospitality.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
          <button 
            onClick={() => onNavigate(ViewState.ROOMS)}
            className="px-8 py-4 bg-white text-eko-green hover:bg-gray-100 transition-colors font-bold uppercase tracking-widest text-sm min-w-[160px]"
          >
            View Suites
          </button>
          <button 
            onClick={handleBookNow}
            className="px-8 py-4 bg-eko-gold text-white hover:bg-amber-700 transition-colors font-bold uppercase tracking-widest text-sm min-w-[160px]"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-eko-green via-eko-gold to-eko-green"></div>
    </div>
  );
};