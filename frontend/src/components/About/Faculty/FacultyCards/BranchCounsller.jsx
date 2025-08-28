import React, { useEffect, useRef, useState } from "react";

function BranchCounsellor() {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  return (
<<<<<<< HEAD
    <div 
      ref={componentRef}
      className={`flex flex-col lg:flex-row w-full max-w-6xl min-h-[50vh] mx-auto bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg shadow-gray-200/60 gap-6 lg:gap-8 transition-all duration-700 hover:shadow-xl hover:shadow-gray-300/40 hover:-translate-y-2 group transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
=======
    <div className="flex flex-col lg:flex-row border-2 border-gray-100 w-full max-w-6xl min-h-[50vh] mx-auto bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl shadow-blue-100/50 gap-6 lg:gap-8 transition-all duration-500 hover:shadow-3xl hover:shadow-blue-200/60 hover:-translate-y-2 group font-sans">
>>>>>>> d06bf60d3fbb00ea4f799b47585fca0c4dc503b5
      {/* Image Section */}
      <div className="w-full lg:w-1/3 flex justify-center items-center transform transition-all duration-500 group-hover:scale-[1.02]">
        <div className="relative overflow-hidden rounded-2xl shadow-md bg-gray-50 p-2 transform transition-all duration-500 hover:shadow-lg">
          <img
            src="/Faculty/Prof-J-Panda.png"
            alt="Prof. Jeebananda Panda"
            className="rounded-xl object-cover w-full max-w-sm lg:max-w-none lg:h-full transition-all duration-500 hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="w-full lg:w-2/3 flex flex-col justify-center space-y-6 transform transition-all duration-500 delay-100 group-hover:translate-x-1">
        <div className={`space-y-5 transform transition-all duration-700 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: '0.2s' }}>
          <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-700 font-normal tracking-wide text-left sm:text-justify hover:text-gray-900 transition-colors duration-300">
            IEEE DTU's core purpose is to foster technological innovation and
            excellence for the benefit of humanity.
          </p>
          <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-700 font-normal tracking-wide text-left sm:text-justify hover:text-gray-900 transition-colors duration-300">
            IEEE DTU and its members inspire a global community through its highly
            cited publications, conferences, technology standards, and
            professional and educational activities. We aim to inspire and
            motivate the genius, to blossom into a societal revolution.
          </p>
          <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-700 font-normal tracking-wide text-left sm:text-justify hover:text-gray-900 transition-colors duration-300">
            IEEE DTU will be essential to the global technical community and to
            technical professionals everywhere, and be universally recognized for
            the contributions of technology and of technical professionals in
            improving global conditions.
          </p>
        </div>
        
        {/* Name and Designation Section */}
        <div className={`pt-6 lg:pt-8 border-t border-gray-200/50 transform transition-all duration-700 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: '0.4s' }}>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-800 text-xl sm:text-2xl lg:text-3xl tracking-tight hover:text-gray-900 transition-all duration-300 transform hover:scale-105 cursor-default">
              Prof. Jeebananda Panda
            </h3>
            <p className="text-blue-600 font-medium tracking-wide text-sm sm:text-base hover:text-blue-700 transition-all duration-300">
              Branch Counsellor
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      `}</style>
    </div>
  );
}

export default BranchCounsellor;