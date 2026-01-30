'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/properties?isHotDeal=true`) 
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setProperties(list.slice(0, 6)); 
        setLoading(false);
      })
      .catch((err) => {
        setProperties([]); 
        setLoading(false);
      });
  }, [API_URL]);

  return (
    <div className="bg-gray-50 dark:bg-zinc-950 min-h-screen transition-colors duration-300">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=2000" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="relative z-20 text-center px-4 max-w-5xl text-white">
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight drop-shadow-2xl">Find Your <span className="text-emerald-400">Dream Place</span></h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100 font-medium drop-shadow-md">The easiest way to buy, rent, or sell properties in Egypt.</p>
          <div className="flex justify-center gap-4"><Link href="/search" className="bg-white text-emerald-900 px-10 py-4 rounded-full font-black text-xl hover:bg-emerald-50 transition shadow-xl">Start Searching</Link></div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-24 px-4">
        <div className="flex justify-between items-end mb-12"><h2 className="text-4xl font-bold text-slate-800 dark:text-white border-l-8 border-emerald-500 pl-4">Featured Listings</h2><Link href="/search" className="text-emerald-600 font-bold hover:underline">View All →</Link></div>
        {loading ? <p>Loading...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((p) => (
              <Link href={`/properties/${p._id}`} key={p._id} className="group bg-white dark:bg-zinc-900 rounded-[2rem] shadow-lg hover:shadow-2xl transition overflow-hidden">
                <div className="relative h-72 overflow-hidden">
                   <img src={p.images[0] || 'https://via.placeholder.com/400'} className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>
                   <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl font-bold text-sm shadow-lg">{p.listingType}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white truncate">{p.title}</h3>
                  <p className="text-emerald-600 font-black text-3xl mt-2">{parseInt(p.price).toLocaleString()} EGP</p>
                  <p className="text-gray-400 text-xs mt-4">📍 {p.city}, {p.governorate}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
