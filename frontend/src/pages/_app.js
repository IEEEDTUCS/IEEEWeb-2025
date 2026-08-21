import "@/styles/globals.css";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Fallback meta — individual pages override these via next/head */}
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/IEEE_DTU_Logo.png" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
