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
      }
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
