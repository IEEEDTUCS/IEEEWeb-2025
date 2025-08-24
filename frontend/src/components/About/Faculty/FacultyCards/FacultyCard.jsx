import React from 'react';

function FacultyCard({ name, designation, details, imageUrl }) {
  return (
    <div className="flex flex-col items-center justify-start text-center gap-4 h-auto w-full max-w-xs min-w-[280px] rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 shadow-2xl shadow-blue-100/50 transition-all duration-500 hover:shadow-3xl hover:shadow-blue-200/60 hover:-translate-y-3 group font-sans opacity-0 animate-[slideUpEntrance_1s_ease-out_forwards]">
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-black bg-white p-2 transform transition-all duration-500 hover:shadow-2xl group-hover:scale-105">
        <img
          src={imageUrl}
          alt={`Profile picture of ${name}`}
          className="h-48 w-40 object-cover rounded-xl border-2 border-black transition-all duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
      </div>
      
      {/* Content Section */}
      <div className="space-y-3 transform transition-all duration-700 delay-100 group-hover:translate-y-1">
        <h3 className="font-bold text-blue-800 text-xl sm:text-2xl tracking-tight hover:text-blue-900 transition-all duration-300 transform hover:scale-105 cursor-default font-playfair">
          {name}
        </h3>
        
        <div className="border-t border-gray-200/50 pt-3 space-y-2">
          <p className="text-base text-gray-600 font-medium tracking-wider uppercase text-sm opacity-80 hover:opacity-100 transition-all duration-300 font-inter italic">
            {designation}
          </p>
          <p className="text-sm leading-6 text-gray-700 font-normal tracking-wide hover:text-gray-900 transition-colors duration-300 font-inter">
            {details}
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes slideUpEntrance {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default FacultyCard;