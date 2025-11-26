import React from 'react';
import { Wifi, Car, Utensils, Droplets, Briefcase, MapPin } from 'lucide-react';

const amenities = [
  { icon: <Wifi size={32} />, title: "High-Speed Wi-Fi", desc: "Stay connected seamlessly throughout the property." },
  { icon: <Utensils size={32} />, title: "Fine Dining", desc: "Local and international cuisine at The Pearl." },
  { icon: <Droplets size={32} />, title: "Rooftop Pool", desc: "Panoramic views of Lagos while you swim." },
  { icon: <Briefcase size={32} />, title: "Business Center", desc: "Fully equipped meeting rooms and workspaces." },
  { icon: <Car size={32} />, title: "Airport Shuttle", desc: "Complimentary pickup from Murtala Muhammed Airport." },
  { icon: <MapPin size={32} />, title: "Prime Location", desc: "Minutes away from Victoria Island's business hubs." },
];

export const Amenities: React.FC = () => {
  return (
    <div className="py-20 bg-eko-charcoal text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-adire opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-eko-gold font-serif italic text-lg">Facilities</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2">Designed for Your Comfort</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors group">
              <div className="text-eko-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};