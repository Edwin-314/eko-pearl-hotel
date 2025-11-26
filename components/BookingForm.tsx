import React from 'react';

export const BookingForm: React.FC = () => {
  return (
    <div className="bg-white p-8 md:p-12 shadow-2xl max-w-4xl mx-auto -mt-20 relative z-20 rounded-sm">
      <div className="flex flex-col md:flex-row gap-6 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Check In</label>
          <input type="date" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-eko-green font-serif text-lg text-eko-charcoal" />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Check Out</label>
          <input type="date" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-eko-green font-serif text-lg text-eko-charcoal" />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Guests</label>
          <select className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-eko-green font-serif text-lg text-eko-charcoal bg-white">
            <option>1 Adult</option>
            <option>2 Adults</option>
            <option>2 Adults, 1 Child</option>
          </select>
        </div>
        <div className="flex-1 w-full">
          <button className="w-full bg-eko-gold text-white py-4 font-bold uppercase tracking-widest hover:bg-amber-700 transition-colors">
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
};