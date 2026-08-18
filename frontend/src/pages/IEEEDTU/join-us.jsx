import boilerPlate from '@/layout/Boilerplate';
import React from 'react';
import Head from 'next/head';
import JoinUs from '@/components/Join-us/Join' ;

function JoinUsPage() {
  return (
    <>
      <Head>
        <title>Join Us — IEEE DTU</title>

        <meta
          name="description"
          content="IEEE DTU Student Branch Enquiry Form"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://www.ieeedtu.in/IEEEDTU/join-us"
        />
      </Head>

      <JoinUs />
    </>
  );
}

export default boilerPlate(JoinUsPage);