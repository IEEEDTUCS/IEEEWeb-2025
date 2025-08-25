import React from 'react';
import { AlertTriangle } from 'lucide-react'; 

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#111827] text-white">
      <div className="text-center p-8 flex flex-col items-center">
        <AlertTriangle className="w-24 h-24 text-blue-700 mb-6" />

        <h1 className="text-7xl md:text-8xl font-bold text-blue-700 mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-2">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-400 mb-8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <a 
          href="/" 
          className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-800 rounded-lg shadow-lg hover:bg-blue-900 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
