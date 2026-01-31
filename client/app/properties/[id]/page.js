'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`)
      .then(res => { if(!res.ok) throw new Error("Not Found"); return res.json(); })
      .then(data => { setProperty(data); setSelectedPlan(data.mortgagePlans?.[0] || 12); })
      .catch(() => setNotFound(true));
      
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

  if (notFound) return <div className="flex h-screen items-center justify-center text-xl font-bold text-gray-400">Property Not Found 🏠</div>;
  if (!property) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>;

  const monthlyPayment = Math.round((property.price * 0.8) / (selectedPlan || 12));

  return (
    <div className="bg-gray-50 dark:bg-zinc-950 min-h-screen text-slate-800 dark:text-slate-100 pb-20">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div>
                <h1 className="text-3xl font-black">{property.title}</h1>
                <p className="text-gray-500 mt-1">📍 {property.city}, {property.governorate}</p>
            </div>
            <div className="flex gap-2"><button onClick={toggleWishlist} className={`p-3 rounded-full shadow-md border ${isWishlisted ? 'bg-red-50 text-red-600' : 'bg-white text-gray-400'}`}>❤️</button></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <img src={property.images[0]} className="w-full h-96 object-cover rounded-3xl shadow-lg" />
                <div className="grid grid-cols-4 gap-2">{property.images.slice(1, 5).map((img, i) => <img key={i} src={img} className="h-24 w-full object-cover rounded-xl"/>)}</div>
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800"><h2 className="text-xl font-bold mb-4">Description</h2><p className="whitespace-pre-line text-gray-600 dark:text-gray-300 leading-relaxed">{property.description}</p></div>
            </div>
            <div className="space-y-6">
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl sticky top-24 border border-gray-100 dark:border-zinc-800">
                    <div className="mb-8"><p className="text-sm text-gray-400 font-bold uppercase mb-1">Total Price</p><h2 className="text-4xl font-black">{property.price.toLocaleString()} EGP</h2></div>
                    <a href={`https://wa.me/201008279766?text=Interested in ${property.title}`} target="_blank" className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-4 rounded-xl font-bold shadow-lg mb-4">WhatsApp Inquiry</a>
                    {property.listingType === 'Buy' && (
                        <div className="border-t pt-6 mt-6">
                            <h3 className="font-bold mb-4">Mortgage Calculator</h3>
                            <div className="flex flex-wrap gap-2 mb-4">{property.mortgagePlans?.map(m => <button key={m} onClick={() => setSelectedPlan(m)} className={`px-3 py-2 rounded-lg text-xs font-bold ${selectedPlan === m ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>{m}m</button>)}</div>
                            <div className="bg-blue-50 p-4 rounded-xl text-center"><p className="text-xs text-blue-600 font-bold mb-1">Monthly</p><p className="text-2xl font-black text-blue-900">{monthlyPayment.toLocaleString()} EGP</p></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}