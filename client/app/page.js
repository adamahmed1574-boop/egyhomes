'use client';
// Import essential hooks and components
import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Main Landing Page for Egy Homes.
 * This file is now cleaned from redundant Navbars, Footers, and Calculators.
 */
export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch only featured properties for the landing page
  useEffect(() => {
    fetch(`${API_URL}/api/properties`)
      .then((res) => res.json())
      .then((data) => {
        // Filter to show only featured items and limit to 6
        const featured = data.filter(p => p.isFeatured).slice(0, 6);
        setProperties(featured);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setLoading(false);
      });
  }, [API_URL]);

  return (
    <div className="bg-white">
      {/* 1. Hero Section: Direct impact for visitors */}
      <section className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 to-blue-900/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&w=1920" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Luxury Egyptian Home"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
            Find Your <span className="text-yellow-400">Dream</span> Home
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100 font-light">
            The most advanced real estate startup in Egypt. Simple, fast, and transparent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105">
              Browse All Properties
            </Link>
            <Link href="/about" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-10 py-4 rounded-full font-bold text-lg transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Featured Properties Section */}
      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-blue-900">Featured Listings</h2>
            <p className="text-gray-500 mt-2">Handpicked premium properties just for you.</p>
          </div>
          <Link href="/search" className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2">
            View All Properties <span>→</span>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.length > 0 ? properties.map((p) => (
              <Link href={`/properties/${p._id}`} key={p._id} className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                   <img 
                    src={p.images && p.images.length > 0 ? p.images[0] : 'https://via.placeholder.com/400x300'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                    alt={p.title} 
                   />
                   <div className="absolute top-4 left-4 bg-yellow-400 text-blue-900 px-4 py-1 rounded-full font-bold text-xs shadow-lg">
                     ★ FEATURED
                   </div>
                   <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-blue-900 px-3 py-1 rounded-lg font-bold text-sm">
                     {p.type}
                   </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-900 transition truncate pr-2">{p.title}</h3>
                  </div>
                  <p className="text-blue-700 font-black text-2xl mb-4">
                    {parseInt(p.price).toLocaleString()} <span className="text-sm font-normal text-gray-400">EGP</span>
                  </p>
                  <div className="flex justify-between items-center text-gray-500 text-sm border-t pt-4">
                    <div className="flex items-center gap-1">📐 {p.area} m²</div>
                    <div className="flex items-center gap-1">🛏️ {p.bedrooms} Beds</div>
                    <div className="flex items-center gap-1 truncate max-w-[100px]">📍 {p.location}</div>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500 text-xl font-medium">No featured properties available right now.</p>
                <Link href="/search" className="text-blue-600 underline mt-2 inline-block">Check all listings instead</Link>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 3. CTA Section */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="bg-blue-900 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Want to list your property?</h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join the fastest growing real estate network in Egypt. We help you connect with serious buyers in days, not months.
          </p>
          <a 
            href="https://wa.me/201008279766?text=Hello EgyHomes, I want to list my property." 
            target="_blank"
            className="inline-block bg-white text-blue-900 px-12 py-5 rounded-full font-black text-xl hover:bg-yellow-400 transition-colors shadow-xl"
          >
            Contact via WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}