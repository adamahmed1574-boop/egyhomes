'use client';
import { useState } from 'react';

export default function About() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: 'Buyer' });

  const sendLead = (e) => {
    e.preventDefault();
    const msg = `Lead!\nName: ${form.name}\nPhone: ${form.phone}\nType: ${form.type}`;
    window.open(`https://wa.me/201008279766?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-gray-50 dark:bg-zinc-950 min-h-screen text-slate-800 dark:text-slate-100 pb-20 transition-colors duration-300">
      <div className="bg-emerald-900 text-white py-24 px-6 text-center rounded-b-[3rem] shadow-xl"><h1 className="text-5xl font-black mb-6">About EgyHomes</h1></div>
      <div className="max-w-5xl mx-auto p-6 -mt-16 relative z-20">
        <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-zinc-800 mb-12"><p className="text-xl text-gray-600 dark:text-gray-300">Egy Homes is a modern real estate startup founded in 2025.</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-900 text-white p-10 rounded-[2.5rem] shadow-xl flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                <div className="space-y-6 text-lg">
                    <a href="https://wa.me/201008279766" target="_blank" className="flex gap-4 hover:text-emerald-300">📞 01008279766</a>
                    <a href="mailto:egyhomes1@hotmail.com" className="flex gap-4 hover:text-emerald-300">✉️ egyhomes1@hotmail.com</a>
                </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-zinc-800">
                <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
                <form onSubmit={sendLead} className="space-y-4">
                    <input placeholder="Name" required className="w-full p-4 rounded-xl border dark:bg-zinc-800" onChange={e => setForm({...form, name: e.target.value})}/>
                    <input placeholder="Phone" required className="w-full p-4 rounded-xl border dark:bg-zinc-800" onChange={e => setForm({...form, phone: e.target.value})}/>
                    <select className="w-full p-4 rounded-xl border dark:bg-zinc-800" onChange={e => setForm({...form, type: e.target.value})}><option value="Buyer">Buyer</option><option value="Seller">Seller</option></select>
                    <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700">Send</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}