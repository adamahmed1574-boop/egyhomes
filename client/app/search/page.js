'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

function SearchContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters State
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || 'All',
    minPrice: '',
    maxPrice: ''
  });

  const fetchProperties = async () => {
    setLoading(true);
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties?${query}`);
    const data = await res.json();
    setProperties(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
          <input placeholder="Location (e.g. Cairo)" value={filters.location} onChange={e => setFilters({...filters, location: e.target.value})} className="border p-2 rounded" />
          <select value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})} className="border p-2 rounded">
            <option value="All">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Duplex">Duplex</option>
          </select>
          <input type="number" placeholder="Min Price" value={filters.minPrice} onChange={e => setFilters({...filters, minPrice: e.target.value})} className="border p-2 rounded" />
          <input type="number" placeholder="Max Price" value={filters.maxPrice} onChange={e => setFilters({...filters, maxPrice: e.target.value})} className="border p-2 rounded" />
          <button onClick={fetchProperties} className="bg-blue-900 text-white font-bold p-2 rounded">Search</button>
        </div>

        {/* Results */}
        {loading ? <p>Loading...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map(p => (
                    <Link href={`/properties/${p._id}`} key={p._id} className="bg-white rounded-xl shadow hover:shadow-xl transition block">
                        <div className="h-48 overflow-hidden rounded-t-xl relative">
                           <img src={p.images[0]} className="w-full h-full object-cover" />
                           {p.isFeatured && <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">FEATURED</span>}
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg">{p.title}</h3>
                            <p className="text-blue-900 font-bold">{p.price.toLocaleString()} EGP</p>
                            <p className="text-gray-500 text-sm">{p.location}</p>
                        </div>
                    </Link>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return <Suspense><SearchContent /></Suspense>;
}