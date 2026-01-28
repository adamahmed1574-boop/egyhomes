'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { GOVERNORATES, CITIES } from '../../data/locations';

function SearchContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(searchParams.get('show') === 'favorites');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [filters, setFilters] = useState({
    governorate: 'All',
    city: 'All',
    listingType: 'All', // Buy/Rent
    type: 'All',        // Apartment/Villa
    minPrice: '',
    maxPrice: ''
  });

  const fetchProperties = async () => {
    setLoading(true);
    let url = `${API_URL}/api/properties?`;
    
    // Convert filters to query string
    const query = new URLSearchParams();
    if(filters.governorate !== 'All') query.append('governorate', filters.governorate);
    if(filters.city !== 'All') query.append('location', filters.city);
    if(filters.listingType !== 'All') query.append('listingType', filters.listingType);
    if(filters.type !== 'All') query.append('type', filters.type);
    if(filters.minPrice) query.append('minPrice', filters.minPrice);
    if(filters.maxPrice) query.append('maxPrice', filters.maxPrice);

    const res = await fetch(url + query.toString());
    const data = await res.json();
    
    if (showFavorites) {
        const favIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setProperties(data.filter(p => favIds.includes(p._id)));
    } else {
        setProperties(data);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProperties(); }, [showFavorites]); // Re-fetch if mode changes

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- FILTER BAR --- */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-xl mb-10 border border-gray-100 dark:border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* Gov */}
            <select className="p-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" value={filters.governorate} onChange={e => setFilters({...filters, governorate: e.target.value, city: 'All'})}>
               <option value="All">All Governorates</option>
               {Object.values(GOVERNORATES).map(gov => <option key={gov} value={gov}>{gov}</option>)}
            </select>

            {/* City */}
            <select className="p-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" value={filters.city} onChange={e => setFilters({...filters, city: e.target.value})} disabled={filters.governorate === 'All'}>
               <option value="All">All Cities</option>
               {filters.governorate !== 'All' && CITIES[filters.governorate]?.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Buy/Rent */}
            <select className="p-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" value={filters.listingType} onChange={e => setFilters({...filters, listingType: e.target.value})}>
               <option value="All">Buy & Rent</option>
               <option value="Buy">Buy</option>
               <option value="Rent">Rent</option>
            </select>

            {/* Type */}
            <select className="p-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})}>
               <option value="All">All Types</option>
               <option value="Apartment">Apartment</option>
               <option value="Villa">Villa</option>
               <option value="Duplex">Duplex</option>
               <option value="Commercial">Commercial</option>
            </select>

            {/* Price */}
            <div className="flex gap-2 col-span-1 md:col-span-2 lg:col-span-1">
               <input placeholder="Min Price" type="number" className="w-1/2 p-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" onChange={e => setFilters({...filters, minPrice: e.target.value})} />
               <input placeholder="Max Price" type="number" className="w-1/2 p-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" onChange={e => setFilters({...filters, maxPrice: e.target.value})} />
            </div>

            {/* Search Button */}
            <button onClick={fetchProperties} className="bg-emerald-600 text-white font-bold p-3 rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/30">
               Search
            </button>
          </div>
          
          <button onClick={() => { setShowFavorites(!showFavorites); }} className={`mt-4 text-sm font-bold ${showFavorites ? 'text-red-500' : 'text-gray-500'}`}>
             {showFavorites ? '← Back to All' : '❤️ View Favorites Only'}
          </button>
        </div>

        {/* --- RESULTS --- */}
        {loading ? <p className="text-center py-20 text-gray-500">Searching...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map(p => (
                    <Link href={`/properties/${p._id}`} key={p._id} className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm hover:shadow-xl transition block overflow-hidden border border-gray-100 dark:border-zinc-800">
                        <div className="h-56 overflow-hidden relative">
                           <img src={p.images[0]} className="w-full h-full object-cover" />
                           <span className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm">
                             {p.listingType}
                           </span>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-lg dark:text-white truncate">{p.title}</h3>
                            <p className="text-emerald-600 dark:text-emerald-400 font-black text-xl mt-1">{p.price.toLocaleString()} EGP</p>
                            <p className="text-gray-400 text-sm mt-2">📍 {p.city}, {p.governorate}</p>
                        </div>
                    </Link>
                ))}
                {properties.length === 0 && <p className="col-span-full text-center py-20 text-gray-400">No properties found.</p>}
            </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return <Suspense><SearchContent /></Suspense>;
}