'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
  const router = useRouter();
  const [secret, setSecret] = useState('');
  
  // Data
  const [properties, setProperties] = useState([]);
  const [partners, setPartners] = useState([]);
  
  // New Partner Form
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newPartnerLogo, setNewPartnerLogo] = useState('');

  // Editing State
  const [editingId, setEditingId] = useState(null); // ID of property being edited
  const [editForm, setEditForm] = useState({}); // Data for edit

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5001/api/properties').then(res => res.json()).then(setProperties);
    fetch('http://localhost:5001/api/partners').then(res => res.json()).then(setPartners);
  };

  // --- PARTNER FUNCTIONS ---
  const addPartner = async () => {
    if (!secret) return alert("Enter Admin Password first!");
    const res = await fetch('http://localhost:5001/api/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newPartnerName, logo: newPartnerLogo, secret })
    });
    if (res.ok) {
      setNewPartnerName(''); setNewPartnerLogo('');
      fetchData(); // Refresh list
    } else { alert("Failed. Check Password."); }
  };

  const deletePartner = async (id) => {
    if(!window.confirm("Delete Partner?")) return;
    await fetch(`http://localhost:5001/api/partners/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret })
    });
    fetchData();
  };

  // --- PROPERTY FUNCTIONS ---
  const deleteProperty = async (id) => {
    if(!window.confirm("Delete Property?")) return;
    await fetch(`http://localhost:5001/api/properties/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret })
    });
    fetchData();
  };

  const toggleSold = async (property) => {
    if (!secret) return alert("Enter Admin Password first!");
    await fetch(`http://localhost:5001/api/properties/${property._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...property, isSold: !property.isSold, secret })
    });
    fetchData();
  };

  const startEdit = (property) => {
    setEditingId(property._id);
    setEditForm(property);
  };

  const saveEdit = async () => {
    if (!secret) return alert("Enter Admin Password first!");
    await fetch(`http://localhost:5001/api/properties/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editForm, secret })
    });
    setEditingId(null);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Admin Command Center 2.0</h1>
          <button onClick={() => router.push('/add')} className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">
            + List New Property
          </button>
        </div>

        {/* PASSWORD BAR */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-red-100 flex items-center gap-4">
          <label className="font-bold text-red-600">🔑 Admin Password:</label>
          <input 
            type="password" value={secret} onChange={e => setSecret(e.target.value)}
            className="border p-2 rounded w-64 text-black" placeholder="Enter strictly..."
          />
        </div>

        {/* --- PARTNERS MANAGER --- */}
        <div className="mb-12 bg-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h2 className="text-xl font-bold mb-4 text-slate-700">Manage Verified Partners</h2>
          <div className="flex gap-4 mb-4">
            <input 
              placeholder="Partner Name (e.g. Palm Hills)" 
              value={newPartnerName} onChange={e => setNewPartnerName(e.target.value)}
              className="border p-2 rounded text-black"
            />
            <input 
              placeholder="Logo URL" 
              value={newPartnerLogo} onChange={e => setNewPartnerLogo(e.target.value)}
              className="border p-2 rounded w-64 text-black"
            />
            <button onClick={addPartner} className="bg-green-600 text-white px-4 rounded font-bold">Add</button>
          </div>

          <div className="flex flex-wrap gap-4">
            {partners.map(p => (
              <div key={p._id} className="flex items-center gap-2 bg-slate-100 p-2 rounded border">
                <img src={p.logo} className="w-8 h-8 object-contain" />
                <span className="font-bold text-sm text-slate-700">{p.name}</span>
                <button onClick={() => deletePartner(p._id)} className="text-red-500 font-bold hover:text-red-700">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* --- PROPERTIES LIST --- */}
        <h2 className="text-xl font-bold mb-4 text-slate-700">Property Management</h2>
        <div className="grid gap-4">
          {properties.map((property) => (
            <div key={property._id} className={`bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row items-center gap-6 ${property.isSold ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
              
              {/* IMAGE & STATUS */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <img src={property.images[0] || property.image} className="w-full h-full object-cover rounded" />
                {property.isSold && <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center text-white font-bold text-xs">SOLD</div>}
              </div>

              {/* INFO OR EDIT FORM */}
              <div className="flex-grow">
                {editingId === property._id ? (
                  // EDIT MODE
                  <div className="grid gap-2">
                    <input className="border p-1 rounded text-black" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                    <input className="border p-1 rounded text-black" type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} />
                    <div className="flex gap-2">
                      <button onClick={saveEdit} className="bg-green-500 text-white px-3 py-1 rounded text-sm">Save</button>
                      <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-3 py-1 rounded text-sm">Cancel</button>
                    </div>
                  </div>
                ) : (
                  // VIEW MODE
                  <>
                    <h3 className="font-bold text-lg text-slate-800">{property.title}</h3>
                    <p className="text-green-600 font-bold">{property.price.toLocaleString()} EGP</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>👁️ {property.views} Views</span>
                      <span>🆔 {property._id}</span>
                    </div>
                  </>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-2 min-w-[140px]">
                <button 
                  onClick={() => toggleSold(property)}
                  className={`px-4 py-1 rounded font-bold text-sm ${property.isSold ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}
                >
                  {property.isSold ? 'Mark Available' : 'Mark as Sold'}
                </button>
                
                <button 
                  onClick={() => startEdit(property)}
                  className="bg-blue-100 text-blue-600 px-4 py-1 rounded font-bold text-sm hover:bg-blue-200"
                >
                  Edit Details
                </button>

                <button 
                  onClick={() => deleteProperty(property._id)}
                  className="bg-red-100 text-red-600 px-4 py-1 rounded font-bold text-sm hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}