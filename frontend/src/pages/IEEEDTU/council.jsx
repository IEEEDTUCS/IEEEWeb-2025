import boilerPlate from '@/layout/Boilerplate';
import React from 'react';
import Head from 'next/head';
import Council from '@/components/Council/council';
import Testimonials from '@/components/Council/testimonials';
import SmoothScroll from '@/components/Common/SmoothScroll';

function CouncilPage() {
  return (
    <SmoothScroll>
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
      <div className="relative bg-black min-h-screen text-white selection:bg-blue-600 selection:text-white overflow-hidden">
        {/* Ambient depth lighting orbs */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[5%] left-[-15%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.07] blur-[170px]" />
          <div className="absolute top-[45%] right-[-15%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.06] blur-[180px]" />
          <div className="absolute bottom-[10%] left-[10%] w-[550px] h-[550px] rounded-full bg-sky-600/[0.05] blur-[150px]" />
        </div>
        <div className="relative z-10"><Council /></div>
        <div className="relative z-10"><Testimonials /></div>
      </div>
    </SmoothScroll>
  );
}

export default boilerPlate(CouncilPage);