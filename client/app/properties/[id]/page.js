'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`)
      .then(res => res.json())
      .then(data => { setProperty(data); setSelectedPlan(data.mortgagePlans?.[0] || 12); });
      
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (wishlist.includes(id)) setIsWishlisted(true);
  }, [id]);

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) wishlist = wishlist.filter(i => i !== id);
    else wishlist.push(id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = async () => {
    if (navigator.share) await navigator.share({ title: property.title, url: window.location.href });
    else alert("Link copied!");
  };

  if (!property) return <div className="text-center mt-20">Loading...</div>;

  // Calculate Mortgage
  const monthlyPayment = Math.round((property.price * 0.8) / selectedPlan); // 20% downpayment logic

  return (
    <div className="bg-gray-50 dark:bg-zinc-950 min-h-screen text-slate-800 dark:text-slate-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
            <div>
                <h1 className="text-3xl font-black">{property.title}</h1>
                <p className="text-gray-500 dark:text-gray-400">📍 {property.city}, {property.governorate}</p>
            </div>
            <div className="flex gap-2">
                <button onClick={toggleWishlist} className={`p-3 rounded-full shadow-lg ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-400'}`}>❤️</button>
                <button onClick={handleShare} className="p-3 rounded-full shadow-lg bg-white text-blue-600">🔗</button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Gallery & Content */}
            <div className="lg:col-span-2 space-y-8">
                <img src={property.images[0]} className="w-full h-96 object-cover rounded-3xl shadow-lg" />
                
                {/* Image Grid */}
                <div className="grid grid-cols-4 gap-2">
                    {property.images.slice(1, 5).map((img, i) => <img key={i} src={img} className="h-24 w-full object-cover rounded-xl cursor-pointer hover:opacity-80 transition"/>)}
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm text-center">
                        <span className="block text-emerald-500 font-bold text-xl">🛏️ {property.bedrooms}</span>
                        <span className="text-xs text-gray-400">Bedrooms</span>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm text-center">
                        <span className="block text-emerald-500 font-bold text-xl">🚿 {property.bathrooms}</span>
                        <span className="text-xs text-gray-400">Bathrooms</span>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm text-center">
                        <span className="block text-emerald-500 font-bold text-xl">📐 {property.area}</span>
                        <span className="text-xs text-gray-400">Sq. Meters</span>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm text-center">
                        <span className="block text-emerald-500 font-bold text-xl">🏢 {property.level}</span>
                        <span className="text-xs text-gray-400">Floor</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Description</h2>
                    <p className="whitespace-pre-line text-gray-600 dark:text-gray-300 leading-relaxed">{property.description}</p>
                </div>

                {/* Video & Map */}
                {property.videoUrl && (
                    <div className="bg-black rounded-3xl overflow-hidden aspect-video">
                        <iframe className="w-full h-full" src={property.videoUrl.replace('watch?v=', 'embed/')} allowFullScreen></iframe>
                    </div>
                )}
                
                {property.mapUrl && (
                    <div className="bg-gray-200 rounded-3xl p-4 text-center">
                        <a href={property.mapUrl} target="_blank" className="text-blue-600 font-bold underline">Open Location on Google Maps 🗺️</a>
                    </div>
                )}
            </div>

            {/* Sidebar Sticky */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl sticky top-24 border border-gray-100 dark:border-zinc-800">
                    <div className="mb-6">
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{property.listingType}</span>
                        <h2 className="text-4xl font-black text-slate-800 dark:text-white mt-2">{property.price.toLocaleString()} <span className="text-lg font-normal text-gray-400">EGP</span></h2>
                    </div>

                    <a href={`https://wa.me/201008279766?text=Interested in ${property.title}`} target="_blank" className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-4 rounded-xl font-bold transition shadow-lg shadow-emerald-500/30 mb-4">
                        WhatsApp Inquiry
                    </a>
                    
                    <div className="border-t dark:border-zinc-800 pt-6 mt-6">
                        <h3 className="font-bold mb-4">Mortgage Calculator</h3>
                        <label className="text-xs text-gray-500">Choose Plan (Months)</label>
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                            {property.mortgagePlans?.map(m => (
                                <button key={m} onClick={() => setSelectedPlan(m)} className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap ${selectedPlan === m ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500'}`}>
                                    {m} Months
                                </button>
                            ))}
                        </div>
                        <div className="bg-blue-50 dark:bg-zinc-800 p-4 rounded-xl text-center">
                            <p className="text-sm text-gray-500">Estimated Monthly</p>
                            <p className="text-2xl font-black text-blue-600">{monthlyPayment.toLocaleString()} EGP</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}