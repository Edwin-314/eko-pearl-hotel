import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-eko-charcoal text-white pt-20 pb-10 border-t border-white/10 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
                 <div className="h-8 w-8 rounded-full border-2 border-eko-gold text-eko-gold flex items-center justify-center">
                    <span className="font-serif font-bold text-lg">E</span>
                </div>
                <span className="font-serif text-2xl font-bold tracking-widest text-white">
                    EKO PEARL
                </span>
            </div>
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-6">
              A refined sanctuary in the heart of Lagos, offering world-class hospitality with a touch of Nigerian warmth.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-eko-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white hover:text-eko-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-white hover:text-eko-gold transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-eko-gold font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rooms & Suites</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dining</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wellness</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-eko-gold font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-300 font-light">
              <li>123 Adetokunbo Ademola Street</li>
              <li>Victoria Island, Lagos, Nigeria</li>
              <li className="pt-2">+234 800 EKO PEARL</li>
              <li>concierge@ekopearl.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-eko-gold font-bold uppercase tracking-widest text-xs mb-6">Newsletter</h4>
            <p className="text-gray-400 font-light text-xs mb-4">Subscribe for exclusive offers and updates.</p>
            <div className="flex border-b border-gray-500 pb-2">
              <input type="email" placeholder="Email Address" className="bg-transparent w-full focus:outline-none text-white placeholder-gray-500 text-sm" />
              <button className="text-eko-gold text-xs font-bold uppercase">Join</button>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Eko Pearl Hotel. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Subtle Adire Pattern Overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-pattern-adire opacity-20"></div>
    </footer>
  );
};