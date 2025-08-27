import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  weight: ['800'],
  subsets: ['latin'],
  display: 'swap', 
});

export default function NotFound() {
  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen text-gray-800 p-4 sm:p-6 bg-blue-200 overflow-hidden ${orbitron.className}`}>
      <div className="absolute top-0 left-4 w-200 h-100 bg-sky-300  rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob"></div>
      <div className="absolute top-0 right-8 w-100 h-100 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-150 w-200 h-100 bg-sky-300 rounded-full  mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute -bottom-8 left-5 w-100 h-100 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-2000"></div>


      <main className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-4xl">
        <div className="flex-shrink-0">
          <img 
            src="/images/logo.png" 
            alt="Illustration for a lost page"
            className="w-48 h-auto md:w-64"
          />
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-7xl md:text-9xl font-black text-blue-600 mb-2">
            404
          </h1>
          <h2 className="text-2xl md:text-2xl font-bold tracking-wider text-blue-800 mb-3 uppercase">
            Got Lost?
          </h2>
          <p className="text-xl md:text-2xl text-blue-500 mb-8 max-w-sm font-light">
            No worries. Join IEEE DTU today.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-md font-bold text-gray-800 tracking-wider group"
          >
            HOME
            <ArrowRight className="w-5 h-5 transition-transform transform group-hover:translate-x-2" />
          </a>
        </div>
      </main>
    </div>
  );
}
