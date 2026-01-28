'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('EN');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // 1. Get Language preference
    setLang(localStorage.getItem('lang') || 'EN');

    // 2. Fetch Hot Deals & Featured Properties for the homepage
    // We fetch all and filter client-side or use query param if backend supports it
    fetch(`${API_URL}/api/properties`) 
      .then((res) => res.json())
      .then((data) => {
        // Filter for Hot Deals or Featured, take top 6
        const featured = data.filter(p => p.isHotDeal || p.isFeatured).slice(0, 6);
        setProperties(featured); 
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [API_URL]);

  // Translation Object
  const t = lang === 'EN' ? {
    heroTitle: "Find Your", heroHighlight: "Dream Place",
    heroDesc: "The easiest way to buy, rent, or sell properties in Egypt.",
    cta: "Start Searching",
    featured: "Hot Deals & Featured",
    viewAll: "View All Listings",
    price: "EGP",
    beds: "Beds", area: "m²",
    noProp: "No featured properties available right now."
  } : {
    heroTitle: "ابحث عن", heroHighlight: "بيت أحلامك",
    heroDesc: "أسهل طريقة لبيع وشراء وتأجير العقارات في مصر.",
    cta: "ابدأ البحث",
    featured: "أفضل العروض والعقارات المميزة",
    viewAll: "عرض كل العقارات",
    price: "ج.م",
    beds: "غرف", area: "متر",
    noProp: "لا توجد عقارات مميزة حالياً."
  };

  return (
    <div className="bg-gray-50 dark:bg-zinc-950 min-h-screen transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=2000" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Luxury Home in Egypt"
        />
        
        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl text-white">
          <span className="bg-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block shadow-lg animate-fade-in-up">
            #1 Real Estate Platform in Egypt
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight drop-shadow-2xl">
            {t.heroTitle} <span className="text-emerald-400">{t.heroHighlight}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100 font-medium drop-shadow-md max-w-2xl mx-auto">
            {t.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/search" className="bg-white text-emerald-900 px-10 py-4 rounded-full font-black text-xl hover:bg-emerald-50 transition shadow-xl transform hover:scale-105">
              {t.cta}
            </Link>
            <Link href="/about" className="bg-emerald-600/20 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-white/10 transition">
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURED PROPERTIES GRID --- */}
      <section className="max-w-7xl mx-auto py-24 px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 dark:text-white border-l-8 border-emerald-500 pl-4 mb-2">
                {t.featured}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 ml-6">Handpicked listings just for you.</p>
            </div>
            <Link href="/search" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline text-lg flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-full transition">
              {t.viewAll} <span>→</span>
            </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[1,2,3].map(i => <div key={i} className="h-96 bg-gray-200 dark:bg-zinc-800 rounded-[2rem] animate-pulse"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.length > 0 ? properties.map((p) => (
              <Link href={`/properties/${p._id}`} key={p._id} className="group bg-white dark:bg-zinc-900 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-zinc-800 overflow-hidden relative transform hover:-translate-y-2">
                
                {/* Image Area */}
                <div className="relative h-72 overflow-hidden">
                   <img 
                    src={p.images[0] || 'https://via.placeholder.com/400'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                    alt={p.title}
                   />
                   
                   {/* Badges */}
                   <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {p.isHotDeal && <span className="bg-red-600 text-white px-4 py-1 rounded-full font-bold text-xs shadow-md animate-pulse">🔥 HOT DEAL</span>}
                      {p.isFeatured && <span className="bg-emerald-500 text-white px-4 py-1 rounded-full font-bold text-xs shadow-md">★ FEATURED</span>}
                   </div>
                   
                   {/* Type Badge */}
                   <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-xl font-bold text-sm shadow-lg text-slate-900 dark:text-white">
                     {p.listingType === 'Rent' ? 'For Rent' : 'For Sale'}
                   </div>
                </div>

                {/* Details Area */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 transition truncate w-2/3">{p.title}</h3>
                    <span className="text-xs bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded text-gray-500">{p.type}</span>
                  </div>

                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{parseInt(p.price).toLocaleString()}</span>
                    <span className="text-sm text-gray-500 font-bold mb-1">{t.price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm border-t dark:border-zinc-800 pt-4">
                    <span className="flex items-center gap-1">🛏️ {p.bedrooms} {t.beds}</span>
                    <span className="flex items-center gap-1">🚿 {p.bathrooms}</span>
                    <span className="flex items-center gap-1">📐 {p.area} {t.area}</span>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-dashed border-gray-200 dark:border-zinc-800 text-xs text-gray-400 font-medium truncate flex items-center gap-1">
                    📍 {p.city}, {p.governorate}
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-full text-center py-20 bg-gray-50 dark:bg-zinc-900 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-zinc-800">
                <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">{t.noProp}</p>
                <Link href="/search" className="text-emerald-600 underline mt-2 inline-block font-bold">Check all listings instead</Link>
              </div>
            )}
          </div>
        )}
      </section>

      {/* --- LIST PROPERTY CTA --- */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="bg-emerald-900 rounded-[3rem] p-10 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
          
          <h2 className="text-3xl md:text-6xl font-black mb-6 relative z-10">Have a property to sell?</h2>
          <p className="text-emerald-100 text-lg md:text-2xl mb-10 max-w-2xl mx-auto relative z-10 font-light">
            Join the fastest growing real estate network in Egypt. We help you connect with serious buyers instantly.
          </p>
          <a 
            href="https://wa.me/201008279766?text=Hello EgyHomes, I want to list my property." 
            target="_blank"
            className="inline-block bg-white text-emerald-900 px-12 py-5 rounded-full font-black text-xl hover:bg-emerald-50 transition-all shadow-xl transform hover:scale-105 relative z-10"
          >
            List Your Property Now
          </a>
        </div>
      </section>
    </div>
  );
}