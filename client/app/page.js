'use client';
import { useState, useEffect, useMemo, memo } from 'react';
import Link from 'next/link';

// --- DATA: ALL 27 GOVERNORATES & CITIES ---
const EGYPT_LOCATIONS = {
  "All": [],
  "Cairo": ["15 May", "Al Azbakeyah", "Al Basatin", "Tebin", "El-Khalifa", "El darrasa", "Aldarb Alahmar", "Zawya al-Hamra", "El-Zaytoun", "Sahel", "El Salam", "Sayeda Zeinab", "El Sharabeya", "Shorouk", "El Daher", "Ataba", "New Cairo", "El Marg", "Ezbet el Nakhl", "Matareya", "Maadi", "Maasara", "Mokattam", "Manyal", "Mosky", "Nozha", "Waily", "Bab al-Shereia", "Bolaq", "Garden City", "Hadayek El-Kobba", "Helwan", "Dar Al Salam", "Shubra", "Tura", "Abdeen", "Abaseya", "Ain Shams", "Nasr City", "New Heliopolis", "Masr Al Qadima", "Mansheya Nasir", "Badr City", "Obour City", "Cairo Downtown", "Zamalek", "Kasr El Nile", "Rehab", "Katameya", "Madinty", "Rod Alfarag", "Sheraton", "El-Gamaleya", "10th of Ramadan City", "Helmeyat Alzaytoun", "New Nozha", "Capital New"],
  "Giza": ["Giza", "Sixth of October", "Cheikh Zayed", "Hawamdiyah", "Al Badrasheen", "Saf", "Atfih", "Al Ayat", "Al-Bawaiti", "ManshiyetAl Qanater", "Oaseem", "Kerdasa", "Abu Nomros", "Kafr Ghati", "Manshiyet Al Bakari", "Dokki", "Agouza", "Haram", "Warraq", "Imbaba", "Boulaq Dakrour", "Al Wahat Al Baharia", "Omraneya", "Moneeb", "Bin Alsarayat", "Kit Kat", "Mohandessin", "Faisal", "Abu Rawash", "Hadayek Alahram", "Haraneya", "Hadayek October", "Saft Allaban", "Smart Village", "Ard Ellwaa"],
  "Alexandria": ["Abu Qir", "Al Ibrahimeyah", "Azarita", "Anfoushi", "Dekheila", "El Soyof", "Ameria", "El Labban", "Al Mafrouza", "El Montaza", "Mansheya", "Naseria", "Ambrozo", "Bab Sharq", "Bourj Alarab", "Stanley", "Smouha", "Sidi Bishr", "Shads", "Gheet Alenab", "Fleming", "Victoria", "Camp Shizar", "Karmooz", "Mahta Alraml", "Mina El-Basal", "Asafra", "Agamy", "Bakos", "Boulkly", "Cleopatra", "Glim", "Al Mamurah", "Al Mandara", "Moharam Bek", "Elshatby", "Sidi Gaber", "North Coast/sahel", "Alhadra", "Alattarin", "Sidi Kerir", "Elgomrok", "Al Max", "Marina"],
  "Dakahlia": ["Mansoura", "Talkha", "Mitt Ghamr", "Dekernes", "Aga", "Menia El Nasr", "Sinbillawin", "El Kurdi", "Bani Ubaid", "Al Manzala", "tami al'amdid", "aljamalia", "Sherbin", "Mataria", "Belqas", "Meet Salsil", "Gamasa", "Mahalat Damana", "Nabroh"],
  "Red Sea": ["Hurghada", "Ras Ghareb", "Safaga", "El Qusiar", "Marsa Alam", "Shalatin", "Halaib", "Aldahar"],
  "Beheira": ["Damanhour", "Kafr El Dawar", "Rashid", "Edco", "Abu al-Matamir", "Abu Homs", "Delengat", "Mahmoudiyah", "Rahmaniyah", "Itai Baroud", "Housh Eissa", "Shubrakhit", "Kom Hamada", "Badr", "Wadi Natrun", "New Nubaria", "Alnoubareya"],
  "Fayoum": ["Fayoum", "Fayoum El Gedida", "Tamiya", "Snores", "Etsa", "Epschway", "Yusuf El Sediaq", "Hadqa", "Atsa", "Algamaa", "Sayala"],
  "Gharbia": ["Tanta", "Al Mahalla Al Kobra", "Kafr El Zayat", "Zefta", "El Santa", "Qutour", "Basion", "Samannoud"],
  "Ismailia": ["Ismailia", "Fayed", "Qantara Sharq", "Qantara Gharb", "El Tal El Kabier", "Abu Sawir", "Kasasien El Gedida", "Nefesha", "Sheikh Zayed"],
  "Monufia": ["Shbeen El Koom", "Sadat City", "Menouf", "Sars El-Layan", "Ashmon", "Al Bagor", "Quesna", "Berkat El Saba", "Tala", "Al Shohada"],
  "Minya": ["Minya", "Minya El Gedida", "El Adwa", "Magagha", "Bani Mazar", "Mattay", "Samalut", "Madinat El Fekria", "Meloy", "Deir Mawas", "Abu Qurqas", "Ard Sultan"],
  "Qalyubia": ["Banha", "Qalyub", "Shubra Al Khaimah", "Al Qanater Charity", "Khanka", "Kafr Shukr", "Tukh", "Qaha", "Obour", "Khosous", "Shibin Al Qanater", "Mostorod"],
  "New Valley": ["El Kharga", "Paris", "Mout", "Farafra", "Balat", "Dakhla"],
  "Suez": ["Suez", "Alganayen", "Ataqah", "Ain Sokhna", "Faysal"],
  "Aswan": ["Aswan", "Aswan El Gedida", "Drau", "Kom Ombo", "Nasr Al Nuba", "Kalabsha", "Edfu", "Al-Radisiyah", "Al Basilia", "Al Sibaeia", "Abo Simbl Al Siyahia", "Marsa Alam"],
  "Assiut": ["Assiut", "Assiut El Gedida", "Dayrout", "Manfalut", "Qusiya", "Abnoub", "Abu Tig", "El Ghanaim", "Sahel Selim", "El Badari", "Sidfa"],
  "Beni Suef": ["Bani Sweif", "Beni Suef El Gedida", "Al Wasta", "Naser", "Ehnasia", "beba", "Fashn", "Somasta", "Alabbaseri", "Mokbel"],
  "Port Said": ["PorSaid", "Port Fouad", "Alarab", "Zohour", "Alsharq", "Aldawahi", "Almanakh", "Mubarak"],
  "Damietta": ["Damietta", "New Damietta", "Ras El Bar", "Faraskour", "Zarqa", "alsaru", "alruwda", "Kafr El-Batikh", "Azbet Al Burg", "Meet Abou Ghalib", "Kafr Saad"],
  "Sharkia": ["Zagazig", "Al Ashr Men Ramadan", "Minya Al Qamh", "Belbeis", "Mashtoul El Souq", "Qenaiat", "Abu Hammad", "El Qurain", "Hehia", "Abu Kabir", "Faccus", "El Salihia El Gedida", "Al Ibrahimiyah", "Deirb Negm", "Kafr Saqr", "Awlad Saqr", "Husseiniya", "san alhajar alqablia", "Manshayat Abu Omar"],
  "South Sinai": ["Al Toor", "Sharm El-Shaikh", "Dahab", "Nuweiba", "Taba", "Saint Catherine", "Abu Redis", "Abu Zenaima", "Ras Sidr"],
  "Kafr El Sheikh": ["Kafr El Sheikh", "Kafr El Sheikh Downtown", "Desouq", "Fooh", "Metobas", "Burg Al Burullus", "Baltim", "Masief Baltim", "Hamol", "Bella", "Riyadh", "Sidi Salm", "Qellen", "Sidi Ghazi"],
  "Matrouh": ["Marsa Matrouh", "El Hamam", "Alamein", "Dabaa", "Al-Nagila", "Sidi Brani", "Salloum", "Siwa", "Marina", "North Coast"],
  "Luxor": ["Luxor", "New Luxor", "Esna", "New Tiba", "Al ziynia", "Al Bayadieh", "Al Qarna", "Armant", "Al Tud"],
  "Qena": ["Qena", "New Qena", "Abu Tesht", "Nag Hammadi", "Deshna", "Alwaqf", "Qaft", "Naqada", "Farshout", "Quos"],
  "North Sinai": ["Arish", "Sheikh Zowaid", "Nakhl", "Rafah", "Bir al-Abed", "Al Hasana"],
  "Sohag": ["Sohag", "Sohag El Gedida", "Akhmeem", "Akhmim El Gedida", "Albalina", "El Maragha", "almunsha'a", "Dar AISalaam", "Gerga", "Jahina Al Gharbia", "Saqilatuh", "Tama", "Tahta", "Alkawthar"]
};

// --- OPTIMIZED COMPONENT: MEMOIZED CARD ---
const PropertyCard = memo(function PropertyCard({ property, onOpen, isDark, toggleFavorite, isFavorite }) {
  const [currentImg, setCurrentImg] = useState(0);
  const images = property.images && property.images.length > 0 ? property.images : [property.image || 'https://via.placeholder.com/400'];

  const nextImg = (e) => { e.stopPropagation(); setCurrentImg((prev) => (prev + 1) % images.length); };
  const prevImg = (e) => { e.stopPropagation(); setCurrentImg((prev) => (prev - 1 + images.length) % images.length); };

  const handleClick = () => {
    // Send view count asynchronously (doesn't block UI)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${property._id}/view`, { method: 'POST', keepalive: true }).catch(() => {});
    onOpen(property);
  };

  return (
    <div 
      className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col relative group/card
      ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 border'}`}
      style={{ contentVisibility: 'auto' }} // Modern CSS Optimization
      onClick={handleClick}
    >
      <div className="h-64 relative bg-gray-200">
        <img 
          src={images[currentImg]} 
          alt={property.title} 
          loading="lazy" // OPTIMIZATION: Lazy Load
          decoding="async" // OPTIMIZATION: Non-blocking decode
          className="w-full h-full object-cover" 
        />
        
        {property.isSold && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-10">
                <span className="text-white font-black text-3xl border-4 border-white px-6 py-2 -rotate-12 uppercase tracking-widest">SOLD</span>
            </div>
        )}

        {images.length > 1 && !property.isSold && (
          <>
            <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover/card:opacity-100 transition hover:bg-black/70 z-20">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover/card:opacity-100 transition hover:bg-black/70 z-20">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
              {images.map((_, idx) => <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImg ? 'bg-white scale-125' : 'bg-white/50'}`}></div>)}
            </div>
          </>
        )}

        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(property._id); }} className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm transition active:scale-90 z-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "#ef4444" : "none"} stroke={isFavorite ? "#ef4444" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>

        <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-20">
          {property.isSold ? 'Unavailable' : 'For Sale'}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h2 className={`text-lg font-bold mb-1 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{property.title}</h2>
        <p className={`text-sm mb-4 flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {property.location}, {property.governorate}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-200/20">
          <span className="text-xs uppercase text-gray-400 font-bold block mb-1">Price</span>
          <span className={`text-2xl font-bold leading-none ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
            {property.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">EGP</span>
          </span>
        </div>
      </div>
    </div>
  );
});

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  // Search States
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(''); // NEW: For Performance
  
  const [filterGov, setFilterGov] = useState('All');
  const [filterCity, setFilterCity] = useState('All');
  const [priceMax, setPriceMax] = useState(50000000); 
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showMortgage, setShowMortgage] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`)
      .then(res => res.json())
      .then(data => { setProperties(data); setLoading(false); })
      .catch(err => console.log('API Error:', err));
    
    setFavorites(JSON.parse(localStorage.getItem('egyhomes_favs')) || []);
  }, []);

  // OPTIMIZATION: Debounce Search Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // Wait 300ms after user stops typing
    return () => clearTimeout(timer);
  }, [search]);

  const toggleFavorite = (id) => {
    const newFavs = favorites.includes(id) ? favorites.filter(favId => favId !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('egyhomes_favs', JSON.stringify(newFavs));
  };

  // OPTIMIZATION: Memoize Filter Logic
  const filteredProps = useMemo(() => {
    return properties.filter(prop => {
      const matchesSearch = prop.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) || prop.location?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesGov = filterGov === 'All' || prop.governorate === filterGov;
      const matchesCity = filterCity === 'All' || (prop.location && prop.location.includes(filterCity));
      const matchesPrice = prop.price <= priceMax;
      return matchesSearch && matchesGov && matchesCity && matchesPrice;
    });
  }, [properties, debouncedSearch, filterGov, filterCity, priceMax]); // Only re-run when these change

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* HEADER */}
      <div className={`${isDark ? 'bg-slate-950' : 'bg-blue-900'} text-white py-4 px-6 shadow-md sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
            EgyHomes<span className="text-blue-400">.eg</span>
            <button onClick={() => setIsDark(!isDark)} className="ml-4 bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
          </div>
          <div className="flex gap-4 items-center">
             <Link href="/about" className="text-white/80 hover:text-white font-bold transition">About Us</Link>
             <a href="https://wa.me/201008279766" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-bold text-sm transition flex items-center gap-2">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
               01008279766
             </a>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b py-8 px-6 shadow-sm`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Find Your Dream Home</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input type="text" placeholder="Search..." className={`w-full p-3 pl-10 rounded border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-300'}`} value={search} onChange={(e) => setSearch(e.target.value)} />
              <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
            </div>
            <select className={`p-3 rounded border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-300'}`} value={filterGov} onChange={(e) => { setFilterGov(e.target.value); setFilterCity('All'); }}>
              <option value="All">All Governorates</option>
              {Object.keys(EGYPT_LOCATIONS).filter(k => k !== 'All').map(gov => <option key={gov} value={gov}>{gov}</option>)}
            </select>
            <select className={`p-3 rounded border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-300'}`} value={filterCity} onChange={(e) => setFilterCity(e.target.value)} disabled={filterGov === 'All'}>
              <option value="All">All Cities</option>
              {filterGov !== 'All' && EGYPT_LOCATIONS[filterGov].map(city => <option key={city} value={city}>{city}</option>)}
            </select>
            <div className="flex flex-col justify-center px-2">
               <div className="flex justify-between text-xs mb-1 opacity-70"><span>Max Price</span><span>{priceMax.toLocaleString()} EGP</span></div>
               <input type="range" min="500000" max="50000000" step="500000" value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full cursor-pointer accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none"/>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[1,2,3].map(i => <div key={i} className={`h-96 rounded-xl animate-pulse ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}></div>)}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProps.map(prop => <PropertyCard key={prop._id} property={prop} onOpen={setSelectedProperty} isDark={isDark} toggleFavorite={toggleFavorite} isFavorite={favorites.includes(prop._id)}/>)}
            {filteredProps.length === 0 && <div className="col-span-full py-20 text-center opacity-50"><p className="text-xl">No properties found matching your search.</p></div>}
          </div>
        )}
        
        <div className={`mt-16 p-10 rounded-3xl text-center shadow-inner ${isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-100'}`}>
          <h2 className="text-2xl font-bold mb-3">Do you own a property?</h2>
          <p className="opacity-70 mb-8 max-w-xl mx-auto">Join hundreds of owners who trust EgyHomes.</p>
          <a href="https://wa.me/201008279766?text=Hello, I would like to list my property." target="_blank" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold shadow-lg transition transform hover:-translate-y-1">
            List Your Property Now <span>→</span>
          </a>
        </div>
      </main>

      {/* MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex justify-center items-center p-4 backdrop-blur-sm" onClick={() => setSelectedProperty(null)}>
          <div className={`max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-2xl relative shadow-2xl ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProperty(null)} className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full transition">✕</button>
            <div className="flex flex-col md:flex-row h-full">
               <div className="md:w-3/5 bg-black relative flex items-center justify-center min-h-[400px]">
                  <img src={(selectedProperty.images && selectedProperty.images.length > 0) ? selectedProperty.images[0] : selectedProperty.image} className="max-h-[60vh] md:max-h-full max-w-full object-contain" alt="Main"/>
                  {selectedProperty.isSold && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="text-white border-4 border-white px-8 py-2 text-4xl font-black -rotate-12 uppercase tracking-widest">SOLD</span></div>}
               </div>
               <div className="md:w-2/5 p-8 flex flex-col h-full overflow-y-auto">
                 <div className="mb-6">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">For Sale</span>
                    <h2 className="text-3xl font-bold mt-3 mb-2 leading-tight">{selectedProperty.title}</h2>
                    <p className="text-lg opacity-60 flex items-center gap-1">📍 {selectedProperty.location}, {selectedProperty.governorate}</p>
                 </div>
                 <div className="mb-6 pb-6 border-b border-gray-200/50">
                    <p className="text-3xl font-bold text-blue-600">{selectedProperty.price.toLocaleString()} <span className="text-lg text-gray-400 font-normal">EGP</span></p>
                 </div>
                 <div className="prose prose-sm opacity-80 mb-8 flex-grow">
                    <p className="whitespace-pre-line leading-relaxed">{selectedProperty.description}</p>
                 </div>
                 <div className="mt-auto space-y-3">
                    <a href={`https://wa.me/201008279766?text=Interested in ${selectedProperty.title}`} target="_blank" className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-xl font-bold transition flex justify-center items-center gap-2 shadow-lg">WhatsApp Inquiry</a>
                    <button onClick={() => setShowMortgage(!showMortgage)} className={`block w-full text-center py-3 rounded-xl font-bold transition border ${isDark ? 'border-slate-700 hover:bg-slate-800' : 'border-gray-200 hover:bg-gray-50'}`}>🧮 Mortgage Calculator</button>
                 </div>
                 {showMortgage && <div className={`mt-4 p-4 rounded-xl animate-fade-in ${isDark ? 'bg-slate-800' : 'bg-blue-50'}`}><p className="text-2xl font-bold text-blue-600">{Math.round((selectedProperty.price * 0.8) / 120).toLocaleString()} <span className="text-sm text-gray-500">EGP / mo</span></p></div>}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}