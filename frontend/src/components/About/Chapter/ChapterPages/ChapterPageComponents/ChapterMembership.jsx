import React from 'react'
import styles from '@/styles/ChapterInfos.module.css'
import Form from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/Form'

const ChapterMembership = () => {
  return (
    <>
        <div className={styles.infoContainer}>
            <h1 className={styles.infoHeading}>Benefits</h1>
            <p className={styles.infoContentBenefits}>
                IEEE membership offers numerous benefits, including invitations to international conferences, journals, and seminars, with discounts on electronics, workshops, and exclusive competitions like IEEE Xtreme. Members also enjoy access to the IEEE Xplore Library, which contains research from 37 peer-reviewed magazines and over 700,000 documents on various topics.
                <br /><br />
                At IEEE DTU, the experience goes further. You'll join Special Interest Groups (SIGs), explore AI, ML, Arduino, and 3D design, and participate in events like hackathons and Robo races. The hands-on experience, mentorship, and creativity make IEEE DTU more than a club—it's a community of growth and innovation.
            </p>
            <Form />
        </div>
    </>
  )
}

export default ChapterMembership