'use client';
import { useState } from 'react';

// NOTE: Navbar and Footer are in layout.js

export default function About() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: 'Buyer' });

  const sendLead = (e) => {
    e.preventDefault();
    // Construct WhatsApp message with all details
    const msg = `New Lead from Website!\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nI am a: ${form.type}`;
    // Open WhatsApp
    window.open(`https://wa.me/201008279766?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-gray-50 dark:bg-zinc-950 min-h-screen text-slate-800 dark:text-slate-100 pb-20 transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="bg-emerald-900 text-white py-24 px-6 text-center rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">About EgyHomes</h1>
            <p className="text-emerald-200 text-lg md:text-xl uppercase tracking-widest font-bold">Simple • Accessible • Future-Focused</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 -mt-16 relative z-20">
        
        {/* Story Card */}
        <div className="bg-white dark:bg-zinc-900 p-10 md:p-16 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-zinc-800 mb-12">
          <p className="text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300 mb-10 font-light">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Egy Homes</span> is a modern real estate startup founded in 2025 by two passionate entrepreneurs with a clear vision: to make buying and selling properties easier, faster, and more advanced.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300 mb-10 font-light">
            We aim to simplify the real estate process by combining smart marketing with modern technology, especially through our website, to connect property owners with serious buyers smoothly and transparently.
          </p>
          <div className="border-l-8 border-emerald-500 pl-8 py-2">
            <p className="text-2xl font-bold text-slate-900 dark:text-white italic">
              "At Egy Homes, we believe real estate should be simple, accessible, and built for the future."
            </p>
          </div>
        </div>

        {/* Contact / Lead Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Contact Info */}
            <div className="bg-blue-900 text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full -mr-32 -mt-32"></div>
                
                <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                <div className="space-y-6 text-lg">
                    <a href="https://wa.me/201008279766" target="_blank" className="flex items-center gap-4 hover:text-emerald-300 transition">
                        <span className="bg-white/10 p-3 rounded-full">📞</span> 
                        <span className="font-bold">01008279766</span>
                    </a>
                    <a href="mailto:info@egyhomes.eg" className="flex items-center gap-4 hover:text-emerald-300 transition">
                        <span className="bg-white/10 p-3 rounded-full">✉️</span> 
                        <span className="font-bold">info@egyhomes.eg</span>
                    </a>
                </div>

                <div className="mt-12">
                    <p className="text-blue-200 mb-4 font-bold text-sm uppercase tracking-wider">Follow Us</p>
                    <div className="flex gap-4">
                        <a href="https://instagram.com/egyhomes.eg" target="_blank" className="bg-white text-blue-900 w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition shadow-lg">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="https://facebook.com/share/1DTsE2L6R3/?mibextid=wwXIfr" target="_blank" className="bg-white text-blue-900 w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition shadow-lg">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Lead Form */}
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-zinc-800">
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Send us a message</h2>
                <p className="text-gray-500 mb-8 text-sm">We will get back to you within 24 hours.</p>
                
                <form onSubmit={sendLead} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Full Name</label>
                        <input 
                            placeholder="John Doe" 
                            required 
                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition" 
                            onChange={e => setForm({...form, name: e.target.value})}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Phone Number</label>
                        <input 
                            placeholder="01xxxxxxxxx" 
                            required 
                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition" 
                            onChange={e => setForm({...form, phone: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Email Address</label>
                        <input 
                            type="email"
                            placeholder="name@example.com" 
                            required 
                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition" 
                            onChange={e => setForm({...form, email: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">I am a...</label>
                        <select 
                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition appearance-none" 
                            onChange={e => setForm({...form, type: e.target.value})}
                        >
                            <option value="Buyer">Buyer (Looking for property)</option>
                            <option value="Seller">Seller (Listing a property)</option>
                            <option value="Agent">Real Estate Agent</option>
                        </select>
                    </div>

                    <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20 transform hover:-translate-y-1">
                        Send Message
                    </button>
                </form>
            </div>

        </div>
      </div>
    </div>
  );
}