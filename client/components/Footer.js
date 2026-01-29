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
              Simple, transparent, and built for the future.
            </p>
        </div>

        <div>
            <h3 className="font-bold mb-4 text-white">Quick Links</h3>
            <div className="flex flex-col gap-3 text-slate-400 text-sm">
                <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
                <Link href="/search" className="hover:text-emerald-400 transition">Browse Properties</Link>
                <Link href="/about" className="hover:text-emerald-400 transition">About Us</Link>
                <Link href="/search?show=favorites" className="hover:text-emerald-400 transition">My Favorites</Link>
            </div>
        </div>

        <div>
            <h3 className="font-bold mb-4 text-white">Contact</h3>
            <div className="flex flex-col gap-3 text-slate-400 text-sm">
                <a href="https://wa.me/201008279766" target="_blank" className="hover:text-emerald-400 transition flex items-center gap-2">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                   01008279766
                </a>
                <a href="mailto:info@egyhomes.eg" className="hover:text-emerald-400 transition flex items-center gap-2">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                   info@egyhomes.eg
                </a>
                
                <div className="flex gap-4 mt-2">
                    <a href="https://facebook.com/share/1DTsE2L6R3/?mibextid=wwXIfr" target="_blank" className="hover:text-blue-400 transition">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="https://instagram.com/egyhomes.eg" target="_blank" className="hover:text-pink-400 transition">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                </div>
            </div>
        </div>

      </div>
      <div className="text-center mt-12 pt-8 border-t border-slate-800 text-slate-600 text-xs">
        © 2026 EgyHomes. All rights reserved.
      </div>
    </footer>
  );
}