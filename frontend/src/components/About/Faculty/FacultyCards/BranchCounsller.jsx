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
    <div 
      ref={componentRef}
      className={`flex flex-col lg:flex-row border-2 border-gray-100 w-full max-w-6xl min-h-[50vh] mx-auto bg-gradient-to-br from-white via-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8 xl:p-10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-100/50 gap-4 sm:gap-6 lg:gap-8 transition-all duration-700 hover:shadow-3xl hover:shadow-blue-200/60 hover:-translate-y-2 group font-sans transform ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      {/* Image Section */}
      <div className={`w-full lg:w-1/3 flex justify-center items-center transform transition-all duration-700 group-hover:scale-[1.02] ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 -translate-x-8'
      }`}
      style={{ transitionDelay: '0.2s' }}>
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md bg-gray-50 p-1 sm:p-2 transform transition-all duration-500 hover:shadow-lg w-full max-w-sm lg:max-w-none">
          <img
            src="/Faculty/Prof-J-Panda.png"
            alt="Prof. Jeebananda Panda"
            className="rounded-lg sm:rounded-xl object-cover w-full h-64 sm:h-80 lg:h-full transition-all duration-500 hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent rounded-lg sm:rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="w-full lg:w-2/3 flex flex-col justify-center space-y-4 sm:space-y-6 transform transition-all duration-500 delay-100 group-hover:translate-x-1">
        <div className={`space-y-4 sm:space-y-5 transform transition-all duration-700 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: '0.3s' }}>
          <p className="text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-700 font-normal tracking-wide text-left hover:text-gray-900 transition-colors duration-300">
            IEEE DTU's core purpose is to foster technological innovation and
            excellence for the benefit of humanity.
          </p>
          <p className="text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-700 font-normal tracking-wide text-left hover:text-gray-900 transition-colors duration-300">
            IEEE DTU and its members inspire a global community through its highly
            cited publications, conferences, technology standards, and
            professional and educational activities. We aim to inspire and
            motivate the genius, to blossom into a societal revolution.
          </p>
          <p className="text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-700 font-normal tracking-wide text-left hover:text-gray-900 transition-colors duration-300">
            IEEE DTU will be essential to the global technical community and to
            technical professionals everywhere, and be universally recognized for
            the contributions of technology and of technical professionals in
            improving global conditions.
          </p>
        </div>
        
        {/* Name and Designation Section */}
        <div className={`pt-4 sm:pt-6 lg:pt-8 border-t border-gray-200/50 transform transition-all duration-700 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: '0.5s' }}>
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-bold text-gray-800 text-lg sm:text-xl lg:text-2xl xl:text-3xl tracking-tight hover:text-gray-900 transition-all duration-300 transform hover:scale-105 cursor-default leading-tight">
              Prof. Jeebananda Panda
            </h3>
            <p className="text-blue-600 font-medium tracking-wide text-xs sm:text-sm lg:text-base hover:text-blue-700 transition-all duration-300">
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