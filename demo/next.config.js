/** @type {import('next').NextConfig} */
const path = require('path');
const semi = require("@douyinfe/semi-next").default({});

const nextConfig = semi({
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };
    return config;
  },
  images: {
    domains: ["localhost"],
  },
})

module.exports = nextConfig
