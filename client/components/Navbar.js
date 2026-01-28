'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved) setLang(saved);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'EN' ? 'AR' : 'EN';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    window.location.reload(); 
  };

  return (
    <nav className="bg-blue-900 text-white p-5 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-black italic tracking-tighter">
          Egy<span className="text-yellow-400">Homes</span>
        </Link>
        
        <div className="flex gap-8 items-center font-bold">
          <Link href="/search" className="hover:text-yellow-400 transition hidden md:block">Search</Link>
          <Link href="/about" className="hover:text-yellow-400 transition hidden md:block">About</Link>
          <Link href="/admin" className="text-blue-300 text-xs hover:text-white transition">Admin</Link>
          
          <button 
            onClick={toggleLang} 
            className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm font-bold hover:bg-yellow-400 hover:text-blue-900 transition flex items-center gap-2"
          >
             {lang === 'EN' ? '🇪🇬 بالعربي' : '🇺🇸 English'}
          </button>
        </div>
      </div>
    </nav>
  );
}