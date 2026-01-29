'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Added { cache: 'no-store' } to force fresh data
    fetch(`${API_URL}/api/properties/${id}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => { 
          setProperty(data); 
          setSelectedPlan(data.mortgagePlans?.[0] || 12); 
      })
      .catch(err => console.error(err));
      
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (wishlist.includes(id)) setIsWishlisted(true);
  }, [id, API_URL]);

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) wishlist = wishlist.filter(i => i !== id);
    else wishlist.push(id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = async () => {
    if (navigator.share) await navigator.share({ title: property.title, url: window.location.href });
    else { navigator.clipboard.writeText(window.location.href); alert("Link copied!"); }
  };

  if (!property) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>;

  const calculateMortgage = () => {
      const maxFinancing = property.maxMortgagePercent || 80;
      const loanRatio = maxFinancing / 100;
      const P = property.price * loanRatio;
      const annualRate = property.interestRate || 20; 
      const i = (annualRate / 100) / 12;
      const n = selectedPlan || 12;

      if (i === 0) return Math.round(P / n);
      const M = (P * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
      return Math.round(M);
  };

  const monthlyPayment = calculateMortgage();
  const downPayment = property.price * (1 - ((property.maxMortgagePercent || 80) / 100));

  return (
    <div className="bg-gray-50 dark:bg-zinc-950 min-h-screen text-slate-800 dark:text-slate-100 pb-20">
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${property.listingType === 'Rent' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        For {property.listingType}
                    </span>
                    {property.isHotDeal && <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase">🔥 Hot Deal</span>}
                    {property.isSold && <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Sold Out</span>}
                </div>
                <h1 className="text-3xl md:text-4xl font-black">{property.title}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {property.city}, {property.governorate}
                </p>
            </div>
            <div className="flex gap-2">
                <button onClick={toggleWishlist} className={`p-3 rounded-full shadow-md border ${isWishlisted ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-400'}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
                <button onClick={handleShare} className="p-3 rounded-full shadow-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-blue-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="aspect-video w-full overflow-hidden rounded-3xl shadow-lg bg-gray-200 dark:bg-zinc-900">
                    <img src={property.images[0]} className="w-full h-full object-cover" />
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                    {property.images.slice(1, 5).map((img, i) => (
                        <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90">
                            <img src={img} className="w-full h-full object-cover"/>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 text-center">
                        <span className="block text-emerald-600 dark:text-emerald-400 font-black text-xl">{property.bedrooms}</span>
                        <span className="text-xs text-gray-400 font-bold uppercase">Beds</span>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 text-center">
                        <span className="block text-emerald-600 dark:text-emerald-400 font-black text-xl">{property.bathrooms}</span>
                        <span className="text-xs text-gray-400 font-bold uppercase">Baths</span>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 text-center">
                        <span className="block text-emerald-600 dark:text-emerald-400 font-black text-xl">{property.area}</span>
                        <span className="text-xs text-gray-400 font-bold uppercase">Sq. Meters</span>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 text-center">
                        <span className="block text-emerald-600 dark:text-emerald-400 font-black text-xl">{property.level}</span>
                        <span className="text-xs text-gray-400 font-bold uppercase">Floor</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800">
                    <h2 className="text-xl font-bold mb-4">About this home</h2>
                    <p className="whitespace-pre-line text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{property.description}</p>
                </div>

                {property.videoUrl && (
                    <div className="rounded-3xl overflow-hidden aspect-video shadow-lg">
                        <iframe className="w-full h-full" src={property.videoUrl.replace('watch?v=', 'embed/')} allowFullScreen></iframe>
                    </div>
                )}
                
                {property.mapUrl && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl text-center border border-blue-100 dark:border-blue-900/50">
                        <a href={property.mapUrl} target="_blank" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black underline hover:no-underline">
                            Open Location on Google Maps
                        </a>
                    </div>
                )}
            </div>

            <div className="space-y-6">
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl sticky top-24 border border-gray-100 dark:border-zinc-800">
                    <div className="mb-8">
                        <p className="text-sm text-gray-400 font-bold uppercase mb-1">Total Price</p>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white">{property.price.toLocaleString()} <span className="text-lg font-normal text-gray-400">EGP</span></h2>
                    </div>

                    <a href={`https://wa.me/201008279766?text=I am interested in ${property.title} (Ref: ${property._id})`} target="_blank" className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-4 rounded-xl font-bold transition shadow-lg shadow-emerald-500/30 mb-4 flex items-center justify-center gap-2">
                        WhatsApp Inquiry
                    </a>
                    
                    {property.listingType === 'Buy' && (
                        <div className="border-t dark:border-zinc-800 pt-6 mt-6">
                            <h3 className="font-bold mb-4">Mortgage Calculator</h3>
                            <div className="mb-4">
                                <label className="text-xs text-gray-500 font-bold block mb-2">Duration</label>
                                <div className="flex flex-wrap gap-2">
                                    {property.mortgagePlans?.map(m => (
                                        <button 
                                            key={m} 
                                            onClick={() => setSelectedPlan(m)} 
                                            className={`px-3 py-2 rounded-lg text-xs font-bold transition ${selectedPlan === m ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:bg-gray-200'}`}
                                        >
                                            {m}m
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 text-center">
                                <p className="text-xs text-blue-600 dark:text-blue-300 font-bold mb-1">Monthly Payment</p>
                                <p className="text-2xl font-black text-blue-900 dark:text-blue-100">{monthlyPayment.toLocaleString()} <span className="text-sm font-normal">EGP</span></p>
                                <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800 text-[10px] text-blue-500 dark:text-blue-400 flex justify-between">
                                    <span>Rate: {property.interestRate}%</span>
                                    <span>Downpayment: {downPayment.toLocaleString()} EGP</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}