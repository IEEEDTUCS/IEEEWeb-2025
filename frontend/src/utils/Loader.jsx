import React from 'react';
import styles from './Loader.module.css';  

export default function Loader({ visible }) {
  return (
    <div 
      id="loader" 
      className={`${styles.loaderContainer} ${!visible ? styles.hide : ''}`}
    >
      <img 
        src="/loader/ieee-dtu-logo.svg" 
        alt="logo" 
        className={styles.logo} 
      />
    </div>
  );
}
