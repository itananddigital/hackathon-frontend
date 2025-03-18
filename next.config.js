// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BASE_URL: process.env.BASE_URL,
      ENV: process.env.ENV,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8002',
          // pathname: '/account123/**',
          // search: '',
        },
      ],
    },
  }
  
  module.exports = nextConfig