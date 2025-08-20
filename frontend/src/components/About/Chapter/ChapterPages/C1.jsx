import React from 'react'
import ChapterNavbar from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterNavbar'
import ChapterImageCarousel from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterImageCarousel'
import ChapterContact from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterContact'
import ChapterCommonComponent from './ChapterPageComponents/ChapterCommonComponent'


export default function C1({ ChapterInformation }) {

  return (
    <>
      { ChapterInformation &&
      <div style={{scrollBehavior: 'smooth', backgroundImage: `linear-gradient(rgba(10, 10, 20, 0.7), rgba(10, 10, 20, 0.7)), url(${ChapterInformation.backdropImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <ChapterNavbar ColorScheme={ChapterInformation.ColorSchemes} />
        <div className="font-heading" style={{marginTop: '3.5rem', 
          paddingTop: '2rem',
          fontSize: '3.5rem', 
          display: 'flex', 
          justifyContent: 'center', 
          fontWeight: '600', 
          color: 'white',
          letterSpacing: '0.2rem',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
          }}>{ChapterInformation.title}
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
