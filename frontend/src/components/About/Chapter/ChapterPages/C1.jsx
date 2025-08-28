import React from 'react'
import ChapterImageCarousel from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterImageCarousel'
import ChapterContact from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterContact'
import ChapterCommonComponent from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterCommonComponent'
import styles from "@/styles/ChapterInfos.module.css"


export default function C1({ ChapterInformation }) {

  return (
    <>
      { ChapterInformation &&
      <div style={{
    scrollBehavior: 'smooth',
    backgroundImage: `linear-gradient(rgba(10, 10, 20, 0.2), rgba(10, 10, 20, 0.2)), url(${ChapterInformation.logo}),
      url(${ChapterInformation.backdropImg})`}} className={styles.chapterBackdrop} >

        <div className={`font-heading ${styles.chapterTitle}`} style={{color: ChapterInformation.ColorSchemes.TitleColor}} >{ChapterInformation.title}
        </div>

        <ChapterImageCarousel images={ChapterInformation.images} />

        <div style={{margin: '0 auto', padding: '1.25rem', maxWidth:'1200px'}}>
          <div id="about">< ChapterCommonComponent ComponentInformation={ChapterInformation.about} ColorScheme={ChapterInformation.ColorSchemes} /></div>

          <div id="events">< ChapterCommonComponent ComponentInformation={ChapterInformation.events} ColorScheme={ChapterInformation.ColorSchemes} /></div>

          <div id="membership">< ChapterCommonComponent ComponentInformation={ChapterInformation.membership} ColorScheme={ChapterInformation.ColorSchemes} /></div>

          <div id="contact"><ChapterContact ContactInformation={ChapterInformation.contact} ColorScheme={ChapterInformation.ColorSchemes} /></div>
      </div> 

      </div>
      }
    </>
  )
}
