import boilerPlate from '@/layout/Boilerplate'
import React from 'react'
import Head from 'next/head'
import Events from '@/components/Events/Events'

function EventsPage() {
  return (
    <>
      <Head>
        <title>Events — IEEE DTU</title>
        <meta name="description" content="Explore all events organized by IEEE DTU — from Vihaan (India's largest student hackathon) and IEEEXtreme to TechWeek workshops, CodeCrunchML, MIST, and more." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ieeedtu.in/IEEEDTU/events" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ieeedtu.in/IEEEDTU/events" />
        <meta property="og:title" content="Events — IEEE DTU" />
        <meta property="og:description" content="Explore all events organized by IEEE DTU — Vihaan hackathon, IEEEXtreme, TechWeek workshops, and more throughout the year." />
        <meta property="og:image" content="https://www.ieeedtu.in/images/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Events — IEEE DTU" />
        <meta name="twitter:description" content="Explore all events organized by IEEE DTU — Vihaan hackathon, IEEEXtreme, TechWeek workshops, and more." />
      </Head>
      <Events />
    </>
  )
}

export default boilerPlate(EventsPage)