import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    ENV: process.env.ENV,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hackathon.8848digitalerp.com',
      },
    ],
  },
};

export default nextConfig;
