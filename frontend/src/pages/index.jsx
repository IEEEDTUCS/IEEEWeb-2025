import React from 'react'
import Head from 'next/head'
import LandingPage from "@/components/LandingPage/LandingPage"
import boilerPlate from '@/layout/Boilerplate'

function Home() {
  return (
    <>
      <Head>
        <title>IEEE DTU — Delhi Technological University's Premier Tech Society</title>
        <meta name="description" content="IEEE DTU is the oldest and largest student branch at Delhi Technological University, founded in 1983. Join 300+ active members, attend flagship events like Vihaan, TechWeek, and IEEEXtreme, and grow your career in tech." />
        <meta name="keywords" content="IEEE DTU, Delhi Technological University, IEEE student branch, Vihaan hackathon, TechWeek, IEEEXtreme, CS chapter, WIE, PES-IAS, CASS, engineering society DTU" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ieeedtu.in/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IEEE DTU" />
        <meta property="og:url" content="https://www.ieeedtu.in/" />
        <meta property="og:title" content="IEEE DTU — Delhi Technological University's Premier Tech Society" />
        <meta property="og:description" content="IEEE DTU is the oldest and largest student branch at Delhi Technological University, founded in 1983. Join 300+ active members, attend flagship events like Vihaan, TechWeek, and IEEEXtreme." />
        <meta property="og:image" content="https://www.ieeedtu.in/images/logo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dtu_ieee" />
        <meta name="twitter:title" content="IEEE DTU — Delhi Technological University's Premier Tech Society" />
        <meta name="twitter:description" content="IEEE DTU is the oldest and largest student branch at DTU. Join us for hackathons, workshops, and more." />
        <meta name="twitter:image" content="https://www.ieeedtu.in/images/logo.png" />

        {/* Structured Data — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "IEEE DTU Student Branch",
              "alternateName": "IEEE DTU",
              "url": "https://www.ieeedtu.in",
              "logo": "https://www.ieeedtu.in/images/logo.png",
              "description": "IEEE DTU is the oldest and largest student branch at Delhi Technological University, founded in 1983. It hosts flagship events like Vihaan hackathon, TechWeek, and IEEEXtreme.",
              "foundingDate": "1983",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Shahbad Daulatpur, Main Bawana Road",
                "addressLocality": "Delhi",
                "postalCode": "110042",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://www.instagram.com/ieee.dtu/",
                "https://www.linkedin.com/company/ieee-dtu/",
                "https://www.facebook.com/ieeedtu",
                "https://twitter.com/dtu_ieee"
              ]
            })
          }}
        />
      </Head>
      <LandingPage />
    </>
  )
}

export default boilerPlate(Home)

