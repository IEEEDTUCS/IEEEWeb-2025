import React from 'react';
import styles from './Loader.module.css';  

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <img 
        src="/loader/ieee-dtu-logo.svg" 
        alt="logo" 
        className={styles.logo} 
      />
    </div>
  );
}
