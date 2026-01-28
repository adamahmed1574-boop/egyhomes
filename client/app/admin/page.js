'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
  // --- 1. State Variables (تعريف المتغيرات) ---
  const [secret, setSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Data State
  const [properties, setProperties] = useState([]);
  const [partners, setPartners] = useState([]); 

  // Property Form State
  const [form, setForm] = useState({
    title: '',
    price: '',
    location: '',
    area: '',
    description: '',
    images: '',
    type: 'Apartment',
    bedrooms: '',
    bathrooms: '',
    level: '',
    isSold: false,
    videoUrl: '',    // Feature: YouTube
    mapUrl: '',      // Feature: Google Maps
    isFeatured: false // Feature: Featured Badge
  });

  // Partner Form State
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    logo: ''
  });

  const [editingId, setEditingId] = useState(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // --- 2. Functions (الوظائف) ---

  // Check Password
  const checkLogin = () => {
    if (secret === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert('Wrong Password!');
    }
  };

  // Fetch All Data (Properties + Partners)
  const fetchData = async () => {
    try {
      // Get Properties
      const resProp = await fetch(`${API_URL}/api/properties`);
      const dataProp = await resProp.json();
      setProperties(dataProp);

      // Get Partners
      const resPart = await fetch(`${API_URL}/api/partners`);
      const dataPart = await resPart.json();
      setPartners(dataPart);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle Property Submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert text images to array
    const imagesArray = form.images
      .split(/[\n,]+/)
      .map(url => url.trim())
      .filter(url => url !== '');

    const payload = { ...form, images: imagesArray, secret };

    const url = editingId 
      ? `${API_URL}/api/properties/${editingId}` 
      : `${API_URL}/api/properties`;
      
    const method = editingId ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Reset Form
      setForm({
        title: '', price: '', location: '', area: '', description: '', 
        images: '', type: 'Apartment', bedrooms: '', bathrooms: '', level: '', 
        isSold: false, videoUrl: '', mapUrl: '', isFeatured: false
      });
      setEditingId(null);
      fetchData();
      alert(editingId ? "Property Updated!" : "Property Added!");
    } catch (error) {
      alert("Error saving property");
    }
  };

  // Delete Property
  const deleteProperty = async (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    
    await fetch(`${API_URL}/api/properties/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret })
    });
    
    fetchData();
  };

  // Start Editing Mode
  const startEdit = (property) => {
    setEditingId(property._id);
    setForm({ 
      ...property, 
      images: property.images ? property.images.join('\n') : '' 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Partner
  const deletePartner = async (id) => {
      if(!confirm("Delete Partner?")) return;
      
      await fetch(`${API_URL}/api/partners/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ secret })
      });
      
      fetchData();
  };

  // Add Partner
  const handlePartnerSubmit = async (e) => {
      e.preventDefault();
      
      await fetch(`${API_URL}/api/partners`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...partnerForm, secret })
      });
      
      setPartnerForm({ name: '', logo: '' });
      fetchData();
  };

  // --- 3. Login Screen Render ---
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="p-8 bg-white rounded shadow-md w-96">
          <h2 className="text-2xl mb-6 font-bold text-center text-blue-900">Admin Login</h2>
          <input 
            type="password" 
            placeholder="Enter Secret Code" 
            className="border p-3 w-full mb-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSecret(e.target.value)}
          />
          <button 
            onClick={checkLogin} 
            className="bg-blue-900 text-white w-full py-3 rounded font-bold hover:bg-blue-800 transition"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  // --- 4. Main Dashboard Render ---
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-900 border-b pb-4">
          Admin Dashboard
        </h1>

        {/* --- SECTION 1: PROPERTY FORM --- */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            {editingId ? '✏️ Edit Property' : '➕ Add New Property'}
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Basic Details */}
            <div className="space-y-4">
               <input required placeholder="Title (e.g. Luxury Appt)" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="border p-3 rounded w-full" />
               <input required type="number" placeholder="Price (EGP)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="border p-3 rounded w-full" />
               <input required placeholder="Location (e.g. New Cairo)" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="border p-3 rounded w-full" />
               <input required type="number" placeholder="Area (m2)" value={form.area} onChange={e => setForm({...form, area: e.target.value})} className="border p-3 rounded w-full" />
            </div>

            {/* Advanced Details */}
            <div className="space-y-4">
               <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="border p-3 rounded w-full bg-white">
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Commercial">Commercial</option>
               </select>
               
               <div className="grid grid-cols-3 gap-2">
                  <input type="number" placeholder="Beds" value={form.bedrooms} onChange={e => setForm({...form, bedrooms: e.target.value})} className="border p-3 rounded" />
                  <input type="number" placeholder="Baths" value={form.bathrooms} onChange={e => setForm({...form, bathrooms: e.target.value})} className="border p-3 rounded" />
                  <input type="number" placeholder="Level" value={form.level} onChange={e => setForm({...form, level: e.target.value})} className="border p-3 rounded" />
               </div>

               {/* New Features: Video & Map */}
               <input placeholder="YouTube Video URL (Optional)" value={form.videoUrl} onChange={e => setForm({...form, videoUrl: e.target.value})} className="border p-3 rounded w-full" />
               <input placeholder="Google Maps Link (Optional)" value={form.mapUrl} onChange={e => setForm({...form, mapUrl: e.target.value})} className="border p-3 rounded w-full" />
            </div>
            
            {/* Featured Checkbox */}
            <div className="md:col-span-2 bg-yellow-50 p-4 rounded border border-yellow-200 flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="featured"
                  checked={form.isFeatured} 
                  onChange={e => setForm({...form, isFeatured: e.target.checked})} 
                  className="w-5 h-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" 
                />
                <label htmlFor="featured" className="font-bold text-yellow-800 cursor-pointer">
                  Mark this property as FEATURED (Display star badge & show first)
                </label>
            </div>

            {/* Images Area */}
            <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Property Images (One URL per line)</label>
                <textarea 
                    required 
                    rows="5"
                    placeholder="https://image1.jpg&#10;https://image2.jpg" 
                    value={form.images} 
                    onChange={e => setForm({...form, images: e.target.value})} 
                    className="border p-3 rounded w-full font-mono text-sm" 
                />
            </div>

            {/* Description Area */}
            <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea 
                    placeholder="Describe the property details..." 
                    rows="4" 
                    value={form.description} 
                    onChange={e => setForm({...form, description: e.target.value})} 
                    className="border p-3 rounded w-full" 
                />
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex gap-4">
                <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition shadow-md">
                  {editingId ? 'Update Property' : 'List Property Now'}
                </button>
                
                {editingId && (
                  <button 
                    type="button" 
                    onClick={() => {
                        setEditingId(null); 
                        setForm({
                            title: '', price: '', location: '', area: '', description: '', 
                            images: '', type: 'Apartment', bedrooms: '', bathrooms: '', level: '', 
                            isSold: false, videoUrl: '', mapUrl: '', isFeatured: false
                        });
                    }} 
                    className="bg-gray-500 text-white px-8 py-3 rounded font-bold hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                )}
            </div>
          </form>
        </div>

        {/* --- SECTION 2: PROPERTIES LIST --- */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-t pt-8">
            Manage Properties ({properties.length})
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {properties.map(property => (
            <div key={property._id} className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition relative">
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                 {property.isSold && <span className="bg-red-600 text-white text-xs px-2 py-1 rounded shadow">SOLD</span>}
                 {property.isFeatured && <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded shadow font-bold">★ FEATURED</span>}
              </div>

              {/* Image */}
              <img 
                src={property.images && property.images.length > 0 ? property.images[0] : ''} 
                alt={property.title} 
                className="w-full h-48 object-cover rounded mb-4 bg-gray-100" 
              />
              
              {/* Info */}
              <h3 className="font-bold text-lg mb-1 truncate">{property.title}</h3>
              <p className="text-blue-900 font-bold text-xl mb-2">{parseInt(property.price).toLocaleString()} EGP</p>
              <p className="text-gray-500 text-sm mb-4">📍 {property.location}</p>
              
              {/* Actions */}
              <div className="flex justify-between border-t pt-4 mt-2">
                <button 
                    onClick={() => startEdit(property)} 
                    className="text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded transition"
                >
                    Edit
                </button>
                <button 
                    onClick={() => deleteProperty(property._id)} 
                    className="text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded transition"
                >
                    Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- SECTION 3: PARTNERS --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-purple-600">
             <h2 className="text-xl font-bold mb-6 text-gray-800">Manage Partners</h2>
             
             <form onSubmit={handlePartnerSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
                 <input 
                    placeholder="Partner Name" 
                    value={partnerForm.name} 
                    onChange={e => setPartnerForm({...partnerForm, name: e.target.value})} 
                    className="border p-3 rounded flex-1"
                 />
                 <input 
                    placeholder="Logo URL" 
                    value={partnerForm.logo} 
                    onChange={e => setPartnerForm({...partnerForm, logo: e.target.value})} 
                    className="border p-3 rounded flex-1"
                 />
                 <button type="submit" className="bg-purple-600 text-white px-8 py-3 rounded font-bold hover:bg-purple-700 transition shadow">
                    Add Partner
                 </button>
             </form>

             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                 {partners.map(p => (
                     <div key={p._id} className="text-center border p-4 rounded-lg relative group hover:shadow-lg transition bg-gray-50">
                         <img src={p.logo} className="h-16 mx-auto mb-3 object-contain"/>
                         <p className="font-bold text-sm text-gray-700">{p.name}</p>
                         <button 
                            onClick={() => deletePartner(p._id)} 
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition shadow"
                         >
                            ✕
                         </button>
                     </div>
                 ))}
             </div>
        </div>

      </div>
    </div>
  );
}