import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence the "multiple lockfiles" workspace root warning on Vercel
  outputFileTracingRoot: path.join(__dirname, "../"),

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
