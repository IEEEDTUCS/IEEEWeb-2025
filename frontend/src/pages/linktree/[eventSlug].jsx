import Head from "next/head";
import Linktree from "@/components/Linktree/Linktree";
import { getLinktree } from "@/data/linktrees";

export default function EventLinktree({ linktree }) {
  const canonicalUrl = `https://www.ieeedtu.in/linktree/${linktree.slug}`;

  return (
    <>
      <Head>
        <title>{linktree.title} | IEEE DTU</title>
        <meta name="description" content={linktree.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${linktree.title} | IEEE DTU`} />
        <meta property="og:description" content={linktree.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`https://www.ieeedtu.in${linktree.eventLogo || "/IEEE_DTU_Logo.png"}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Linktree linktree={linktree} />
    </>
  );
}

export function getServerSideProps({ params }) {
  const linktree = getLinktree(params.eventSlug);

  if (!linktree) {
    return { notFound: true };
  }

  return { props: { linktree } };
}
