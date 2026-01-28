'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 mt-auto border-t-4 border-yellow-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
        
        {/* اللوجو */}
        <h2 className="text-3xl font-bold mb-4">
          Egy<span className="text-yellow-400">Homes</span>
        </h2>
        
        {/* الروابط السريعة */}
        <div className="flex gap-6 mb-6 font-medium text-blue-100">
          <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link href="/search" className="hover:text-yellow-400 transition">Search</Link>
          <Link href="/about" className="hover:text-yellow-400 transition">About Us</Link>
        </div>
        
        {/* الحقوق */}
        <p className="text-gray-400 text-sm">
          © 2026 EgyHomes. Made with ❤️ in Egypt.
        </p>
      </div>
    </footer>
  );
}
