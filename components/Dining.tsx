import React from 'react';

const menuHighlights = [
  { name: 'Jollof Rice & Plantain', price: '₦8,500', desc: 'Smokey party jollof served with grilled turkey and sweet plantains.' },
  { name: 'Grilled Croaker Fish', price: '₦12,000', desc: 'Spicy pepper sauce, yam chips, and fresh coleslaw.' },
  { name: 'Lobster Thermidor', price: '₦28,000', desc: 'Locally sourced rock lobster, cream sauce, cheese gratin.' },
  { name: 'Suya Spiced Lamb Chops', price: '₦18,000', desc: 'Tender lamb chops with Yaji spice rub and mint yoghurt.' },
];

export const Dining: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1">
            <span className="text-eko-gold font-serif italic text-lg">Culinary Delights</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-eko-charcoal mt-2 mb-8">The Pearl Restaurant</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              Experience a fusion of continental finesse and bold Nigerian flavors. Our executive chef curates a seasonal menu using the freshest ingredients from local markets.
            </p>
            
            <div className="space-y-6">
              {menuHighlights.map((item, idx) => (
                <div key={idx} className="flex justify-between items-baseline group cursor-default">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-eko-charcoal group-hover:text-eko-gold transition-colors">{item.name}</h4>
                    <p className="text-sm text-gray-500 font-light mt-1">{item.desc}</p>
                  </div>
                  <div className="w-32 border-b border-gray-200 mx-4 hidden sm:block"></div>
                  <span className="text-eko-green font-bold">{item.price}</span>
                </div>
              ))}
            </div>

            <button className="mt-10 px-8 py-3 border-2 border-eko-charcoal text-eko-charcoal hover:bg-eko-charcoal hover:text-white transition-colors uppercase tracking-widest font-bold text-xs">
              View Full Menu
            </button>
          </div>

          <div className="order-1 lg:order-2 relative h-[600px] w-full">
            <div className="absolute top-0 right-0 w-4/5 h-4/5 overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop" 
                alt="Dining" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-3/5 h-3/5 overflow-hidden border-8 border-white shadow-xl">
               <img 
                src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2670&auto=format&fit=crop" 
                alt="Chef detail" 
                className="w-full h-full object-cover"
              />
            </div>
             {/* Decorative pattern block */}
             <div className="absolute top-10 left-10 w-24 h-24 bg-eko-pattern opacity-10 bg-eko-green z-[-1]"></div>
          </div>

        </div>
      </div>
    </div>
  );
};