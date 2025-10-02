import React, { useEffect, useRef, useState } from 'react';
import BranchCounsellor from './FacultyCards/BranchCounsller';
import FacultyWindow from './FacultyCards/FacultyWindow';

const Faculty = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isBranchCounsellorVisible, setIsBranchCounsellorVisible] = useState(false);
  const [isFacultyCardsVisible, setIsFacultyCardsVisible] = useState(false);
  
  const headerRef = useRef(null);
  const branchCounsellorRef = useRef(null);
  const facultyCardsRef = useRef(null);

  useEffect(() => {
    const createObserver = (ref, setVisible, threshold = 0.1) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        },
        {
          threshold,
          rootMargin: '50px'
        }
      );
    };

    const headerObserver = createObserver(headerRef, setIsHeaderVisible, 0.2);
    const branchCounsellorObserver = createObserver(branchCounsellorRef, setIsBranchCounsellorVisible);
    const facultyCardsObserver = createObserver(facultyCardsRef, setIsFacultyCardsVisible);

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (branchCounsellorRef.current) branchCounsellorObserver.observe(branchCounsellorRef.current);
    if (facultyCardsRef.current) facultyCardsObserver.observe(facultyCardsRef.current);

    return () => {
      headerObserver.disconnect();
      branchCounsellorObserver.disconnect();
      facultyCardsObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col gap-y-12 py-8">
      {/* Header Section */}
      <div 
        ref={headerRef}
        className={`text-center space-y-4 sm:space-y-6 max-w-5xl mx-auto px-4 transform transition-all duration-800 ease-out ${
          isHeaderVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className={`transform transition-all duration-700 ease-out ${
          isHeaderVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: '0.2s' }}>
          <h5 className="text-blue-600 font-bold text-sm sm:text-base lg:text-lg uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6">
            SUPPORT SYSTEM
          </h5>
        </div>
                     
        <div className={`transform transition-all duration-800 ease-out ${
          isHeaderVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '0.4s' }}>
          <div className="relative">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-tight tracking-tight">
              Meet our faculty
            </h1>
            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-tight tracking-tight mt-1 sm:mt-2">
              Advisors
            </h2>

          </div>
        </div>
      </div>

      {/* Branch Counsellor Section */}
      <div 
        ref={branchCounsellorRef}
        className={`transform transition-all duration-700 ease-out ${
          isBranchCounsellorVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <BranchCounsellor />
      </div>

      {/* Faculty Cards Section */}
      <div 
        ref={facultyCardsRef}
        className={`transform transition-all duration-700 ease-out ${
          isFacultyCardsVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '0.2s' }}
      >
        <div className="flex justify-center px-4">
          <FacultyWindow />
        </div>
      </div>
    </div>
  );
};

export default Faculty;