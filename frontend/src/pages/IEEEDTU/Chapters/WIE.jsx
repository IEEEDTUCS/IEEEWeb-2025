import React from 'react'
import Head from 'next/head'
import WIE from '@/components/About/Chapter/ChapterPages/ChapterRoutes'
import Boilerplate from '@/layout/Boilerplate'
import ChapterInfo from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterInfo'

function ChapterWIE() {
  return (
    <>
      <Head>
        <title>WIE Chapter — IEEE DTU Women in Engineering</title>
        <meta name="description" content="IEEE DTU Women in Engineering (WIE) promotes and empowers women in STEM at Delhi Technological University. We run WIEVEK — an NGO outreach program — and co-organize Vihaan, India's largest student hackathon." />
        <meta name="keywords" content="IEEE DTU WIE, Women in Engineering DTU, WIEVEK, women in STEM, Vihaan hackathon, IEEE WIE Delhi" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ieeedtu.in/IEEEDTU/Chapters/WIE" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ieeedtu.in/IEEEDTU/Chapters/WIE" />
        <meta property="og:title" content="WIE Chapter — IEEE DTU Women in Engineering" />
        <meta property="og:description" content="IEEE DTU WIE promotes women in STEM through WIEVEK (NGO outreach), Vihaan hackathon, and mentorship programs at Delhi Technological University." />
        <meta property="og:image" content="https://www.ieeedtu.in/aboutPage/aboutChapterSection/WIE_IEEE.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WIE Chapter — IEEE DTU Women in Engineering" />
        <meta name="twitter:description" content="IEEE DTU WIE promotes women in STEM through WIEVEK, Vihaan, and mentorship at Delhi Technological University." />
        <meta name="twitter:image" content="https://www.ieeedtu.in/aboutPage/aboutChapterSection/WIE_IEEE.png" />
      </Head>
      <WIE ChapterInformation={ChapterInfo.WIE} />
    </>
  )
}

export default Boilerplate(ChapterWIE)