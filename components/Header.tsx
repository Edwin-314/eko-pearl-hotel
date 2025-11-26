import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = () => {
    onNavigate(ViewState.CONTACT);
    setIsMobileMenuOpen(false);
    // Allow time for render and possible scroll-to-top effect to finish
    setTimeout(() => {
      const section = document.getElementById('booking-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const navItems = [
    { label: 'Home', view: ViewState.HOME },
    { label: 'Rooms & Suites', view: ViewState.ROOMS },
    { label: 'Dining', view: ViewState.DINING },
    { label: 'Amenities', view: ViewState.AMENITIES },
    { label: 'Contact', view: ViewState.CONTACT },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="cursor-pointer flex items-center gap-2"
          onClick={() => onNavigate(ViewState.HOME)}
        >
            <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center ${isScrolled || isMobileMenuOpen ? 'border-eko-green text-eko-green' : 'border-white text-white'}`}>
                <span className="font-serif font-bold text-lg">E</span>
            </div>
          <span className={`font-serif text-2xl font-bold tracking-widest ${
            isScrolled || isMobileMenuOpen ? 'text-eko-green' : 'text-white'
          }`}>
            EKO PEARL
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className={`text-sm uppercase tracking-wider font-medium transition-colors hover:text-eko-gold ${
                currentView === item.view 
                  ? 'text-eko-gold border-b-2 border-eko-gold' 
                  : (isScrolled ? 'text-eko-charcoal' : 'text-white/90')
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={handleBookNow}
            className="bg-eko-gold hover:bg-amber-700 text-white px-6 py-2 rounded-sm text-sm uppercase tracking-widest font-bold transition-all transform hover:-translate-y-0.5"
          >
            Book Now
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-eko-gold"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} color={isScrolled ? '#064E3B' : '#ffffff'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-8 px-4 flex flex-col gap-6 animate-fade-in-down border-t border-gray-100">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onNavigate(item.view);
                setIsMobileMenuOpen(false);
              }}
              className={`text-lg font-serif text-left ${
                currentView === item.view ? 'text-eko-gold pl-4 border-l-4 border-eko-gold' : 'text-eko-charcoal'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={handleBookNow}
            className="w-full bg-eko-green text-white py-4 rounded-sm uppercase tracking-widest font-bold mt-4"
          >
            Book Your Stay
          </button>
        </div>
      )}
    </header>
  );
};