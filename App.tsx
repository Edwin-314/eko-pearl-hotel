import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Rooms } from './components/Rooms';
import { Dining } from './components/Dining';
import { Amenities } from './components/Amenities';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { Concierge } from './components/Concierge';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case ViewState.ROOMS:
        return (
          <div className="animate-fade-in pt-20">
             <div className="bg-eko-charcoal text-white py-20 px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Rooms & Suites</h1>
                <p className="text-eko-gold font-serif italic text-xl">Your Private Sanctuary</p>
             </div>
             <BookingForm />
             <Rooms />
          </div>
        );
      case ViewState.DINING:
        return (
          <div className="animate-fade-in pt-20">
            <div className="bg-eko-charcoal text-white py-20 px-8 text-center bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center relative">
                 <div className="absolute inset-0 bg-black/60"></div>
                 <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Dining</h1>
                    <p className="text-eko-gold font-serif italic text-xl">Tastes of Lagos & Beyond</p>
                 </div>
             </div>
            <Dining />
          </div>
        );
      case ViewState.AMENITIES:
        return (
          <div className="animate-fade-in pt-20">
            <div className="bg-eko-charcoal text-white py-20 px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Amenities</h1>
                <p className="text-eko-gold font-serif italic text-xl">Everything You Need</p>
             </div>
             <Amenities />
             {/* Reusing Dining visual block for consistency or add gallery here */}
          </div>
        );
      case ViewState.CONTACT:
         return (
             <div className="animate-fade-in pt-20">
                 <div className="bg-eko-charcoal text-white py-20 px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Contact Us</h1>
                    <p className="text-eko-gold font-serif italic text-xl">We Await Your Arrival</p>
                 </div>
                 <div className="container mx-auto px-4 py-20 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                             <h3 className="text-2xl font-serif font-bold text-eko-charcoal mb-6">Get in Touch</h3>
                             <p className="text-gray-600 mb-8 leading-relaxed">
                                 Whether you are planning a corporate event or a family vacation, our team is here to ensure your stay is flawless.
                             </p>
                             <ul className="space-y-4 text-gray-700">
                                 <li><strong>Address:</strong> 123 Adetokunbo Ademola, Victoria Island, Lagos</li>
                                 <li><strong>Phone:</strong> +234 800 EKO PEARL</li>
                                 <li><strong>Email:</strong> reservations@ekopearl.com</li>
                             </ul>
                        </div>
                        <div className="bg-white p-8 shadow-lg border border-gray-100">
                            <h4 className="text-lg font-bold mb-4">Send us a message</h4>
                            <input type="text" placeholder="Name" className="w-full border-b border-gray-300 py-2 mb-4 focus:outline-none focus:border-eko-green" />
                            <input type="email" placeholder="Email" className="w-full border-b border-gray-300 py-2 mb-4 focus:outline-none focus:border-eko-green" />
                            <textarea placeholder="Message" className="w-full border-b border-gray-300 py-2 mb-6 focus:outline-none focus:border-eko-green h-32"></textarea>
                            <button className="bg-eko-green text-white px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-emerald-800 transition-colors">Send Message</button>
                        </div>
                    </div>
                 </div>
                 <div id="booking-section">
                    <BookingForm />
                 </div>
             </div>
         );
      case ViewState.HOME:
      default:
        return (
          <div className="animate-fade-in">
            <Hero onNavigate={setCurrentView} />
            <div className="relative z-30">
               <BookingForm />
            </div>
            <Rooms />
            <Dining />
            <Amenities />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-eko-sand flex flex-col font-sans text-eko-charcoal">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Concierge />
      <Footer />
    </div>
  );
}

export default App;