import React from 'react'
import styles from '@/styles/ChapterInfos.module.css'

const ChapterContact = () => {
  return (
    <>
        <div className={styles.contactBox}>
            <h2 className={styles.contactInfo}>Contact us at: <a href="mailto:cs.ieeedtu@gmail.com" style={{color: '#6a6aff'}}>cs.ieeedtu@gmail.com</a></h2>
            <h2 className={styles.contactInfo}>Follow us on: </h2>
            <div className={styles.socialIconsContainer}>
                <a href="https://www.instagram.com/ieee.dtu/" target="_blank">
                    <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="IG" height={'40'} width={'40'}/>
                </a>
                <a href="https://www.linkedin.com/company/ieee-dtu/" target="_blank">
                    <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="IG" height={'40'} width={'40'}/>
                </a>
            </div>
        </div>
    </>
  )
}

export default ChapterContact