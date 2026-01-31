'use client';
import { useState, useEffect } from 'react';
import { GOVERNORATES, CITIES } from '../../data/locations';

export default function AdminPanel() {
  const [secret, setSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [properties, setProperties] = useState([]);
  const [partners, setPartners] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  const [form, setForm] = useState({
    title: '', price: '', description: '', images: '',
    governorate: '1', city: '', 
    type: 'Apartment', listingType: 'Buy', 
    bedrooms: '', bathrooms: '', level: '', area: '',
    videoUrl: '', mapUrl: '', 
    isSold: false, isFeatured: false, isHotDeal: false,
    mortgageMonths: '12, 60, 120', 
    interestRate: '20',
    maxMortgagePercent: '80'
  });

  const [partnerForm, setPartnerForm] = useState({ name: '', logo: '' });
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const checkLogin = () => {
    if (secret === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert('Wrong Password!');
    }
  };

  const fetchData = async () => {
    try {
        const resProp = await fetch(`${API_URL}/api/properties`);
        const dataProp = await resProp.json();
        setProperties(Array.isArray(dataProp) ? dataProp : []);

        const resPart = await fetch(`${API_URL}/api/partners`);
        const dataPart = await resPart.json();
        setPartners(Array.isArray(dataPart) ? dataPart : []);
    } catch (err) {
        console.error("Fetch Error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imagesArray = form.images.split(/[\n,]+/).map(u => u.trim()).filter(u => u);
    const mortgageArray = form.mortgageMonths.toString().split(',').map(m => Number(m.trim()));
    
    // Get Gov Name
    const govName = GOVERNORATES[form.governorate] || form.governorate;
    
    // Get City Name (If empty, default to first city)
    let cityName = form.city;
    if (!cityName && CITIES[form.governorate]) {
        cityName = CITIES[form.governorate][0];
    }

    const payload = { 
        ...form, 
        governorate: govName, 
        city: cityName,
        images: imagesArray, 
        mortgagePlans: mortgageArray,
        interestRate: Number(form.interestRate),
        maxMortgagePercent: Number(form.maxMortgagePercent),
        secret: secret 
    };

    const url = editingId ? `${API_URL}/api/properties/${editingId}` : `${API_URL}/api/properties`;
    const method = editingId ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if(res.ok) {
             setForm({
                title: '', price: '', description: '', images: '',
                governorate: '1', city: '', type: 'Apartment', listingType: 'Buy',
                bedrooms: '', bathrooms: '', level: '', area: '',
                videoUrl: '', mapUrl: '', isSold: false, isFeatured: false, isHotDeal: false,
                mortgageMonths: '12, 60, 120', interestRate: '20', maxMortgagePercent: '80'
            });
            setEditingId(null);
            fetchData();
            alert("Success!");
        } else {
            const errData = await res.json();
            alert("Failed: " + (errData.error || "Check Password"));
        }
    } catch (err) {
        alert("Server Connection Error");
    }
  };

  const deleteProperty = async (id) => {
    if(confirm("Delete?")) {
        await fetch(`${API_URL}/api/properties/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret }) });
        fetchData();
    }
  };

  const startEdit = (p) => {
      setEditingId(p._id);
      // Reverse lookup gov ID to make dropdown work
      const govId = Object.keys(GOVERNORATES).find(key => GOVERNORATES[key] === p.governorate) || '1';
      
      setForm({
          ...p,
          governorate: govId,
          city: p.city,
          images: p.images.join('\n'),
          mortgageMonths: p.mortgagePlans ? p.mortgagePlans.join(', ') : '12, 60',
          interestRate: p.interestRate || '20',
          maxMortgagePercent: p.maxMortgagePercent || '80'
      });
      window.scrollTo(0,0);
  };

  const addPartner = async (e) => {
      e.preventDefault();
      await fetch(`${API_URL}/api/partners`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...partnerForm, secret }) });
      setPartnerForm({ name: '', logo: '' });
      fetchData();
  };

  const deletePartner = async (id) => {
      if(confirm("Delete Partner?")) {
          await fetch(`${API_URL}/api/partners/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret }) });
          fetchData();
      }
  };

  if (!isAuthenticated) return <div className="h-screen flex items-center justify-center bg-gray-100"><div className="p-8 bg-white rounded shadow-md"><h2 className="text-2xl font-bold mb-4 text-blue-900">Admin Login</h2><input type="password" onChange={e=>setSecret(e.target.value)} className="p-3 border rounded w-full mb-4" placeholder="Secret Code"/> <button onClick={checkLogin} className="bg-blue-900 text-white w-full p-3 rounded font-bold">Login</button></div></div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold mb-8 text-blue-900 border-b pb-4">Admin Dashboard</h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="md:col-span-2 flex flex-wrap gap-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-emerald-700"><input type="checkbox" checked={form.isFeatured} onChange={e=>setForm({...form, isFeatured: e.target.checked})} className="w-5 h-5"/> ★ Featured</label>
                <label className="flex items-center gap-2 cursor-pointer text-red-600 font-bold"><input type="checkbox" checked={form.isHotDeal} onChange={e=>setForm({...form, isHotDeal: e.target.checked})} className="w-5 h-5"/> 🔥 Hot Deal</label>
                <label className="flex items-center gap-2 cursor-pointer text-gray-500 font-bold"><input type="checkbox" checked={form.isSold} onChange={e=>setForm({...form, isSold: e.target.checked})} className="w-5 h-5"/> 🚫 Sold Out</label>
            </div>
            <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} className="border p-3 rounded-xl" required />
            <input type="number" placeholder="Price (EGP)" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} className="border p-3 rounded-xl" required />
            
            {/* Location Dropdowns */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1">Governorate</label>
                <select value={form.governorate} onChange={e=>setForm({...form, governorate: e.target.value, city: ''})} className="border p-3 rounded-xl w-full">
                    {Object.entries(GOVERNORATES).map(([id, name]) => <option key={id} value={id}>{name}</option>)}
                </select>
            </div>
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1">City</label>
                <select value={form.city} onChange={e=>setForm({...form, city: e.target.value})} className="border p-3 rounded-xl w-full">
                    <option value="" disabled>Select City</option>
                    {CITIES[form.governorate]?.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <select value={form.listingType} onChange={e=>setForm({...form, listingType: e.target.value})} className="border p-3 rounded-xl bg-blue-50 font-bold text-blue-800"><option value="Buy">For Sale</option><option value="Rent">For Rent</option></select>
            <select value={form.type} onChange={e=>setForm({...form, type: e.target.value})} className="border p-3 rounded-xl"><option value="Apartment">Apartment</option><option value="Villa">Villa</option><option value="Duplex">Duplex</option><option value="Commercial">Commercial</option><option value="Chalet">Chalet</option></select>
            <input type="number" placeholder="Area (m2)" value={form.area} onChange={e=>setForm({...form, area: e.target.value})} className="border p-3 rounded-xl" />
            <div className="grid grid-cols-3 gap-2">
                <input type="number" placeholder="Beds" value={form.bedrooms} onChange={e=>setForm({...form, bedrooms: e.target.value})} className="border p-3 rounded-xl" />
                <input type="number" placeholder="Baths" value={form.bathrooms} onChange={e=>setForm({...form, bathrooms: e.target.value})} className="border p-3 rounded-xl" />
                <input type="number" placeholder="Level" value={form.level} onChange={e=>setForm({...form, level: e.target.value})} className="border p-3 rounded-xl" />
            </div>
            
            <input placeholder="YouTube URL" value={form.videoUrl} onChange={e=>setForm({...form, videoUrl: e.target.value})} className="border p-3 rounded-xl" />
            <input placeholder="Google Map URL" value={form.mapUrl} onChange={e=>setForm({...form, mapUrl: e.target.value})} className="border p-3 rounded-xl" />
            
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div><label className="text-xs font-bold text-gray-500 ml-1">Interest (%)</label><input type="number" value={form.interestRate} onChange={e=>setForm({...form, interestRate: e.target.value})} className="border p-3 rounded-xl w-full" /></div>
                <div><label className="text-xs font-bold text-gray-500 ml-1">Max Financing (%)</label><input type="number" value={form.maxMortgagePercent} onChange={e=>setForm({...form, maxMortgagePercent: e.target.value})} className="border p-3 rounded-xl w-full" /></div>
                <div><label className="text-xs font-bold text-gray-500 ml-1">Plans (Months)</label><input value={form.mortgageMonths} onChange={e=>setForm({...form, mortgageMonths: e.target.value})} className="border p-3 rounded-xl w-full" /></div>
            </div>

            <textarea placeholder="Description" rows="3" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} className="border p-3 rounded-xl md:col-span-2" />
            <textarea placeholder="Image URLs (One per line)" rows="5" value={form.images} onChange={e=>setForm({...form, images: e.target.value})} className="border p-3 rounded-xl md:col-span-2 font-mono text-sm bg-gray-50" required />
            <button type="submit" className="bg-emerald-600 text-white p-4 rounded-xl font-bold md:col-span-2 hover:bg-emerald-700 transition shadow-lg">{editingId ? 'Update Property' : 'Save New Property'}</button>
            {editingId && <button type="button" onClick={() => setEditingId(null)} className="bg-gray-500 text-white p-3 rounded-xl md:col-span-2 font-bold">Cancel Edit</button>}
        </form>

        <div className="mt-12 grid gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Properties</h2>
            {properties.map(p => (
                <div key={p._id} className="flex flex-col md:flex-row justify-between items-center border p-4 rounded-xl hover:shadow-md transition bg-gray-50">
                    <div className="flex items-center gap-4 mb-4 md:mb-0 w-full"><img src={p.images[0]} className="w-16 h-16 rounded object-cover"/><div><span className="font-bold text-lg block">{p.title}</span><span className="text-sm text-gray-500">{parseInt(p.price).toLocaleString()} EGP - {p.city}</span></div></div>
                    <div className="flex gap-2 w-full md:w-auto"><button onClick={() => startEdit(p)} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-bold flex-1">Edit</button><button onClick={() => deleteProperty(p._id)} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold flex-1">Delete</button></div>
                </div>
            ))}
        </div>
        
        {/* PARTNERS */}
        <div className="mt-16 pt-8 border-t-2 border-gray-100">
             <h2 className="text-2xl font-bold mb-6 text-gray-800">Partners</h2>
             <form onSubmit={addPartner} className="flex gap-4 mb-6"><input placeholder="Partner Name" value={partnerForm.name} onChange={e => setPartnerForm({...partnerForm, name: e.target.value})} className="border p-3 rounded-xl flex-1"/><input placeholder="Logo URL" value={partnerForm.logo} onChange={e => setPartnerForm({...partnerForm, logo: e.target.value})} className="border p-3 rounded-xl flex-1"/><button className="bg-purple-600 text-white px-6 rounded-xl font-bold">Add</button></form>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{partners.map(p => (<div key={p._id} className="border p-4 rounded-xl flex justify-between items-center bg-white"><span className="font-bold">{p.name}</span><button onClick={() => deletePartner(p._id)} className="text-red-500 font-bold">✕</button></div>))}</div>
        </div>
      </div>
    </div>
  );
}