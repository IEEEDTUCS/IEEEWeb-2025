import React from 'react';
import Slideshow from './Slideshow';
import Stats from './Stats';

export default function AboutIEEE() {
  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 lg:px-8 py-12 font-sans">
      
      {/* Heading Section */}
      <div className="text-center mb-16 opacity-0 animate-[slideUp_1s_ease-out_forwards] transform-gpu">
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight font-playfair mb-6 will-change-transform">
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
              <div className="space-y-3">
                <p className="text-gray-200 leading-5 text-xs font-inter" style={{ textRendering: 'optimizeLegibility', contain: 'layout', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
                  <span className="text-white font-bold">IEEE DTU Student Branch</span>, established in <span className="text-white font-bold">1983</span>, in the IEEE Delhi
                  Section, Region 10, is the <span className="text-white font-bold">oldest and largest society</span> at Delhi
                  Technological University. With a history of over <span className="text-white font-bold">four decades</span>, it
                  has grown into one of the most <span className="text-white font-bold">vibrant and innovative</span> student
                  organizations on campus.
                </p>
                
                <p className="text-gray-200 leading-5 text-xs font-inter" style={{ textRendering: 'optimizeLegibility', contain: 'layout', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
                  Under the guidance of <span className="text-white font-bold">Dr. J. Panda</span>, IEEE DTU organizes numerous
                  events throughout the year, engaging students with <span className="text-white font-bold">cutting-edge
                  technology</span> and fostering collaboration. The academic year begins
                  with an <span className="text-white font-bold">Orientation Program</span> for juniors.
                </p>
                
                <p className="text-gray-200 leading-5 text-xs font-inter" style={{ textRendering: 'optimizeLegibility', contain: 'layout', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
                  IEEE DTU is supported by <span className="text-white font-bold">four specialized chapters</span> — <span className="text-white font-bold">Computer
                  Society (CS)</span>, <span className="text-white font-bold">Women in Engineering (WIE)</span>, <span className="text-white font-bold">Power & Energy Society
                  (PES-IAS)</span>, and <span className="text-white font-bold">Circuits and Systems Society (CASS)</span>. Each chapter
                  plays a vital role in managing and organizing events.
                </p>
                
                <p className="text-gray-200 leading-5 text-xs font-inter" style={{ textRendering: 'optimizeLegibility', contain: 'layout', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
                  In addition to events, IEEE DTU is well-known for its <span className="text-white font-bold">publications</span>,
                  such as <span className="text-white font-bold">ECHO, IOTA, TRIGGER, and The Troika Times</span>, which offer
                  students a platform to showcase their <span className="text-white font-bold">technical knowledge</span>.
                </p>
                
                <p className="text-gray-200 leading-5 text-xs font-inter" style={{ textRendering: 'optimizeLegibility', contain: 'layout', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
                  IEEE DTU also provides a <span className="text-white font-bold">robust mentoring system</span>, where students can
                  interact with seniors and alumni placed at top companies like
                  <span className="text-white font-bold"> Microsoft and Google</span>. As the oldest and largest society at DTU, IEEE
                  DTU remains committed to fostering <span className="text-white font-bold">innovation, leadership, and
                  personal growth</span>.
                </p>
                
                <p className="text-gray-200 leading-5 text-xs font-inter" style={{ textRendering: 'optimizeLegibility', contain: 'layout', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
                  The society continues to evolve and adapt to the changing landscape of technology and education. Through 
                  various workshops, seminars, and hands-on projects, <span className="text-white font-bold">IEEE DTU</span> ensures that 
                  students stay updated with the latest industry trends and developments. The branch also facilitates 
                  networking opportunities with industry professionals and alumni.
                </p>
                
                <p className="text-gray-200 leading-5 text-xs font-inter" style={{ textRendering: 'optimizeLegibility', contain: 'layout', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
                  With its commitment to excellence and innovation, <span className="text-white font-bold">IEEE DTU</span> has established 
                  itself as a cornerstone of technical education at the university. The society's impact extends beyond 
                  campus boundaries, contributing to the broader engineering community and society at large.
                </p>
                
                <p className="text-gray-200 leading-5 text-xs font-inter" style={{ textRendering: 'optimizeLegibility', contain: 'layout', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
                  Our technical events include coding competitions, hackathons, robotics workshops, and guest lectures from 
                  industry experts. These activities provide students with practical experience and exposure to real-world 
                  challenges in the field of technology and engineering.
                </p>
                
                <p className="text-gray-200 leading-5 text-xs font-inter" style={{ textRendering: 'optimizeLegibility', contain: 'layout', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
                  The society also emphasizes research and development, encouraging students to participate in IEEE conferences 
                  and publish their work in IEEE journals. This focus on research helps bridge the gap between academic 
                  learning and practical application in the technology sector.
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