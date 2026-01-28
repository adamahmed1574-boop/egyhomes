'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  return (
    <footer className="bg-slate-900 text-white py-16 rounded-t-[3rem] mt-20">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <div>
            <h2 className="text-3xl font-black mb-4">Egy<span className="text-emerald-400">Homes</span></h2>
            <p className="text-slate-400">The future of real estate in Egypt. Simple, Transparent, Advanced.</p>
        </div>

        <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2 text-slate-400">
                <Link href="/about" className="hover:text-white">About Us</Link>
                <Link href="/search?show=favorites" className="hover:text-white">❤️ My Favorites</Link>
                <Link href="/admin" className="hover:text-white text-xs opacity-50">Admin Access</Link>
            </div>
        </div>

        <div>
            <h3 className="font-bold mb-4">Quick Search</h3>
            <div className="flex gap-2">
                <input 
                    placeholder="City or Area..." 
                    className="bg-slate-800 border-none rounded-lg p-3 text-white flex-grow"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={() => router.push(`/search?q=${query}`)} className="bg-emerald-600 p-3 rounded-lg font-bold">Go</button>
            </div>
        </div>

      </div>
      <div className="text-center mt-12 text-slate-600 text-sm">© 2026 EgyHomes. All rights reserved.</div>
    </footer>
  );
}