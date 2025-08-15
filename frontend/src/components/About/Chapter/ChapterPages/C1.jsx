import React from 'react'
import ChapterNavbar from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterNavbar'
import ChapterImageCarousel from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterImageCarousel'
import ChapterAbout from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterAbout'
import ChapterEvents from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterEvents'
import ChapterMembership from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterMembership'
import ChapterContact from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterContact'

export default function C1() {

   const images = ["https://www.ieeedtu.in/images/group.jpg", "https://www.ieeedtu.in/images/techweek.jpg", "https://www.ieeedtu.in/images/xtreme.jpg", "https://www.ieeedtu.in/images/vihaan.jpg", "https://www.ieeedtu.in/images/vihaan2.jpg"]

  return (
    <>
      <div style={{scrollBehavior: 'smooth', backgroundImage: 'linear-gradient(to bottom, rgba(20, 20, 40, 0.8), rgba(20, 20, 40, 0.8)), url("https://i.pinimg.com/originals/32/10/92/32109263a1c9123d13811ab7374f46c6.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <ChapterNavbar />
        <div style={{marginTop: '1.8rem', 
          fontSize: '3.5rem', 
          display: 'flex', 
          justifyContent: 'center', 
          fontWeight: '600', 
          color: 'white',
          letterSpacing: '0.2rem',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
          }}>IEEE DTU CS CHAPTER
        </div>

        <ChapterImageCarousel images={images} />

        <div style={{margin: '0 auto', padding: '1.25rem', maxWidth:'1200px'}}>
          <div id="about"><ChapterAbout /></div>
          <div id="events"><ChapterEvents /></div>
          <div id="membership"><ChapterMembership /></div>
          <div id="contact"><ChapterContact /></div>
        </div>
      </div>
    </>
  )
}
