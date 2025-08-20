"use client";
import React from "react";
import styles from "@/styles/ChapterInfos.module.css";

const ImgComp = ({ position, num_items, selected = false, image }) => {
  return (
    <img
      src={image}
      alt={`Image ${position}`}
      className={styles.cardImg}
      style={{
        transform: `rotateY(calc((${position} - 1) * (360deg / ${num_items}))) translateZ(35vw)`,
        position: "absolute",
        pointerEvents: "none",
        opacity: selected ? "1" : "0",
        visibility: selected ? "visible" : "hidden", // ✅ hides non-selected
        boxShadow: selected
          ? "0 0 0.8rem rgba(0, 0, 0, 1), 0 0 1rem rgba(53, 51, 51, 0.7)"
          : "none",
        transition: "box-shadow 1s ease, opacity 1s ease, visibility 1s ease",
      }}
    />
  );
};

export default ImgComp;


// <div
    //   className={styles.card}
    //   style={{
    //     transform: `rotateY(calc((${position} - 1) * (360deg / ${num_items}))) translateZ(35vw)`,
    //     pointerEvents: "none",
    //     opacity: selected ? "1" : "0",
    //     boxShadow: selected
    //       ? "0 0 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255, 255, 255, 0.85)"
    //       : "none",
    //     transition: "box-shadow 1s ease, opacity 1s ease",
    //     display: selected ? 'hidden' : 'flex',
    //   }}
    // >
    //   <img src={image} alt={`Card ${position}`} className={styles.cardImg} />
    // </div>


