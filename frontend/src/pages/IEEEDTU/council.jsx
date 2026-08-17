import boilerPlate from '@/layout/Boilerplate'
import React from 'react'
import Head from 'next/head'
import Council from '@/components/Council/council'
import Testimonials from '@/components/Council/testimonials'

function council() {
  return (
    <>
      <Head>
        <title>Council — IEEE DTU</title>
        <meta name="description" content="Meet the IEEE DTU Student Branch council — the chairpersons, secretaries, heads, and chapter leads driving innovation and technical excellence at Delhi Technological University." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ieeedtu.in/IEEEDTU/council" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ieeedtu.in/IEEEDTU/council" />
        <meta property="og:title" content="Council — IEEE DTU" />
        <meta property="og:description" content="Meet the IEEE DTU council — the team driving innovation, events, and technical excellence at Delhi Technological University." />
        <meta property="og:image" content="https://www.ieeedtu.in/images/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Council — IEEE DTU" />
        <meta name="twitter:description" content="Meet the IEEE DTU council — the team behind Vihaan, TechWeek, IEEEXtreme and more." />
      </Head>
      <div><Council /></div>
      <div><Testimonials /></div>
    </>
  )
}

export default boilerPlate(council)