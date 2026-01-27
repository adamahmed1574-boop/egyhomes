'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function AddProperty() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '', price: '', description: '', secret: '',
    governorate: 'Cairo', city: 'New Cairo',
    image1: '', image2: '', image3: '' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imagesArray = [formData.image1, formData.image2, formData.image3].filter(img => img.length > 0);
    if (imagesArray.length === 0) imagesArray.push('https://via.placeholder.com/400');

    const dataToSend = {
      title: formData.title,
      price: formData.price,
      description: formData.description,
      governorate: formData.governorate,
      location: formData.city,
      images: imagesArray,
      secret: formData.secret
    };

    try {
      const res = await fetch('http://localhost:5001/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        alert('Property Added Successfully!');
        router.push('/'); 
      } else {
        const errorData = await res.json();
        alert('Error: ' + errorData.error);
      }
    } catch (err) {
      alert('Server Connection Error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-6 font-sans">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">List New Property</h1>

        <div className="mb-6 bg-red-50 p-4 rounded border border-red-200">
          <label className="block text-red-600 font-bold mb-2 text-sm">Admin Password</label>
          <input type="password" name="secret" onChange={handleChange} required className="w-full p-2 border rounded text-black"/>
        </div>

        {/* --- LOCATION SELECTORS --- */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-slate-700 font-bold mb-1 text-sm">Governorate</label>
            <select name="governorate" onChange={handleChange} className="w-full p-3 border rounded text-black">
              {Object.keys(EGYPT_LOCATIONS).filter(k => k !== 'All').map(gov => <option key={gov} value={gov}>{gov}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-1 text-sm">City / Area</label>
            <select name="city" onChange={handleChange} className="w-full p-3 border rounded text-black">
              {(EGYPT_LOCATIONS[formData.governorate] || []).map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-slate-700 font-bold mb-1 text-sm">Title</label>
          <input type="text" name="title" onChange={handleChange} required className="w-full p-3 border rounded text-black" placeholder="e.g. Luxury Apartment"/>
        </div>

        <div className="mb-4">
          <label className="block text-slate-700 font-bold mb-1 text-sm">Price (EGP)</label>
          <input type="number" name="price" onChange={handleChange} required className="w-full p-3 border rounded text-black"/>
        </div>

        <div className="mb-4 p-4 bg-blue-50 rounded border border-blue-100">
          <label className="block text-blue-800 font-bold mb-2 text-sm">Property Images (Paste URLs)</label>
          <input type="text" name="image1" onChange={handleChange} className="w-full p-2 mb-2 border rounded text-black" placeholder="Main Image URL..."/>
          <input type="text" name="image2" onChange={handleChange} className="w-full p-2 mb-2 border rounded text-black" placeholder="Second Image URL..."/>
          <input type="text" name="image3" onChange={handleChange} className="w-full p-2 border rounded text-black" placeholder="Third Image URL..."/>
        </div>

        <div className="mb-4">
          <label className="block text-slate-700 font-bold mb-1 text-sm">Description</label>
          <textarea name="description" onChange={handleChange} className="w-full p-3 border rounded text-black h-24"></textarea>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">List Property</button>
      </form>
    </div>
  );
}