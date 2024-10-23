/** @type {import('next').NextConfig} */
import { resolve } from 'path';

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  cacheHandler: resolve('./cache-handler.js'),
  cacheMaxMemorySize: 0,

  // Add the headers function for CORS
  async headers() {
    return [
      {
        // This will apply the headers to all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://divinemenswear.com/" }, // You can replace "*" with your domain if needed
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ];
  }
};

export default nextConfig;
