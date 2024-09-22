/** @type {import('next').NextConfig} */
import { resolve } from 'path';

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  cacheHandler: resolve('./cache-handler.js'),
  cacheMaxMemorySize: 0,
};

export default nextConfig;
