import React from 'react'
import styles from '@/styles/ChapterInfos.module.css'

const Form = () => {
  return (
    <>
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <h1 className={styles.formMessage}>Be Part of the IEEE-DTU Family</h1>
            <a href='https://docs.google.com/forms/d/e/1FAIpQLScdVzhcEbKrc61Y3aUzhK1NTybm7MpRfYNBvNAHSzV1tTpBzA/viewform' target='_blank' className={styles.formButton}>Join Now</a>
        </div>
    </>
  )
}

export default Form