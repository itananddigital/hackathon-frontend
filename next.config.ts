import type { NextConfig } from "next";
import { CONSTANTS } from "./lib/api/app-config";

const nextConfig: NextConfig = {
  env: {
    BASE_URL: CONSTANTS.API_BASE_URL,
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
