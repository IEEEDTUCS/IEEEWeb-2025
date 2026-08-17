import React from 'react'
import Head from 'next/head'
import CS from '@/components/About/Chapter/ChapterPages/ChapterRoutes'
import Boilerplate from '@/layout/Boilerplate'
import ChapterInfo from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterInfo'

function ChapterCS() {
  return (
    <>
      <Head>
        <title>CS Chapter — IEEE DTU Computer Society</title>
        <meta name="description" content="IEEE DTU Computer Society — a hub for computer science innovation at DTU. We organize Vihaan (India's largest student hackathon), IEEEXtreme, Microhacks, Bulls N' Bears, and TechWeek. Join us to code, collaborate, and grow." />
        <meta name="keywords" content="IEEE DTU CS Chapter, Computer Society DTU, Vihaan hackathon, IEEEXtreme DTU, TechWeek, DTU coding club" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ieeedtu.in/IEEEDTU/Chapters/CS" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ieeedtu.in/IEEEDTU/Chapters/CS" />
        <meta property="og:title" content="CS Chapter — IEEE DTU Computer Society" />
        <meta property="og:description" content="IEEE DTU Computer Society organizes Vihaan — India's largest student hackathon — along with IEEEXtreme, Microhacks, and TechWeek at Delhi Technological University." />
        <meta property="og:image" content="https://www.ieeedtu.in/aboutPage/aboutChapterSection/CS_IEEE.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CS Chapter — IEEE DTU Computer Society" />
        <meta name="twitter:description" content="IEEE DTU CS Chapter: Vihaan hackathon, IEEEXtreme, Microhacks, TechWeek and more at Delhi Technological University." />
        <meta name="twitter:image" content="https://www.ieeedtu.in/aboutPage/aboutChapterSection/CS_IEEE.png" />
      </Head>
      <CS ChapterInformation={ChapterInfo.CS} />
    </>
  )
}

export default Boilerplate(ChapterCS)