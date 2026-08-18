"use client";
import React, { useState } from "react";

const REPS = [
  { name: "Bhavya Goel",       phone: "917982969225" },
  { name: "Drishti Kaushik",   phone: "919520002368" },
  { name: "Manit Vig",         phone: "919560566938" },
  { name: "Mayank Kanojjiya",  phone: "919250110578" },
  { name: "Hardik Aggarwal",   phone: "919319173701" },
  { name: "Shyla Vijay",       phone: "917982691483" },
  { name: "Sankalp Tripathi",  phone: "919013522191" },
  { name: "Saurabh Chauhan",   phone: "919643717883" },
  { name: "Prashay Joon",      phone: "917042527004" },
  { name: "Vishal Raj",        phone: "917909043293" },
];

const WA_MESSAGE = encodeURIComponent(
  "Hi! I'm interested in joining IEEE DTU. Could you please share more details about the membership process?"
);

/* ── WhatsApp SVG icon ── */
function WAIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.105 1.523 5.823L.057 23.882a.75.75 0 0 0 .92.92l6.086-1.459A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 0 1-4.964-1.356l-.355-.212-3.686.884.899-3.643-.232-.373A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
    </svg>
  );
}

/**
 * variant: "dark"  — white text on green  (for dark backgrounds)
 * variant: "light" — white text on green  (same, alias)
 * variant: "pill"  — compact pill style   (for sign-in drawer)
 * className / style — pass-through overrides
 */
export default function WhatsAppButton({ variant = "dark", className = "", style = {} }) {
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    if (animating) return;
    setAnimating(true);
    const chosen = REPS[Math.floor(Math.random() * REPS.length)];
    setTimeout(() => {
      window.open(`https://wa.me/${chosen.phone}?text=${WA_MESSAGE}`, "_blank");
      setAnimating(false);
    }, 500);
  };

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: "pointer",
    fontWeight: 700,
    border: "none",
    transition: "filter 0.2s, transform 0.15s",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    boxShadow: "0 4px 18px rgba(22,163,74,0.35)",
    ...style,
  };

  if (variant === "pill") {
    baseStyle.fontSize = 13;
    baseStyle.padding = "8px 18px";
    baseStyle.borderRadius = 20;
    baseStyle.width = "100%";
  } else {
    baseStyle.fontSize = 14;
    baseStyle.padding = "12px 28px";
    baseStyle.borderRadius = 12;
    baseStyle.width = "100%";
  }

  return (
    <button
      onClick={handleClick}
      className={className}
      style={baseStyle}
      onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.filter = ""; e.currentTarget.style.transform = ""; }}
    >
      <WAIcon size={variant === "pill" ? 15 : 18} />
      {animating ? (
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 14, height: 14,
            border: "2px solid rgba(255,255,255,0.4)",
            borderTop: "2px solid #fff",
            borderRadius: "50%",
            display: "inline-block",
            animation: "spin 0.7s linear infinite",
          }} />
          Connecting…
        </span>
      ) : (
        "Chat on WhatsApp"
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
