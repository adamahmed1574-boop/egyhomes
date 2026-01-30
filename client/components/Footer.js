'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div>
            <h2 className="text-2xl font-black mb-4 tracking-tight">Egy<span className="text-emerald-500">Homes</span></h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              The modern way to buy, sell, and rent properties in Egypt.
            </p>
        </div>

        <div>
            <h3 className="font-bold mb-4 text-white">Quick Links</h3>
            <div className="flex flex-col gap-3 text-slate-400 text-sm">
                <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
                <Link href="/search" className="hover:text-emerald-400 transition">Browse Properties</Link>
                <Link href="/about" className="hover:text-emerald-400 transition">About Us</Link>
            </div>
        </div>

        <div>
            <h3 className="font-bold mb-4 text-white">Contact</h3>
            <div className="flex flex-col gap-3 text-slate-400 text-sm">
                <a href="https://wa.me/201008279766" target="_blank" className="hover:text-emerald-400 transition flex items-center gap-2">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1 3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.5.3 1 .4 1.5.1.5 0 1-.4 1.4l-2.2 2.2c1.3 2.5 3.4 4.6 5.9 5.9l2.2-2.2c.4-.4 1-.5 1.4-.4.5.2 1 .3 1.5.4a2 2 0 0 1 1.7 2z"/></svg>
                   01008279766
                </a>
                <a href="mailto:egyhomes1@hotmail.com" className="hover:text-emerald-400 transition flex items-center gap-2">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                   egyhomes1@hotmail.com
                </a>
            </div>
        </div>
      </div>
      <div className="text-center mt-12 pt-8 border-t border-slate-800 text-slate-600 text-xs">
        © 2026 EgyHomes. All rights reserved.
      </div>
    </footer>
  );
}