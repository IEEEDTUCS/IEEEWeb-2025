"use client";
import React, { useState } from "react";
import styles from "@/styles/ChapterInfos.module.css"

function CarouselComp({ images = [], SelectedDot }) {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + length) % length);
  };

  return (
    <>
      <div className={styles.carouselContainer}>
        <button className={styles.carouselBtnPrev} onClick={prevSlide}>
          &#10094;
        </button>

        <div className={styles.carouselTrack}>
          {images.map((item, index) => {
            const position = index === current ? "active" : "hidden";

            return (
              <div
                key={index}
                className={`${styles.carouselSlide} ${styles[position] || position}`}
              >
                <img src={item} alt={`Slide ${index}`} />
              </div>
            );
          })}
        </div>

        <button className={styles.carouselBtnNext} onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      { SelectedDot && <div style={{display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop:'4rem'}}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{ 
              height: '0.75rem',
              borderRadius: '0.5rem',
              width: i === current ? '1.75rem' :'0.75rem',
              transition: '0.3s ease-in',
              backgroundColor: i === current ? SelectedDot : "#69706b",
              border: '1.5px solid black',
              cursor: 'pointer'
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
        </div>}
    </>
  );
}

export default CarouselComp;
