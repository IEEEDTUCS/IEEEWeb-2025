import React from "react";

function BranchCounsellor() {
  return (
    <div className="flex flex-col lg:flex-row border-2 border-gray-100 w-full max-w-6xl min-h-[50vh] mx-auto bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl shadow-blue-100/50 gap-6 lg:gap-8 transition-all duration-500 hover:shadow-3xl hover:shadow-blue-200/60 hover:-translate-y-2 group font-sans">
      {/* Image Section */}
      <div className="w-full lg:w-1/3 flex justify-center items-center transform transition-all duration-700 group-hover:scale-105">
        <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-black bg-white p-2 transform transition-all duration-500 hover:shadow-2xl">
          <img
            src="/Faculty/Prof-J-Panda.png"
            alt="Prof. Jeebananda Panda"
            className="rounded-xl object-cover w-full max-w-sm lg:max-w-none lg:h-full transition-all duration-500 hover:scale-110 border-2 border-black"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="w-full lg:w-2/3 flex flex-col justify-center space-y-6 transform transition-all duration-700 delay-200 group-hover:translate-x-2">
        <div className="space-y-5">
          <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-700 font-normal tracking-wide text-left sm:text-justify opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards] hover:text-gray-900 transition-colors duration-300 font-inter">
            IEEE DTU's core purpose is to foster technological innovation and
            excellence for the benefit of humanity.
          </p>
          <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-700 font-normal tracking-wide text-left sm:text-justify opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards] hover:text-gray-900 transition-colors duration-300 font-inter">
            IEEE DTU and its members inspire a global community through its highly
            cited publications, conferences, technology standards, and
            professional and educational activities. We aim to inspire and
            motivate the genius, to blossom into a societal revolution.
          </p>
          <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-700 font-normal tracking-wide text-left sm:text-justify opacity-0 animate-[fadeInUp_0.8s_ease-out_0.7s_forwards] hover:text-gray-900 transition-colors duration-300 font-inter">
            IEEE DTU will be essential to the global technical community and to
            technical professionals everywhere, and be universally recognized for
            the contributions of technology and of technical professionals in
            improving global conditions.
          </p>
        </div>
        
        {/* Name and Designation Section */}
        <div className="pt-6 lg:pt-8 border-t border-gray-200/50 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.9s_forwards]">
          <div className="space-y-3">
            <h3 className="font-bold text-blue-800 text-xl sm:text-2xl lg:text-3xl tracking-tight hover:text-blue-900 transition-all duration-300 transform hover:scale-105 cursor-default font-playfair">
              Prof. Jeebananda Panda
            </h3>
            <p className="italic text-base sm:text-lg text-gray-600 font-medium tracking-wider uppercase text-sm opacity-80 hover:opacity-100 transition-all duration-300 font-inter">
              Branch Counsellor
            </p>
          </div>
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
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

export default BranchCounsellor;