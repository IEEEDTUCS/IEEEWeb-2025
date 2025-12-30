/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/chatbot/:path*",
        destination: "http://localhost:5000/api/chatbot/:path*"
      }
    ];
  }
};

export default nextConfig;

