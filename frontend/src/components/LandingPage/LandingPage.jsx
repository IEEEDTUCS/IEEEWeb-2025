
import { useEffect, useState } from "react";
import Link from "next/link";
import Signin from '../../utils/signin';
import Drawer from '@mui/material/Drawer';

export default function LandingPage() {
    const [openSignIn, setOpenSignIn] = useState(false);

    useEffect(() => {
        const cursor = document.getElementById("custom-cursor");

        const moveCursor = (e) => {
            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                if (cursor) {
                    cursor.style.left = `${e.clientX}px`;
                    cursor.style.top = `${e.clientY}px`;
                }
            });

            // Check if hovering over nav links
            if (e.target.closest("#navbar a")) {
                cursor?.classList.add("cursor-boundary");
                const linkRect = e.target.getBoundingClientRect();
                // Snap the cursor to the link boundary
                if (cursor) {
                    cursor.style.width = `${linkRect.width + 20}px`;
                    cursor.style.height = `${linkRect.height + 10}px`;
                    cursor.style.borderRadius = "4px";
                }
            } else {
                cursor?.classList.remove("cursor-boundary");
                if (cursor) {
                    cursor.style.width = "20px";
                    cursor.style.height = "20px";
                    cursor.style.borderRadius = "50%";
                }
            }
        };

        window.addEventListener("mousemove", moveCursor);
        const logo = document.getElementById("main-logo");
        const navbar = document.getElementById("navbar");
        const fade = document.querySelector(".video-fade");
        const video = document.getElementById("intro-video");
        const contentSection = document.getElementById("content-section");
        window.scrollTo(0, 0);
        if (video) video.dataset.scrolled = "false";

        const onTimeUpdate = () => {
            // 2. Ensure video duration is loaded before checking
            if (video && video.duration &&
                video.currentTime >= video.duration - 0.5 &&
                video.dataset.scrolled === "false") {

                video.dataset.scrolled = "true";
                contentSection?.scrollIntoView({ behavior: "smooth" });
            }
        };

        video?.addEventListener("timeupdate", onTimeUpdate);

        // Initial Logo Fade In
        const logoTimeout = setTimeout(() => {
            if (window.scrollY === 0) {
                logo?.classList.add("fade-in");
            }
        }, 4500);

        const onScroll = () => {
            const scrollY = window.scrollY;

            const fadeAmount = Math.min(scrollY / 400, 1);
            if (fade) fade.style.opacity = fadeAmount;

            if (scrollY > 100) {
                logo?.classList.add("scrolled");
                logo?.classList.add("fade-in");
                navbar?.classList.add("visible");
            } else {
                logo?.classList.remove("scrolled");
                navbar?.classList.remove("visible");
            }
        };

        // --- Reveal on Scroll Logic ---
        const observerOptions = { threshold: 0.2 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                }
            });
        }, observerOptions);

        // --- Card Tilt Logic ---
        const handleMouseMove = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15; // Sensitivity
            const rotateY = (centerX - x) / 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const handleMouseLeave = (e) => {
            e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        };

        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            observer.observe(card);
            card.addEventListener("mousemove", handleMouseMove);
            card.addEventListener("mouseleave", handleMouseLeave);
        });

        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            video?.removeEventListener("timeupdate", onTimeUpdate);
            clearTimeout(logoTimeout);
            observer.disconnect();
            window.removeEventListener("mousemove", moveCursor);
            cards.forEach((card) => {
                card.removeEventListener("mousemove", handleMouseMove);
                card.removeEventListener("mouseleave", handleMouseLeave);
            });
        }
    }, []);

    return (
        <>
            <div id="custom-cursor"></div>
            <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; cursor: none; }

        #custom-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          border: 2px solid #00d2ff; /* Electric Blue */
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: 
            width 0.3s ease, 
            height 0.3s ease, 
            border-radius 0.3s ease, 
            background 0.3s ease,
            box-shadow 0.3s ease;
          box-shadow: 0 0 10px rgba(0, 210, 255, 0.5);
        }

        /* The "Boundary" state when hovering over nav links */
        #custom-cursor.cursor-boundary {
          background: rgba(0, 210, 255, 0.1);
          border: 1px solid #00d2ff;
          box-shadow: 0 0 20px rgba(0, 210, 255, 0.3);
        }

        html, body {
          width: 100%;
          height: 100%;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #000;
          color: white;
          overflow-x: hidden;
          background-image: url('/images/IEEE-Family.jpg');
          background-attachment: fixed;
          background-size: cover;
          background-position: center;
        }

        .video-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #000;
        }
        
        .video-hero::after {
         content: "";
         position: absolute;
         bottom: 0;
         left: 0;
         width: 100%;
         height: 250px; /* Adjust height for a longer/shorter blend */
         background: linear-gradient(
           to bottom,
           rgba(0, 0, 0, 0) 0%,
           rgba(0, 0, 0, 0.8) 70%,
           rgba(0, 0, 0, 1) 100%
         );
         z-index: 1;
         pointer-events: none;
       }

        #intro-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          outline: none;
          pointer-events: none;
        }

        #intro-video::-webkit-media-controls {
          display: none !important;
        }

        .video-fade {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.1s linear;
        }

        .logo {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          z-index: 1000;
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .logo.fade-in { opacity: 1; }

        .logo.scrolled {
          top: 25px;
          width: 175px;
          transform: translate(-50%, 0);
        }

        nav {
          position: fixed;
          top: 0;
          width: 100%;
          height: 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 50px;
          z-index: 900;
          opacity: 0;
          transition: all 0.4s ease;
          pointer-events: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0);
          background: rgba(0, 0, 0, 0);
        }

        nav.visible {
          opacity: 1;
          pointer-events: all;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-links {
          display: flex;
          gap: 40px;
          list-style: none;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 2px;
          font-weight: 500;
        }

        .content {
          position: relative;
          z-index: 2;
          padding: 150px 10%;
          min-height: 150vh;
          background: linear-gradient(to bottom,
           rgba(0,0,0,1) 0%, 
           rgba(0,0,0,0.6) 50%,
           rgba(0,0,0,0.4) 100%);
        }

        .card {
          background: rgba(10, 10, 10, 0.8); /* Deep dark background */
          padding: 50px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 60px;
          
          /* Reveal Initial State */
          opacity: 0;
          transform: translateY(40px);
          
          /* Smooth Transitions */
          transition: 
            opacity 0.8s ease-out, 
            transform 0.6s cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 0.3s ease;
        }
          .card:hover {
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
        }

        /* The class added by JS when scrolling */
        .card.reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-text-container {
         display: flex;
         flex-direction: column;
         align-items: flex-start; /* Aligned to left as per image */
         text-align: left;
       }
       
       .welcome-tag {
         font-size: 1.5rem;
         letter-spacing: 4px;
         color: #3a7bd5; /* Blue accent from image */
         margin-bottom: 10px;
       }
       
       .main-title {
         font-size: 5rem;
         font-weight: 800;
         margin-bottom: 10px;
       }
       
       .sub-title {
         font-size: 1.8rem;
         color: #3a7bd5;
         margin-bottom: 50px;
         font-style: italic;
       }
       
       /* Button/Card Styling */
       .button-group {
         display: flex;
         gap: 20px;
         margin-bottom: 30px;
       }
       
       .card.btn-card {
         padding: 15px 40px;
         margin-bottom: 0;
         background: rgba(255, 255, 255, 0.05);
         border: 2px solid white;
         border-radius: 8px; /* Sharper techno look */
         min-width: 220px;
         display: flex;
         justify-content: center;
         align-items: center;
       }
       
       .card.btn-card a {
         color: white;
         text-decoration: none;
         font-weight: bold;
         letter-spacing: 1px;
       }
       
       /* Member Link */
       .member-sign-in {
         font-size: 1.1rem;
         color: #ccc;
         margin-top: 10px;
       }
       
       .member-sign-in a {
         color: #fff;
         text-decoration: underline;
       }

        h1 { 
          font-size: 3.5rem; 
          margin-bottom: 20px; 
          background: linear-gradient(to right, #fff 20%, #666 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p { font-size: 1.2rem; line-height: 1.8; color: #ccc; }
      `}</style>

            <div className="video-hero">
                <video
                    id="intro-video"
                    muted
                    playsInline
                    autoPlay
                    loop
                    tabIndex="-1"
                    data-scrolled="false"
                >
                    <source
                        src="https://drive.google.com/file/d/1PlcIj-pSZInr-2kfW9WD4IFb2R3F-ztc/view?usp=drive_link"
                        type="video/mp4"
                    />
                </video>
                <div className="video-fade" />
            </div>

            <img
                src="/images/logo.png"
                alt="Logo"
                className="logo"
                id="main-logo"
            />

            <nav id="navbar">
                <ul className="nav-links">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/IEEEDTU/events">Events</Link></li>
                </ul>
                <ul className="nav-links">
                    <li><Link href="/IEEEDTU/council">Council</Link></li>
                    <li><Link href="/IEEEDTU/about">About us</Link></li>
                </ul>
            </nav>


            <section className="content" id="content-section">
                <div className="hero-text-container">
                    {/* Static Content */}
                    <h3 className="welcome-tag">WELCOME TO</h3>
                    <h1 className="main-title">IEEE DTU <br></br>Student Branch</h1>
                    <p className="sub-title">A World of Limitless Possibilities</p>

                    {/* Animated Blocks */}
                    <div className="button-group">
                        <div className="card btn-card">
                            <Link href="/IEEEDTU/about">MORE ABOUT US</Link>
                        </div>
                        <div className="card btn-card">
                            <Link href="/IEEEDTU/council">CONTACT US</Link>
                        </div>
                    </div>

                    {/* Bottom Link */}
                    <div className="member-sign-in">
                        Already a member? <a onClick={() => setOpenSignIn(true)} style={{ cursor: 'pointer' }}>Sign in here.</a>
                    </div>
                </div>
            </section>

            <Drawer
                anchor="right"
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: "#000",
                        width: { xs: "20rem", sm: "22rem", md: "25rem" },

                    }
                }}
            >
                <Signin />
            </Drawer>
        </>
    );
}