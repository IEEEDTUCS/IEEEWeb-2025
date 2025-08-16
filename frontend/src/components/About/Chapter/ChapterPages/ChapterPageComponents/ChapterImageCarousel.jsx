"use client";
import React, { useState, useEffect } from "react";
import ImgComp from "@/components/About/Chapter/ChapterPages/ChapterPageComponents/ImgComp";
import styles from "@/styles/ChapterInfos.module.css";

function ChapterImageCarousel({ images }) {
  const pos = images;
  const [rotationY, setRotationY] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationY((prev) => prev - 360 / pos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [pos.length]);


  useEffect(() => {
    const curr_index = (rotationY / 360) * pos.length + 1;
    const round_index =
      ((Math.round(curr_index) % pos.length) * -1 + 1) % pos.length;

    if (round_index < 0) {
      setSelected(pos.length + round_index);
    } else {
      setSelected(round_index);
    }
  }, [rotationY, pos.length]);

  return (
    <>
      <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div className={styles.innerContainer} style={{ touchAction: "none", userSelect: "none" }}>
          <div className={styles.carousel} 
          style={{ transform: `perspective(1000px) rotateY(${rotationY}deg)`, transition: "transform 1s ease-in-out", }}>
            {pos.map((img, index) => (
              <ImgComp key={index} position={index + 1} num_items={pos.length} selected={selected === index} image={img} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChapterImageCarousel;


