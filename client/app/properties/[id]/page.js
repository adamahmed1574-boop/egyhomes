'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

// Feature 9: SEO (Metadata) - Note: In 'use client', standard metadata export doesn't work easily, 
// so we focus on the visible features here.

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProperty(data);
        fetchSimilar(data.type); // Feature 5: Fetch Similar
      }
    };

    // Feature 4: Wishlist Logic
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (wishlist.includes(id)) setIsWishlisted(true);

    if(id) fetchProperty();
  }, [id]);

  const fetchSimilar = async (type) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties?type=${type}`);
    const data = await res.json();
    setSimilar(data.filter(p => p._id !== id).slice(0, 3));
  };

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = async () => {
    // Feature 3: Share Button
    if (navigator.share) {
      await navigator.share({
        title: property.title,
        text: `Check out this property on EgyHomes: ${property.price} EGP`,
        url: window.location.href,
      });
    } else {
      alert("Link copied to clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Feature 2: Helper for YouTube Embed
  const getYoutubeEmbed = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  if (!property) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Breadcrumb & Actions */}
        <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
                <Link href="/" className="hover:text-blue-600">Home</Link> &gt; {property.title}
            </div>
            <div className="flex gap-2">
                <button onClick={toggleWishlist} className={`p-2 rounded-full shadow ${isWishlisted ? 'bg-red-100 text-red-600' : 'bg-white text-gray-400'}`}>
                    {isWishlisted ? '❤️ Saved' : '🤍 Save'}
                </button>
                <button onClick={handleShare} className="bg-white p-2 rounded-full shadow text-blue-600 font-bold">
                    🔗 Share
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Images */}
                <div className="space-y-4">
                    <img src={property.images[0]} className="w-full h-80 md:h-[500px] object-cover rounded-2xl shadow" />
                    <div className="grid grid-cols-4 gap-2">
                        {property.images.slice(1, 5).map((img, i) => (
                            <img key={i} src={img} className="h-24 w-full object-cover rounded-lg cursor-pointer hover:opacity-80"/>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <p className="whitespace-pre-line text-gray-600">{property.description}</p>
                </div>

                {/* Feature 2: Video */}
                {property.videoUrl && (
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-2xl font-bold mb-4">Video Tour</h2>
                        <iframe className="w-full h-64 md:h-96 rounded-lg" src={getYoutubeEmbed(property.videoUrl)} allowFullScreen></iframe>
                    </div>
                )}

                {/* Feature 8: Map */}
                {property.mapUrl && (
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-2xl font-bold mb-4">Location</h2>
                        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                             <a href={property.mapUrl} target="_blank" className="text-blue-600 font-bold underline">Open in Google Maps</a>
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow sticky top-24">
                    <h1 className="text-3xl font-extrabold text-blue-900 mb-2">{property.price.toLocaleString()} EGP</h1>
                    <p className="text-gray-500 mb-6">📍 {property.location}</p>
                    <a href={`https://wa.me/201008279766?text=I'm interested in ${property.title}`} target="_blank" className="block w-full bg-green-500 text-white text-center py-3 rounded-xl font-bold mb-3">WhatsApp</a>
                    <a href="tel:+201008279766" className="block w-full border-2 border-blue-900 text-blue-900 text-center py-3 rounded-xl font-bold">Call Now</a>
                </div>
            </div>
        </div>

        {/* Feature 5: Similar Properties */}
        {similar.length > 0 && (
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {similar.map(sim => (
                        <Link href={`/properties/${sim._id}`} key={sim._id} className="bg-white rounded-xl shadow p-4 hover:shadow-lg">
                            <img src={sim.images[0]} className="h-40 w-full object-cover rounded mb-2"/>
                            <h3 className="font-bold">{sim.title}</h3>
                            <p className="text-blue-600">{sim.price.toLocaleString()} EGP</p>
                        </Link>
                    ))}
                </div>
            </div>
        )}
      </main>
      <Footer />
    </div>
  );
}