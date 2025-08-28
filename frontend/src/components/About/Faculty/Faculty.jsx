import React from 'react'
import BranchCounsellor from './FacultyCards/BranchCounsller';
import FacultyWindow from './FacultyCards/FacultyWindow';

const Faculty = () => {
  return (
    <div className="flex flex-col gap-y-12 py-8">
      {/* Header Section */}
      <div className="text-center space-y-4 sm:space-y-6 max-w-5xl mx-auto px-4 opacity-0 translate-y-8 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
        <div className="opacity-0 translate-y-4 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
          <h5 className="text-blue-600 font-bold text-sm sm:text-base lg:text-lg uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6">
            SUPPORT SYSTEM
          </h5>
        </div>
            
        <div className="opacity-0 translate-y-6 animate-[slideUp_1s_ease-out_0.6s_forwards]">
          <div className="relative">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-tight tracking-tight">
              Meet our faculty
            </h1>
            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-tight tracking-tight mt-1 sm:mt-2">
              Advisors
            </h2>
            <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 md:w-40 h-1 sm:h-1.5 bg-blue-600 rounded-full scale-x-0 animate-[scaleIn_0.6s_ease-out_1.4s_forwards] origin-center"></div>
          </div>
        </div>

        <style jsx>{`
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

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
                     
          @keyframes scaleIn {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }
        `}</style>
      </div>

      {/* Branch Counsellor Section */}
      <div className="opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_1.2s_forwards]">
        <BranchCounsellor />
      </div>

      {/* Faculty Cards Section */}
      <div className="opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_1.6s_forwards]">
        <div className="flex justify-center px-4">
          <FacultyWindow />
        </div>
      </div>
    </div>
  );
};

export default Faculty;