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
    listingType: 'All',
    type: 'All',
    minPrice: '',
    maxPrice: ''
  });

  const fetchProperties = async () => {
    setLoading(true);
    let url = `${API_URL}/api/properties?`;
    
    const query = new URLSearchParams();
    if(filters.governorate !== 'All') query.append('governorate', filters.governorate);
    // Important: Backend filter logic expects 'location' for city/area usually
    // But since we updated backend to use 'city' or 'location', let's stick to what backend expects.
    // In previous index.js update, I set `query.location = location` (City).
    if(filters.city !== 'All') query.append('location', filters.city);
    
    if(filters.listingType !== 'All') query.append('listingType', filters.listingType);
    if(filters.type !== 'All') query.append('type', filters.type);
    if(filters.minPrice) query.append('minPrice', filters.minPrice);
    if(filters.maxPrice) query.append('maxPrice', filters.maxPrice);

    try {
        const res = await fetch(url + query.toString());
        const data = await res.json();
        
        let finalData = Array.isArray(data) ? data : [];

        if (showFavorites) {
            const favIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
            finalData = finalData.filter(p => favIds.includes(p._id));
        }
        
        setProperties(finalData);
    } catch (err) {
        console.error(err);
        setProperties([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProperties(); }, [showFavorites]); 

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 md:p-8 text-slate-800 dark:text-white">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-3xl font-black mb-8 dark:text-white">
            {showFavorites ? 'My Favorites ❤️' : 'Search Properties 🔍'}
        </h1>

        {!showFavorites && (
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-xl mb-10 border border-gray-100 dark:border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                
                {/* Gov Dropdown */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-1">Governorate</label>
                    <select className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" value={filters.governorate} onChange={e => setFilters({...filters, governorate: e.target.value, city: 'All'})}>
                    <option value="All">All</option>
                    {Object.entries(GOVERNORATES).map(([id, name]) => <option key={id} value={id}>{name}</option>)}
                    </select>
                </div>

                {/* City Dropdown */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-1">City</label>
                    <select className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" value={filters.city} onChange={e => setFilters({...filters, city: e.target.value})} disabled={filters.governorate === 'All'}>
                    <option value="All">All</option>
                    {filters.governorate !== 'All' && CITIES[filters.governorate]?.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-1">Mode</label>
                    <select className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" value={filters.listingType} onChange={e => setFilters({...filters, listingType: e.target.value})}>
                    <option value="All">Any</option>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-1">Type</label>
                    <select className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})}>
                    <option value="All">Any</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Chalet">Chalet</option>
                    </select>
                </div>

                <div className="space-y-1 col-span-1 md:col-span-2 lg:col-span-1">
                    <label className="text-xs font-bold text-gray-400 ml-1">Price Range</label>
                    <div className="flex gap-2">
                        <input placeholder="Min" type="number" className="w-1/2 p-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" onChange={e => setFilters({...filters, minPrice: e.target.value})} />
                        <input placeholder="Max" type="number" className="w-1/2 p-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" onChange={e => setFilters({...filters, maxPrice: e.target.value})} />
                    </div>
                </div>

                <div className="flex items-end">
                    <button onClick={fetchProperties} className="w-full bg-emerald-600 text-white font-bold p-3 rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/30">
                    Search Results
                    </button>
                </div>
            </div>
            </div>
        )}

        <div className="mb-6">
            <button onClick={() => { setShowFavorites(!showFavorites); }} className={`text-sm font-bold flex items-center gap-2 ${showFavorites ? 'text-emerald-500' : 'text-gray-500'}`}>
                {showFavorites ? '← Back to All Properties' : '❤️ View My Favorites Only'}
            </button>
        </div>

        {loading ? <p className="text-center py-20 text-gray-500">Loading properties...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map(p => (
                    <Link href={`/properties/${p._id}`} key={p._id} className="group bg-white dark:bg-zinc-900 rounded-[2rem] shadow-sm hover:shadow-xl transition block overflow-hidden border border-gray-100 dark:border-zinc-800 transform hover:-translate-y-1">
                        <div className="h-60 overflow-hidden relative">
                           <img src={p.images[0] || 'https://via.placeholder.com/400'} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={p.title}/>
                           
                           <div className="absolute top-3 left-3 flex flex-col gap-2">
                                {p.isHotDeal && <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow animate-pulse">HOT DEAL</span>}
                                {p.isFeatured && <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow">FEATURED</span>}
                           </div>

                           <span className={`absolute bottom-3 right-3 px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-md shadow-sm ${p.listingType === 'Rent' ? 'bg-purple-500/90 text-white' : 'bg-white/90 text-slate-900'}`}>
                             {p.listingType === 'Rent' ? 'For Rent' : 'For Sale'}
                           </span>
                        </div>
                        
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg dark:text-white truncate w-3/4">{p.title}</h3>
                                <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded text-gray-500 uppercase">{p.type}</span>
                            </div>
                            
                            <p className="text-emerald-600 dark:text-emerald-400 font-black text-2xl mt-1">
                                {parseInt(p.price).toLocaleString()} <span className="text-xs text-gray-400 font-normal">EGP</span>
                            </p>
                            
                            <div className="flex gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400 font-bold">
                                <span>🛏️ {p.bedrooms}</span>
                                <span>🚿 {p.bathrooms}</span>
                                <span>📐 {p.area} m²</span>
                            </div>

                            <p className="text-gray-400 text-xs mt-4 flex items-center gap-1 truncate">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                {p.city}, {GOVERNORATES[p.governorate] || p.governorate}
                            </p>
                        </div>
                    </Link>
                ))}
                {properties.length === 0 && <p className="col-span-full text-center py-20 text-gray-400 text-lg">No properties found matching your criteria.</p>}
            </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return <Suspense><SearchContent /></Suspense>;
}