import React, { useState } from 'react'
import styles from '@/styles/ChapterNavbar.module.css'

const ChapterNavbar = ({ ColorScheme }) => {

  const scrollToComponent = (id) => {
    const component = document.getElementById(id);
    if (component) {
      component.scrollIntoView({behavior: 'smooth'});
    }
  }

  console.log(ColorScheme.NavBarButtonBGHover);

  const hoverIn = (e) => { e.currentTarget.style.background = ColorScheme.NavBarButtonBGHover; };

  const hoverOut = (e) => { e.currentTarget.style.background = ColorScheme.NavBarButtonBG; };

  return (
    <>
      {ColorScheme && (
        <div className={styles.chapterNavbar} style={{ background: ColorScheme.CommonComponentBG }} >
          <a
            onClick={() => console.log("Don't forget to link the back button")}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            className={`font-nav ${styles.chapterNavbarLink}`}
            style={{
              position: "fixed",
              left: 0,
              color: ColorScheme.PrimaryTextColor,
              background: ColorScheme.NavBarButtonBG,
            }}
          >
            Placeholder Back
          </a>

          <a
            onClick={() => scrollToComponent("about")}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            className={`font-nav ${styles.chapterNavbarLink}`}
            style={{
              color: ColorScheme.PrimaryTextColor,
              background: ColorScheme.NavBarButtonBG,
            }}
          >
            About Us
          </a>

          <a
            onClick={() => scrollToComponent("events")}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            className={`font-nav ${styles.chapterNavbarLink}`}
            style={{
              color: ColorScheme.PrimaryTextColor,
              background: ColorScheme.NavBarButtonBG,
            }}
          >
            Events
          </a>

          <a
            onClick={() => scrollToComponent("membership")}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            className={`font-nav ${styles.chapterNavbarLink}`}
            style={{
              color: ColorScheme.PrimaryTextColor,
              background: ColorScheme.NavBarButtonBG,
            }}
          >
            Membership
          </a>

          <a
            onClick={() => scrollToComponent("contact")}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            className={`font-nav ${styles.chapterNavbarLink}`}
            style={{
              color: ColorScheme.PrimaryTextColor,
              background: ColorScheme.NavBarButtonBG,
            }}
          >
            Contact
          </a>
        </div>
      )}
    </>

  );
}

export default ChapterNavbar