'use client';
import { useState, useEffect } from 'react';

export default function About() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    // Fetch partners from the database
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/partners`)
      .then(res => res.json())
      .then(setPartners)
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-blue-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">About Egy Homes</h1>
        <p className="text-blue-200 text-lg uppercase tracking-widest">The Future of Real Estate</p>
      </div>

      <div className="max-w-4xl mx-auto p-6 -mt-10">
        
        {/* --- THE STORY CARD --- */}
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Who We Are</h2>
          <p className="text-lg leading-relaxed text-slate-600 mb-6">
            <span className="font-bold text-slate-900">Egy Homes</span> is a modern real estate startup founded in 2025 by two driven 16-year-old entrepreneurs. 
            Our mission is to simplify and accelerate property transactions through targeted online marketing and advanced technology.
          </p>
          <p className="text-lg leading-relaxed text-slate-600 mb-8">
            We connect property owners and serious buyers efficiently and transparently. At Egy Homes, we are committed to making real estate simple, accessible, and future-focused.
          </p>

          {/* --- SOCIAL LINKS --- */}
          <div className="flex justify-center gap-6 border-t pt-8">
            <a href="https://www.facebook.com/share/1DTsE2L6R3/?mibextid=wwXIfr" target="_blank" className="bg-blue-600 text-white p-3 rounded-full hover:scale-110 transition">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://instagram.com/egyhomes.eg" target="_blank" className="bg-pink-600 text-white p-3 rounded-full hover:scale-110 transition">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://wa.me/201008279766" target="_blank" className="bg-green-600 text-white p-3 rounded-full hover:scale-110 transition">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
          </div>
        </div>

        {/* --- TRUSTED PARTNERS SECTION --- */}
        <div className="mt-20 text-center">
            <h3 className="text-sm font-bold mb-8 opacity-40 uppercase tracking-[0.2em]">Our Trusted Partners</h3>
            
            {partners.length > 0 ? (
                <div className="flex flex-wrap justify-center items-center gap-12 grayscale hover:grayscale-0 transition duration-500">
                    {partners.map(p => (
                        <div key={p._id} className="h-20 w-40 relative bg-white p-4 rounded-lg shadow-sm">
                             <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale">
                    <span className="text-2xl font-black font-serif">PALM HILLS</span>
                    <span className="text-2xl font-black font-sans tracking-tighter">EMAAR</span>
                    <span className="text-2xl font-black font-mono">SODIC</span>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}