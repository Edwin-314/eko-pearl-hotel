import React from 'react';
import { Room } from '../types';
import { Wifi, Tv, Coffee, Maximize } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const rooms: Room[] = [
  {
    id: '1',
    name: 'Deluxe City View',
    description: 'A minimalist retreat offering sweeping views of Victoria Island. Features bespoke Nigerian textiles and modern amenities.',
    price: 85000,
    size: '35m²',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
    amenities: ['King Bed', 'City View', 'Work Desk'],
  },
  {
    id: '2',
    name: 'Executive Suite',
    description: 'Designed for the business traveler. Includes a separate lounge area, ergonomic workspace, and premium bath amenities.',
    price: 145000,
    size: '52m²',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2574&auto=format&fit=crop',
    amenities: ['Lounge', 'Ocean View', 'Buthtub'],
  },
  {
    id: '3',
    name: 'The Royal Eko Penthouse',
    description: 'Our finest accommodation. Floor-to-ceiling windows, private terrace, and 24-hour butler service.',
    price: 350000,
    size: '120m²',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2670&auto=format&fit=crop',
    amenities: ['Terrace', 'Kitchenette', 'Butler'],
  },
];

const occupancyData = [
  { month: 'Jan', rate: 75 },
  { month: 'Feb', rate: 80 },
  { month: 'Mar', rate: 65 },
  { month: 'Apr', rate: 70 },
  { month: 'May', rate: 60 },
  { month: 'Jun', rate: 55 },
  { month: 'Jul', rate: 65 },
  { month: 'Aug', rate: 70 },
  { month: 'Sep', rate: 60 },
  { month: 'Oct', rate: 75 },
  { month: 'Nov', rate: 85 },
  { month: 'Dec', rate: 95 },
];

export const Rooms: React.FC = () => {
  return (
    <div className="py-20 bg-eko-sand">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <span className="text-eko-gold font-serif italic text-lg">Accommodation</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-eko-charcoal mt-2 mb-6">Rest in Refined Comfort</h2>
          <p className="max-w-2xl mx-auto text-gray-600 font-light leading-relaxed">
            Each of our 45 rooms and suites is a masterpiece of understated luxury, blending neutral palettes with subtle emerald accents inspired by Lagos's lush landscapes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {rooms.map((room) => (
            <div key={room.id} className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold tracking-widest text-eko-charcoal">
                  {room.size}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-eko-charcoal mb-3">{room.name}</h3>
                <p className="text-gray-500 font-light text-sm mb-6 line-clamp-3">{room.description}</p>
                
                <div className="flex gap-4 mb-8 text-gray-400">
                    <div className="flex flex-col items-center gap-1">
                        <Wifi size={16} />
                        <span className="text-[10px] uppercase">Wifi</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Tv size={16} />
                        <span className="text-[10px] uppercase">TV</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Coffee size={16} />
                        <span className="text-[10px] uppercase">Coffee</span>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                  <div>
                    <span className="text-xs text-gray-400 block mb-1">Starting from</span>
                    <span className="text-xl font-bold text-eko-green">₦{room.price.toLocaleString()}</span>
                  </div>
                  <button className="bg-eko-charcoal text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-eko-gold transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insight Section using Recharts */}
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3">
                <h3 className="text-2xl font-serif font-bold mb-4">Plan Your Visit</h3>
                <p className="text-gray-600 font-light mb-6">
                    Lagos is vibrant year-round, but December sees our highest demand due to cultural festivals. 
                    We recommend booking at least 3 months in advance for holiday stays.
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-eko-green"></div>
                    <span className="text-sm text-gray-500">Occupancy Rate (%)</span>
                </div>
            </div>
            <div className="w-full md:w-2/3 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={occupancyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#78716C', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#78716C', fontSize: 12}} />
                        <Tooltip 
                            cursor={{fill: '#f5f5f4'}}
                            contentStyle={{ backgroundColor: '#fff', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Bar dataKey="rate" fill="#064E3B" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};