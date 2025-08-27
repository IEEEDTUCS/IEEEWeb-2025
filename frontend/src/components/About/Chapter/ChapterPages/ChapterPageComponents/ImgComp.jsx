"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/ChapterInfos.module.css";

function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);

      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return width;
}

const ImgComp = ({ position, num_items, selected = false, image }) => {
  const width = useWindowWidth();
  const zRadius = width >= 1300 ? "25vw" : "35vw";

  return (
    <img
      src={image}
      alt={`Image ${position}`}
      className={styles.cardImg}
      style={{
        transform: `rotateY(calc((${position} - 1) * (360deg / ${num_items}))) translateZ(${zRadius})`,
        position: "absolute",
        pointerEvents: "none",
        opacity: selected ? "1" : "0",
        boxShadow: selected
          ? "0 0 0.8rem rgba(0, 0, 0, 1), 0 0 1rem rgba(53, 51, 51, 0.7)"
          : "none",
        transition: "box-shadow 1s ease, opacity 1s ease, visibility 1s ease",
      }}
    />
  );
};

export default ImgComp;