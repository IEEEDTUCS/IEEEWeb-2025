import React from 'react'
import Head from 'next/head'
import PES_IAS from '@/components/About/Chapter/ChapterPages/ChapterRoutes'
import Boilerplate from '@/layout/Boilerplate'
import ChapterInfo from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterInfo'

function ChapterPES_IAS() {
  return (
    <>
      <Head>
        <title>PES-IAS Chapter — IEEE DTU Power & Energy Society</title>
        <meta name="description" content="IEEE DTU PES-IAS Chapter advances power systems and industrial applications at Delhi Technological University. We host TinkerCase (Arduino showcase), robotics SIGs, and workshops on power electronics and sustainable energy." />
        <meta name="keywords" content="IEEE DTU PES-IAS, Power Energy Society DTU, TinkerCase, Arduino DTU, industrial applications, power electronics Delhi" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ieeedtu.in/IEEEDTU/Chapters/PES-IAS" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ieeedtu.in/IEEEDTU/Chapters/PES-IAS" />
        <meta property="og:title" content="PES-IAS Chapter — IEEE DTU Power & Energy Society" />
        <meta property="og:description" content="IEEE DTU PES-IAS advances power systems and industrial applications through TinkerCase, robotics SIGs, and workshops at Delhi Technological University." />
        <meta property="og:image" content="https://www.ieeedtu.in/aboutPage/aboutChapterSection/PES_IEEE.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PES-IAS Chapter — IEEE DTU Power & Energy Society" />
        <meta name="twitter:description" content="IEEE DTU PES-IAS: TinkerCase Arduino showcase, robotics workshops, and power systems events at Delhi Technological University." />
        <meta name="twitter:image" content="https://www.ieeedtu.in/aboutPage/aboutChapterSection/PES_IEEE.png" />
      </Head>
      <PES_IAS ChapterInformation={ChapterInfo.PES_IAS} />
    </>
  )
}

export default Boilerplate(ChapterPES_IAS)