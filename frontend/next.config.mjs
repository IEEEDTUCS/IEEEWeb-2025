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
        permanent: true,
      },
      {
        source: "/membership/mv",
        destination: "https://forms.gle/Vth12GpyEm3R5JnK8",
        permanent: true,
      },
      {
        source: "/membership/dk",
        destination: "https://forms.gle/sqojujXjTDqt8o3w6",
        permanent: true,
      },
      {
        source: "/membership/ha",
        destination: "https://forms.gle/kBNFNn9zLK6Cw5Z28",
        permanent: true,
      },
      {
        source: "/membership/st",
        destination: "https://forms.gle/bX1UzxhoJ1LaVxSQA",
        permanent: true,
      },
      {
        source: "/membership/sc",
        destination: "https://forms.gle/Rg52EuWEWsePLAuZ6",
        permanent: true,
      },
      {
        source: "/membership/pj",
        destination: "https://forms.gle/WawEbxFebNGfEC2p6",
        permanent: true,
      },
      {
        source: "/membership/bg",
        destination: "https://forms.gle/wxCJ2dqZhGXDwRU28",
        permanent: true,
      },
      {
        source: "/membership/vr",
        destination: "https://forms.gle/HjgYxhEGMsvKczy3A",
        permanent: true,
      },
      {
        source: "/membership/sv",
        destination: "",
        permanent: true,
      },
      {
        source: "/membership/mk",
        destination: "",
        permanent: true,
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
