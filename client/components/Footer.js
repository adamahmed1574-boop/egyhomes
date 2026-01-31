'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div><h2 className="text-2xl font-black mb-4">Egy<span className="text-emerald-500">Homes</span></h2><p className="text-slate-400 text-sm">The modern way to buy, sell, and rent properties in Egypt.</p></div>
        <div><h3 className="font-bold mb-4">Quick Links</h3><div className="flex flex-col gap-3 text-slate-400 text-sm"><Link href="/" className="hover:text-emerald-400">Home</Link><Link href="/search" className="hover:text-emerald-400">Browse Properties</Link><Link href="/about" className="hover:text-emerald-400">About Us</Link></div></div>
        <div><h3 className="font-bold mb-4">Contact</h3><div className="flex flex-col gap-3 text-slate-400 text-sm"><a href="https://wa.me/201008279766" className="hover:text-emerald-400">01008279766</a><a href="mailto:egyhomes1@hotmail.com" className="hover:text-emerald-400">egyhomes1@hotmail.com</a></div></div>
      </div>
      <div className="text-center mt-12 pt-8 border-t border-slate-800 text-slate-600 text-xs">© 2026 EgyHomes. All rights reserved.</div>
    </footer>
  );
}