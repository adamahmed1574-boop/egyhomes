'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [lang, setLang] = useState('EN');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load saved preferences
    setLang(localStorage.getItem('lang') || 'EN');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'EN' ? 'AR' : 'EN';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    window.location.reload();
  };

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // Translations
  const t = lang === 'EN' ? {
    search: "Search", about: "About Us", admin: "Admin", list: "List Property"
  } : {
    search: "بحث", about: "من نحن", admin: "أدمن", list: "أضف عقارك"
  };

  return (
    <nav className="bg-white/80 dark:bg-zinc-900/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
          <span className="text-3xl">🏠</span> Egy<span className="text-slate-800 dark:text-white">Homes</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm">
          <Link href="/search" className="hover:text-emerald-500 transition text-slate-600 dark:text-slate-300">{t.search}</Link>
          <Link href="/about" className="hover:text-emerald-500 transition text-slate-600 dark:text-slate-300">{t.about}</Link>
          <Link href="/admin" className="text-gray-400 hover:text-emerald-500 transition text-xs">{t.admin}</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition text-xl">
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Lang Toggle */}
          <button onClick={toggleLang} className="border-2 border-gray-200 dark:border-zinc-700 px-3 py-1 rounded-full text-xs font-bold hover:border-emerald-500 transition text-slate-700 dark:text-slate-300">
            {lang === 'EN' ? '🇪🇬 AR' : '🇺🇸 EN'}
          </button>

          {/* List Property Button */}
          <a 
            href="https://wa.me/201008279766?text=I want to list my property" 
            target="_blank"
            className="hidden sm:block bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full font-bold text-sm transition shadow-lg shadow-emerald-500/30"
          >
            {t.list}
          </a>
        </div>
      </div>
    </nav>
  );
}