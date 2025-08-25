
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel CSS

export function CarouselComp() {
  const carouselItems = [
    { img: "./images/AboutUs/IEEE23.jpg" },
    { img: "./images/AboutUs/IMG_7113.jpg" },
    { img: "./images/AboutUs/IMG_4391.jpg" },
    { img: "./images/AboutUs/IMG_5056.jpg" },
    { img: "./images/AboutUs/IMG_7345.jpg" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Carousel
        showThumbs={false}
        showStatus={true} // Slide x of y
        infiniteLoop={true}
        autoPlay={false}
        interval={5000}
        transitionTime={500}
        emulateTouch={true}
        dynamicHeight={false}
        className="rounded-2xl overflow-hidden shadow-xl"
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-white rounded-full shadow shimmer-button hover:shadow-2xl z-10"
              aria-label="Previous Slide"
            >
              Prev
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-white rounded-full shadow shimmer-button hover:shadow-2xl z-10"
              aria-label="Next Slide"
            >
              Next
            </button>
          )
        }
      >
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-tr from-purple-700/20 via-pink-700/20 to-purple-700/10 rounded-2xl flex items-center justify-center p-2"
          >
            <img
              src={item.img}
              alt={`Slide ${index + 1}`}
              className="rounded-2xl object-cover w-full h-80 sm:h-96"
              loading="lazy"
            />
          </div>
        ))}
      </Carousel>

      {/* Dots Styling */}
      <style>{`
        .carousel .control-dots .dot {
          width: 12px;
          height: 12px;
          background: #ccc;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        .carousel .control-dots .dot.selected {
          width: 20px;
          background: #E45A84;
          opacity: 1;
        }

        /* Shimmer button effect */
        .shimmer-button {
          background: linear-gradient(45deg, #E45A84, #583C87, #E45A84);
          background-size: 200% 200%;
          animation: shimmer 2s linear infinite;
          color: white;
          font-weight: 600;
          border: none;
        }
        .shimmer-button:hover {
          animation: shimmer 1s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

