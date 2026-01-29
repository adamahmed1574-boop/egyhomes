'use client';
import { useState } from 'react';

export default function About() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: 'Buyer' });

  const sendLead = (e) => {
    e.preventDefault();
    const msg = `New Lead!\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nI am a: ${form.type}`;
    window.open(`https://wa.me/201008279766?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-gray-50 dark:bg-zinc-950 min-h-screen text-slate-800 dark:text-slate-100 pb-20 transition-colors duration-300">
      
      {/* Hero */}
      <div className="bg-emerald-900 text-white py-24 px-6 text-center rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
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
          <div className="border-l-8 border-emerald-500 pl-8 py-2">
            <p className="text-2xl font-bold text-slate-900 dark:text-white italic">
              "At Egy Homes, we believe real estate should be simple, accessible, and built for the future."
            </p>
          </div>
        </div>

        {/* Contact / Lead Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Contact Info (Updated Color: Zinc instead of Blue) */}
            <div className="bg-zinc-900 text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32"></div>
                
                <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                <div className="space-y-6 text-lg">
                    <a href="https://wa.me/201008279766" target="_blank" className="flex items-center gap-4 hover:text-emerald-400 transition">
                        <span className="bg-white/10 p-3 rounded-full">📞</span> 
                        <span className="font-bold">01008279766</span>
                    </a>
                    <a href="mailto:info@egyhomes.eg" className="flex items-center gap-4 hover:text-emerald-400 transition">
                        <span className="bg-white/10 p-3 rounded-full">✉️</span> 
                        <span className="font-bold">info@egyhomes.eg</span>
                    </a>
                </div>

                <div className="mt-12">
                    <p className="text-gray-400 mb-4 font-bold text-sm uppercase tracking-wider">Follow Us</p>
                    <div className="flex gap-4">
                        <a href="#" className="bg-white text-zinc-900 w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition shadow-lg">📸</a>
                        <a href="#" className="bg-white text-zinc-900 w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition shadow-lg">📘</a>
                    </div>
                </div>
            </div>

            {/* Lead Form */}
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-zinc-800">
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Send us a message</h2>
                <form onSubmit={sendLead} className="space-y-4">
                    <input placeholder="Full Name" required className="w-full p-4 rounded-xl border dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-slate-900 dark:text-white outline-none" onChange={e => setForm({...form, name: e.target.value})}/>
                    <input placeholder="Phone Number" required className="w-full p-4 rounded-xl border dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-slate-900 dark:text-white outline-none" onChange={e => setForm({...form, phone: e.target.value})}/>
                    <select className="w-full p-4 rounded-xl border dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-slate-900 dark:text-white outline-none" onChange={e => setForm({...form, type: e.target.value})}>
                        <option value="Buyer">I want to Buy</option>
                        <option value="Seller">I want to Sell</option>
                    </select>
                    <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg">Send Message</button>
                </form>
            </div>

        </div>
      </div>
    </div>
  );
}