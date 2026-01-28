'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    // تحميل اللغة المحفوظة عند فتح الموقع
    const saved = localStorage.getItem('lang');
    if (saved) setLang(saved);
  }, []);

  const toggleLang = () => {
    // التبديل بين العربي والإنجليزي
    const newLang = lang === 'EN' ? 'AR' : 'EN';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    // عمل تحديث للصفحة لتطبيق التغيير (طريقة بسيطة حالياً)
    window.location.reload();
  };

  return (
    <nav className="bg-blue-900 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* الشعار - Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Egy<span className="text-yellow-400">Homes</span>
        </Link>
        
        {/* الروابط والأزرار */}
        <div className="flex gap-4 md:gap-6 items-center">
          <Link href="/search" className="hover:text-yellow-400 font-medium transition">Search</Link>
          <Link href="/about" className="hover:text-yellow-400 font-medium transition">About</Link>
          
          {/* رابط الأدمن (مخفي وصغير) */}
          <Link href="/admin" className="hover:text-yellow-400 text-xs text-blue-300 hidden md:block">Admin</Link>
          
          {/* زر تغيير اللغة */}
          <button 
            onClick={toggleLang} 
            className="border border-white/30 bg-blue-800/50 px-3 py-1 rounded text-xs font-bold hover:bg-white hover:text-blue-900 transition flex items-center gap-2"
          >
             {lang === 'EN' ? '🇪🇬 AR' : '🇺🇸 EN'}
          </button>
        </div>
      </div>
    </nav>
  );
}