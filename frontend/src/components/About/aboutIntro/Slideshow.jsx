import React, { useState, useEffect } from 'react';

const Slideshow = () => {
  const images = [
    "/slideshow/img1.jpg",
    "/slideshow/img2.jpg",
    "/slideshow/img3.jpg"
 
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentIndex(current => (current + 1) % images.length);
          return 0;
        }
        return prev + 2; // Adjust speed here
      });
    }, 100);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Loading bar with 4 segments */}
      <div className="flex gap-1 p-3 justify-center bg-gray-900/30">
        {images.map((_, index) => (
          <div
            key={index}
            className="w-12 h-0.5 bg-gray-400/40 rounded-full overflow-hidden"
          >
            <div
              className={`h-full bg-white rounded-full transition-all duration-100 ease-linear`}
              style={{
                width: index === currentIndex 
                  ? `${progress}%` 
                  : index < currentIndex 
                    ? '100%' 
                    : '0%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;