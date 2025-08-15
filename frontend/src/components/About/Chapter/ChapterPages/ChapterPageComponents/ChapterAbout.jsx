import React from 'react'
import styles from '@/styles/ChapterInfos.module.css'

const ChapterAbout = () => {
  return (
    <>
        <div className={styles.infoContainer}>
            <h1 className={styles.infoHeading}>About Us</h1>
            <p className={styles.infoContent}>
                The IEEE Computer Society stands as the premier source for information, inspiration, and collaboration in computer science and engineering. It is a vibrant community of passionate individuals united by their deep enthusiasm for computer science. Together, they collaborate on projects, foster mutual growth, and drive innovation within the field. At IEEE DTU Computer Society, we've organized several flagship events, including Microhacks, IEEEXtreme, and Bulls N' Bears. We're also proud to host Vihaan, India's largest student-run hackathon, which garnered over 5,000 registrations last year.
            </p>
        </div>
    </>
  )
}

export default ChapterAbout