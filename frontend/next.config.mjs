import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence the "multiple lockfiles" workspace root warning on Vercel
  outputFileTracingRoot: path.join(__dirname, "../"),
  async redirects() {
    return [
      {
        source: "/join",
        destination: "https://forms.gle/z3ck5AwGbxVdSNqK7",
        permanent: false,
      },
      {
        source: "/membership/mv",
        destination: "https://forms.gle/Vth12GpyEm3R5JnK8",
        permanent: false,
      },
      {
        source: "/membership/dk",
        destination: "https://forms.gle/sqojujXjTDqt8o3w6",
        permanent: false,
      },
      {
        source: "/membership/ha",
        destination: "https://forms.gle/kBNFNn9zLK6Cw5Z28",
        permanent: false,
      },
      {
        source: "/membership/st",
        destination: "https://forms.gle/bX1UzxhoJ1LaVxSQA",
        permanent: false,
      },
      {
        source: "/membership/sc",
        destination: "https://forms.gle/Rg52EuWEWsePLAuZ6",
        permanent: false,
      },
      {
        source: "/membership/pj",
        destination: "https://forms.gle/WawEbxFebNGfEC2p6",
        permanent: false,
      },
      {
        source: "/membership/bg",
        destination: "https://forms.gle/wxCJ2dqZhGXDwRU28",
        permanent: false,
      },
      {
        source: "/membership/vr",
        destination: "https://forms.gle/HjgYxhEGMsvKczy3A",
        permanent: false,
      },
      {
        source: "/membership/sv",
        destination: "https://docs.google.com/forms/d/e/1FAIpQLScP6VuH42ZrT9mvT-AZ5_U0UwVz9YNdNcbYJccZyaJczrm1Yw/viewform",
        permanent: false,
      },
      {
        source: "/membership/mk",
        destination: "https://forms.gle/n7NhpyfyXFBkVJ25A",
        permanent: false,
      },
      {
        source: "/ieee-day/wa",
        destination: "https://chat.whatsapp.com/Ipcctb9lkgpGWhk9W3waJq",
        permanent: false,
      },
      {
        source: "/ieee-day/register",
        destination: "https://unstop.com/college-fests/ieee-day-2026-delhi-technological-university-dtu-new-delhi-514223",
        permanent: false,
      },
      // Short, event-specific URLs can point at the reusable linktree route.
      {
        source: "/ieee-day/linktree",
        destination: "/linktree/ieee-day",
        permanent: false,
      },
    ]
  },

  async rewrites() {
    return [
      {
        source: "/api/chatbot/:path*",
        destination: "http://localhost:5000/api/chatbot/:path*",
      },
    ];
  },
};

export default nextConfig;
