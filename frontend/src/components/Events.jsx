import React, { useState } from 'react';

export default function Events() {

  return (
    <>
                <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
          `}</style>


    <div className="min-h-screen bg-[#111827] text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="container mx-auto px-4 py-16">
 
        <header className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-400 tracking-widest mb-2">
            FUN & ACTIVITIES
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            OUR EVENTS
          </h1>
          <p className="text-sm font-semibold text-blue-400 tracking-wider">
            SOME OF THE EVENTS CONDUCTED BY IEEE DTU THROUGHOUT THE YEAR
          </p>
        </header>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          </div>
        </main>
        
      </div>
    </div>
    </>
  );
}
