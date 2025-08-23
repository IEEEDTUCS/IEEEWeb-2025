import React, { useState } from "react";
import { Menu, X, Undo2 } from "lucide-react";
import styles from "@/styles/ChapterInfos.module.css";

const ChapterNavbar = ({ ColorScheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToComponent = (id) => {
    const component = document.getElementById(id);
    if (component) {
      component.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const hoverIn = (e) => {
    e.currentTarget.style.background = ColorScheme.NavBarButtonBGHover;
  };

  const hoverOut = (e) => {
    e.currentTarget.style.background = ColorScheme.NavBarButtonBG;
  };

  return (
    <>
      {ColorScheme && (
        <nav
          className={styles.chapterNavbar}
          style={{ background: ColorScheme.CommonComponentBG }}
        >
          {/* Back button */}
          <a
            onClick={() => console.log("Don't forget to link the back button")}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            className={`font-nav ${styles.chapterNavbarLink}`}
            style={{ position: "fixed", left: 0, color: ColorScheme.PrimaryTextColor, background: ColorScheme.NavBarButtonBG, }}
          > <Undo2 size={22} /> </a>

          {/* Desktop links */}
          <div className={styles.desktopLinks}>
            <a
              onClick={() => scrollToComponent("about")}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
              className={`font-nav ${styles.chapterNavbarLink}`}
              style={{ color: ColorScheme.PrimaryTextColor, background: ColorScheme.NavBarButtonBG, }}
            > About Us </a>

            <a
              onClick={() => scrollToComponent("events")}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
              className={`font-nav ${styles.chapterNavbarLink}`}
              style={{ color: ColorScheme.PrimaryTextColor, background: ColorScheme.NavBarButtonBG, }}
            > Events </a>

            <a
              onClick={() => scrollToComponent("membership")}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
              className={`font-nav ${styles.chapterNavbarLink}`}
              style={{ color: ColorScheme.PrimaryTextColor, background: ColorScheme.NavBarButtonBG, }}
            > Membership </a>

            <a
              onClick={() => scrollToComponent("contact")}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
              className={`font-nav ${styles.chapterNavbarLink}`}
              style={{ color: ColorScheme.PrimaryTextColor, background: ColorScheme.NavBarButtonBG, }}
            > Contact </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
          {/* Hamburger menu */}
          <div>
          <button className={styles.mobileMenuBtn}  style={{background: ColorScheme.NavBarButtonBG}} onClick={() => setIsOpen(!isOpen)}> 
            {isOpen ? <X size={26} color={ColorScheme.PrimaryTextColor} /> : <Menu size={26} color={ColorScheme.PrimaryTextColor} />} 
          </button>
          </div>

          {/* Mobile links */}
          {isOpen && (
            <div className={styles.mobileLinks}>
              <a onClick={() => scrollToComponent("about")} className={`font-nav ${styles.chapterNavbarLink}`}
              style={{ color: ColorScheme.PrimaryTextColor, background: ColorScheme.NavBarButtonBG, }}> About Us </a>
              <a onClick={() => scrollToComponent("events")} className={`font-nav ${styles.chapterNavbarLink}`}
              style={{ color: ColorScheme.PrimaryTextColor, background: ColorScheme.NavBarButtonBG, }}> Events </a>
              <a onClick={() => scrollToComponent("membership")} className={`font-nav ${styles.chapterNavbarLink}`}
              style={{ color: ColorScheme.PrimaryTextColor, background: ColorScheme.NavBarButtonBG, }}> Membership </a>
              <a onClick={() => scrollToComponent("contact")} className={`font-nav ${styles.chapterNavbarLink}`}
              style={{ color: ColorScheme.PrimaryTextColor, background: ColorScheme.NavBarButtonBG, }}> Contact </a>
            </div>
          )}
          </div>
        </nav>
      )}
    </>
  );
};

export default ChapterNavbar;


