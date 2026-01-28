'use client';
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [secret, setSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [properties, setProperties] = useState([]);
  const [partners, setPartners] = useState([]);
  const [form, setForm] = useState({
    title: '', price: '', location: '', area: '', description: '', 
    images: '', type: 'Apartment', bedrooms: '', bathrooms: '', level: '', 
    isSold: false, videoUrl: '', mapUrl: '', isFeatured: false 
  });
  const [partnerForm, setPartnerForm] = useState({ name: '', logo: '' });
  const [editingId, setEditingId] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const checkLogin = () => {
    // SECURITY: Ensure you set NEXT_PUBLIC_ADMIN_SECRET in Vercel Settings
    if (secret === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert('Wrong Password!');
    }
  };

  const fetchData = async () => {
    const resProp = await fetch(`${API_URL}/api/properties`);
    const dataProp = await resProp.json();
    setProperties(dataProp);

    const resPart = await fetch(`${API_URL}/api/partners`);
    const dataPart = await resPart.json();
    setPartners(dataPart);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imagesArray = form.images.split(/[\n,]+/).map(url => url.trim()).filter(url => url !== '');
    const payload = { ...form, images: imagesArray, secret };

    const url = editingId ? `${API_URL}/api/properties/${editingId}` : `${API_URL}/api/properties`;
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    setForm({
        title: '', price: '', location: '', area: '', description: '', 
        images: '', type: 'Apartment', bedrooms: '', bathrooms: '', level: '', 
        isSold: false, videoUrl: '', mapUrl: '', isFeatured: false
    });
    setEditingId(null);
    fetchData();
    alert("Saved Successfully!");
  };

  const deleteProperty = async (id) => {
    if (!confirm("Delete?")) return;
    await fetch(`${API_URL}/api/properties/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret })
    });
    fetchData();
  };

  if (!isAuthenticated) return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="p-10 bg-white rounded-2xl shadow-xl w-96 text-center">
          <h2 className="text-3xl mb-6 font-bold text-blue-900">Admin Login</h2>
          <input type="password" placeholder="Enter Secret Code" className="border p-4 w-full mb-6 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setSecret(e.target.value)} />
          <button onClick={checkLogin} className="bg-blue-900 text-white w-full py-4 rounded-xl font-bold hover:bg-blue-800 transition">Access Dashboard</button>
        </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-blue-900 border-b pb-4">Egy Homes Dashboard</h1>

        {/* PROPERTY FORM */}
        <div className="bg-white p-8 rounded-3xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{editingId ? '✏️ Edit Property' : '➕ Add Property'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="border p-4 rounded-xl bg-gray-50" />
            <input required type="number" placeholder="Price (EGP)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="border p-4 rounded-xl bg-gray-50" />
            <input required placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="border p-4 rounded-xl bg-gray-50" />
            <input required type="number" placeholder="Area (m2)" value={form.area} onChange={e => setForm({...form, area: e.target.value})} className="border p-4 rounded-xl bg-gray-50" />
            <input placeholder="YouTube URL" value={form.videoUrl} onChange={e => setForm({...form, videoUrl: e.target.value})} className="border p-4 rounded-xl bg-gray-50" />
            <input placeholder="Google Maps URL" value={form.mapUrl} onChange={e => setForm({...form, mapUrl: e.target.value})} className="border p-4 rounded-xl bg-gray-50" />
            
            <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-600 mb-2">Property Images (Paste 15+ URLs, one per line)</label>
                <textarea required rows="6" placeholder="https://site.com/img1.jpg..." value={form.images} onChange={e => setForm({...form, images: e.target.value})} className="border p-4 rounded-xl w-full font-mono text-sm bg-gray-50" />
            </div>

            <textarea placeholder="Property Description" rows="4" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="border p-4 rounded-xl md:col-span-2 bg-gray-50" />
            
            <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})} className="w-6 h-6" />
                <label className="font-bold text-yellow-800">Feature this on Homepage</label>
            </div>

            <button type="submit" className="bg-green-600 text-white py-4 rounded-xl md:col-span-2 font-bold hover:bg-green-700 transition shadow-lg">Save Property</button>
          </form>
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map(p => (
            <div key={p._id} className="bg-white p-4 rounded-2xl shadow border flex flex-col justify-between">
              <img src={p.images[0]} className="w-full h-40 object-cover rounded-xl mb-4" />
              <h3 className="font-bold truncate">{p.title}</h3>
              <p className="text-blue-700 font-bold">{parseInt(p.price).toLocaleString()} EGP</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => { setEditingId(p._id); setForm({...p, images: p.images.join('\n')}); window.scrollTo(0,0); }} className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg font-bold">Edit</button>
                <button onClick={() => deleteProperty(p._id)} className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg font-bold">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}