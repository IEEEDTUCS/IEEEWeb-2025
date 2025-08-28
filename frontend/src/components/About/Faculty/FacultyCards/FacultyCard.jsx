import React, { useEffect, useRef, useState } from 'react';

function FacultyCard({ name, designation, details, imageUrl }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`flex flex-col items-center justify-start text-center gap-4 sm:gap-6 h-[400px] sm:h-[450px] w-full max-w-[280px] sm:max-w-xs rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-lg shadow-gray-200/60 transition-all duration-700 hover:shadow-xl hover:shadow-gray-300/40 hover:-translate-y-2 group transform ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md bg-gray-50 p-1 transform transition-all duration-500 hover:shadow-lg group-hover:scale-[1.02] flex-shrink-0">
        <img
          src={imageUrl}
          alt={`Profile picture of ${name}`}
          className="h-40 w-32 sm:h-48 sm:w-40 object-cover rounded-lg sm:rounded-xl transition-all duration-500 hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent rounded-lg sm:rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
      </div>
                      
      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center space-y-3 sm:space-y-4 transform transition-all duration-500 delay-75 group-hover:translate-y-[-2px]">
        <h3 className="font-bold text-gray-800 text-lg sm:text-xl lg:text-2xl tracking-tight hover:text-gray-900 transition-all duration-300 cursor-default leading-tight">
          {name}
        </h3>
                              
        <div className="space-y-2 sm:space-y-3">
          <p className="text-blue-600 font-medium tracking-wide text-xs sm:text-sm hover:text-blue-700 transition-all duration-300">
            {designation}
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-gray-600 font-normal tracking-wide hover:text-gray-700 transition-colors duration-300 whitespace-pre-line">
            {details}
          </p>
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

export default FacultyCard;