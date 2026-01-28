import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-blue-900 py-16 px-8 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">About Egy Homes</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">Building the future of real estate in Egypt, one home at a time.</p>
        </div>

        <div className="p-10 md:p-16 text-gray-700 leading-relaxed text-xl space-y-8">
          <p className="font-medium text-blue-900 italic text-2xl border-l-4 border-yellow-500 pl-6">
            Transforming the Real Estate Experience.
          </p>
          <p>
            Egy Homes is a modern real estate startup founded in 2025 by two passionate entrepreneurs with a clear vision: to make buying and selling properties easier, faster, and more advanced.
          </p>
          <p>
            We aim to simplify the real estate process by combining smart marketing with modern technology, especially through our website, to connect property owners with serious buyers smoothly and transparently.
          </p>
          <p className="font-bold text-gray-900 pt-4">
            At Egy Homes, we believe real estate should be simple, accessible, and built for the future.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-10 border-t border-gray-100">
             <div className="text-center">
                <div className="text-4xl mb-3">🚀</div>
                <h4 className="font-bold text-blue-900">Faster</h4>
                <p className="text-sm text-gray-500">Instant connections.</p>
             </div>
             <div className="text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h4 className="font-bold text-blue-900">Transparent</h4>
                <p className="text-sm text-gray-500">Zero hidden fees.</p>
             </div>
             <div className="text-center">
                <div className="text-4xl mb-3">💎</div>
                <h4 className="font-bold text-blue-900">Advanced</h4>
                <p className="text-sm text-gray-500">Tech-driven search.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}