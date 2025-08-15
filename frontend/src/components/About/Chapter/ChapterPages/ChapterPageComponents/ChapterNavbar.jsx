import React from 'react'
import styles from '@/styles/ChapterNavbar.module.css'

const ChapterNavbar = () => {

  const scrollToComponent = (id) => {
    const component = document.getElementById(id);
    if (component) {
      component.scrollIntoView({behavior: 'smooth'});
    }
  }

  return (
    <div className={styles.chapterNavbar}>
      <a  onClick={() => console.log("Don't forget to link the back button")} className={styles.chapterNavbarLink} style={{position: 'fixed', left: '0'}}>Placeholder Back</a>
      <a  onClick={() => scrollToComponent('about')} className={styles.chapterNavbarLink}>About Us</a>
      <a  onClick={() => scrollToComponent('events')} className={styles.chapterNavbarLink}>Events</a>
      <a  onClick={() => scrollToComponent('membership')} className={styles.chapterNavbarLink}>Membership</a>
      <a  onClick={() => scrollToComponent('contact')} className={styles.chapterNavbarLink}>Contact</a>
    </div>
  )
}

export default ChapterNavbar