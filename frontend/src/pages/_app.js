import "@/styles/globals.css";
import  Head  from "next/head";

export default function App({ Component, pageProps }) {
  return (
  <>
    <Head>
    <title>IEEE DTU</title>
    </Head>

  <Component {...pageProps} />
  </>
  );
}
