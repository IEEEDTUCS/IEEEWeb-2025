import React, { useEffect, useState } from 'react';
//import pesLOGO from "//PES_IEE.png";

export default function Chapter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        /* Chapter Component Styles */
        .grid-container_2 {
          display: grid;
          grid-template-columns: 50% 50%;
        }

        .grid-item_2 {
          text-align: center;
          padding-right: 30px;
        }

        .services-list .service-text {
          margin-left: 7.8rem;
        }

        /* Chapter specific styles */
        .chapter-title {
          font-size: 21px;
          color: rgb(0, 0, 0);
          text-decoration: none;
          margin-bottom: 2rem;
          font-weight: 550;
          height : 27px;
          margin-block-end: 18px;
          margin-block-start: 60px;
          margin-bottom: 18px;
          margin-top: 60px;
        }

        .chapter-title:hover {
          text-decoration: none;
          color: #000;
        }

        .chapter-description {
          padding: 0 30px 0 30px;
          text-align: justify;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.75;
          color: rgb(117, 117, 117);
          margin-bottom: 3rem;
          padding-left: 30px;
          padding-right: 30px;
          margin-bottom: 30px;
          margin-block-end: 30px;
          overflow-wrap: break-word
        }

        .btn--stroke-2 {
          border: 2px solid #d1d5db;
          background-color: white;
          color: #374151;
          padding: 12px 32px;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-decoration: none;
          border-radius: 2px;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .btn--stroke-2:hover {
          border-color: #9ca3af;
          background-color: #f9fafb;
          text-decoration: none;
        }

        .chapter-image {
          max-width: 70%;
          height: 300px;
          object-fit: contain;
          display: block;
          margin-left: auto;
        margin-right: auto;
        }

        /* Left grid item specific styling */
        .grid-item_2:first-child {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .grid-item_2:first-child .service-text {
          margin: 0;
        }

        /* Animation classes */
        .fade-up {
          transform: translateY(12px);
          opacity: 0;
          transition: all 1s ease-out;
        }

        .fade-up.visible {
          transform: translateY(0);
          opacity: 1;
        }

        .fade-up.delay-200 {
          transition-delay: 0.2s;
        }

        .fade-up.delay-400 {
          transition-delay: 0.4s;
        }

        /* Responsive Design */
        @media only screen and (max-width: 800px) {
          .services-list {
            margin-top: 4.2rem;
            max-width: 500px;
            text-align: center;
          }
          
          .services-list .service-item:nth-child(n) {
            padding-right: 15px;
            padding-left: 15px;
          }
          
          .services-list h3 {
            font-size: 3rem;
          }
          
          .services-list .service-text {
            margin-left: 0;
          }
          
          .grid-container_2 {
            grid-template-columns: 1fr !important;
            margin: 0px 20px 0px 20px !important;
            padding-left: 30px;
            padding-right: 30px;
          }
          
          .chapter-image {
            paddint-top: 20px
            max-width: 60% !important;
            height: 400px !important;
            width: auto !important;
          }
          
          .chapter-description {
            padding: 0 15px 0 15px;
          }
          
          .chapter-title {
            font-size: 1.5rem:
          }

          .grid-item_2:first-child {
            padding: 20px 0 !important;
          }

          .grid-item_2 {
            padding-right: 15px !important;
          }
        }


        /* Extra small screens */
        @media only screen and (max-width: 480px) {
          .chapter-image {
            max-width: 50% !important;
            height: 150px !important;
          }
          
          .chapter-title {
            font-size: 1.25rem;
          }
          
          .chapter-description {
            font-size: 15px;
            padding: 0 10px;
          }
          
          .grid-container_2 {
            margin: 0px 10px 0px 10px !important;
          }
        }
      `}</style>
      
      <div 
        id="pes" 
        className="grid-container_2" 
        style={{ 
          borderBottom: 'gray solid', 
          margin: '0px 50px 0px 50px',
          backgroundColor : 'white'
        }}
      >
        {/* Left Grid Item - Image */}
        <div className={`grid-item_2 fade-up ${isVisible ? 'visible' : ''}`}>
          <br /><br /><br />
          <div className="service-text">
            <img 
              height="300"
              src="/your_component_name/PES_IEE.png"
              className="chapter-image"
              alt="IEEE PES Logo"
            />
          </div>
        </div>

        {/* Right Grid Item - Content */}
        <div className={`grid-item_2 fade-up delay-200 ${isVisible ? 'visible' : ''}`}>
          <br /><br /><br />
          <div className="service-text">
            <a href="./chapters/PES_IAS.html">
              <h3 className="chapter-title">
                IEEE DTU PES-IAS CHAPTER
              </h3>
            </a>
            <p className="chapter-description">
              The Power & Energy Society (PES) provides the world's largest forum for sharing latest in technological developments in the electric power industry, for developing standards that guide the development and construction of equipment and systems, and for educating members of the industry and the general public. Members of the PES are leaders in this field, and the members gain substantial benefits.
            </p>
            <a 
              href="./chapters/PES_IAS.html" 
              className={`btn--stroke-2 fade-up delay-400 ${isVisible ? 'visible' : ''}`}
            >
              Know More
            </a>
            <br /><br />
          </div>
        </div>
      </div>
    </>
  );
}
