import React from 'react';
import Slideshow from './Slideshow';
import Stats from './Stats';

export default function AboutIEEE() {
  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 lg:px-8 pt-32">
      
      {/* Heading Section */}
      <div className="text-center mb-16 opacity-0 animate-[slideUp_1s_ease-out_forwards] transform-gpu">
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight font-heading mb-6 will-change-transform">
          About <span className="text-gray-300">IEEE DTU</span>
        </h2>
        
        <div className="w-24 h-1 bg-gray-400 mx-auto rounded-full"></div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Text Content - Full Width on Mobile, Shared on Desktop */}
        <div className="w-full opacity-0 animate-[slideUp_1s_ease-out_0.3s_forwards] transform-gpu mb-12 lg:mb-0">
          <div className="lg:flex lg:gap-12">
            {/* Text Section */}
            <div className="w-full lg:w-3/5">
              enges in the field of technology and engineering.
              
              <div className="space-y-4 text-sm leading-5 text-gray-200 tracking-[0.05rem] font-serif ">
                <p>
                  <span className="text-white font-bold">IEEE DTU Student Branch</span>, established in <span className="text-white font-bold">1983</span>, 
                  is the <span className="text-white font-bold">oldest and largest society</span> at Delhi Technological University. 
                  With a history of over <span className="text-white font-bold">four decades</span>, it has grown into one of the most 
                  vibrant and innovative student organizations on campus.
                </p>

                <p>
                  Under the guidance of <span className="text-white font-bold">Dr. J. Panda</span>, IEEE DTU organizes 
                  numerous events throughout the year, engaging students with cutting-edge technology and fostering collaboration. 
                  The academic year begins with an <span className="text-white font-bold">Orientation Program</span> for juniors.
                </p>

                <p>
                  IEEE DTU is supported by <span className="text-white font-bold">four specialized chapters</span> — 
                  Computer Society (CS), Women in Engineering (WIE), Power & Energy Society (PES-IAS), and Circuits & Systems Society (CASS). 
                  Each chapter plays a vital role in managing and organizing events.
                  In addition to events, IEEE DTU is known for its publications — <span className="text-white font-bold">ECHO, IOTA, TRIGGER, and The Troika Times</span> — 
                  providing students a platform to showcase technical knowledge and creativity.
                </p>

                <p>
                  A strong mentoring system connects students with seniors and alumni at companies like 
                  <span className="text-white font-bold"> Microsoft</span> and <span className="text-white font-bold">Google</span>. 
                  Through workshops, seminars, and hands-on projects, IEEE DTU keeps students updated with industry trends while 
                  encouraging research and participation in IEEE conferences.
                </p>

                <p>
                  With its commitment to excellence and innovation, <span className="text-white font-bold">IEEE DTU</span> continues to evolve, 
                  fostering leadership, technical growth, and community impact within and beyond the campus.
                </p>
              </div>


            </div>
            
            {/* Slideshow Section - Only visible on large screens */}
            <div className="hidden lg:block lg:w-2/5 opacity-0 animate-[slideUp_1s_ease-out_0.5s_forwards] transform-gpu">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/50 border-4 border-gray-700 bg-gray-900/20 p-4 backdrop-blur-sm hover:shadow-3xl hover:shadow-gray-800/60 transition-all duration-500 group will-change-transform">
                <div className="rounded-2xl overflow-hidden h-[400px] relative" style={{ contain: 'layout size style paint' }}>
                  <div className="w-full h-full" style={{ isolation: 'isolate' }}>
                    <Slideshow />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Slideshow - Only visible on small/medium screens */}
        <div className="block lg:hidden opacity-0 animate-[slideUp_1s_ease-out_0.5s_forwards] transform-gpu mb-16">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/50 border-4 border-gray-700 bg-gray-900/20 p-4 backdrop-blur-sm hover:shadow-3xl hover:shadow-gray-800/60 transition-all duration-500 group will-change-transform">
            <div className="rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96 relative" style={{ contain: 'layout size style paint' }}>
              <div className="w-full h-full" style={{ isolation: 'isolate' }}>
                <Slideshow />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="mt-16 opacity-0 animate-[slideUp_1s_ease-out_0.7s_forwards] transform-gpu">
        <Stats />
      </div>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate3d(0, 50px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        /* Force hardware acceleration for smooth animations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Prevent layout shifts during animations */
        .animate-slideUp {
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Isolate slideshow to prevent affecting other elements */
        .slideshow-container {
          isolation: isolate;
          contain: layout style paint;
        }
        
        /* Stabilize text rendering - CRITICAL for preventing flickering */
        p {
          transform: translateZ(0) !important;
          backface-visibility: hidden !important;
          will-change: auto !important;
          position: relative !important;
          z-index: 1 !important;
        }
        
        /* Create separate rendering layers */
        .text-section {
          position: relative;
          z-index: 2;
          isolation: isolate;
        }
        
        .slideshow-section {
          position: relative;
          z-index: 1;
          isolation: isolate;
        }
      `}</style>
    </div>
  );
}