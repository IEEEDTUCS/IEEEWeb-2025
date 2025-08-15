"use client";
import React from "react";
import styles from "@/styles/ChapterInfos.module.css";

const ImgComp = ({ position, num_items, selected = false, image }) => {
  return (
    <div
      className={styles.card}
      style={{
        transform: `rotateY(calc((${position} - 1) * (360deg / ${num_items}))) translateZ(35vw)`,
        pointerEvents: "none",
        boxShadow: selected
          ? "0 0 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255, 255, 255, 0.85)"
          : "none",
        transition: "box-shadow 0.2s ease",
        display: selected ? 'hidden' : 'flex',
      }}
    >
      <img src={image} alt={`Card ${position}`} className={styles.cardImg} />
    </div>
  );
};

export default ImgComp;


