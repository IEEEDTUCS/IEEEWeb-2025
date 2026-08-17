import React from 'react'
import Head from 'next/head'
import CASS from '@/components/About/Chapter/ChapterPages/ChapterRoutes'
import Boilerplate from '@/layout/Boilerplate'
import ChapterInfo from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterInfo'

function ChapterCASS() {
  return (
    <>
      <Head>
        <title>CASS Chapter — IEEE DTU Circuits & Systems Society</title>
        <meta name="description" content="IEEE DTU CASS Chapter advances circuits, systems, and signal processing at Delhi Technological University. We run workshops on VLSI, embedded systems, and electronics, and participate in international IEEE symposiums." />
        <meta name="keywords" content="IEEE DTU CASS, Circuits and Systems Society DTU, VLSI, embedded systems, electronics DTU, IEEE CASS Delhi" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ieeedtu.in/IEEEDTU/Chapters/CASS" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ieeedtu.in/IEEEDTU/Chapters/CASS" />
        <meta property="og:title" content="CASS Chapter — IEEE DTU Circuits & Systems Society" />
        <meta property="og:description" content="IEEE DTU CASS advances circuits and embedded systems at DTU through workshops, seminars, and participation in international IEEE events." />
        <meta property="og:image" content="https://www.ieeedtu.in/aboutPage/aboutChapterSection/CASS_IEEE.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CASS Chapter — IEEE DTU Circuits & Systems Society" />
        <meta name="twitter:description" content="IEEE DTU CASS: circuits, embedded systems, VLSI workshops and international symposiums at Delhi Technological University." />
        <meta name="twitter:image" content="https://www.ieeedtu.in/aboutPage/aboutChapterSection/CASS_IEEE.png" />
      </Head>
      <CASS ChapterInformation={ChapterInfo.CASS} />
    </>
  )
}

export default Boilerplate(ChapterCASS)