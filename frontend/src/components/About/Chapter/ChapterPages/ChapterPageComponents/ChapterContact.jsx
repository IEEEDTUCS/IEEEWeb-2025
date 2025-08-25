import React from 'react'
import styles from '@/styles/ChapterInfos.module.css'

const ChapterContact = ({ ContactInformation, ColorScheme }) => {
  return (
    <>
        { ContactInformation &&
        <div className={styles.contactBox} style={{ backgroundColor: ColorScheme.ContactBoxBG }}>
            { ContactInformation.email && <h2 className={`font-caption ${styles.contactInfo}`} style={{ color: ColorScheme.ContactBoxTextColor }}>
                Contact us at: <a href={`mailto:${ContactInformation.email}`} style={{color: ColorScheme.MailTextColor}}>{ContactInformation.email}</a></h2> }
            <h2 className={`font-caption ${styles.contactInfo}`} style={{ color: ColorScheme.ContactBoxTextColor }}>Follow us on: </h2>
            <div className={styles.socialIconsContainer}>
                <a href="https://www.instagram.com/ieee.dtu/" target="_blank">
                    <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="IG" height={'40'} width={'40'}/>
                </a>
                <a href="https://www.linkedin.com/company/ieee-dtu/" target="_blank">
                    <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="IG" height={'40'} width={'40'}/>
                </a>
            </div>
        </div>
        }
    </>
  )
}

export default ChapterContact
