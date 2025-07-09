const withVideos = require('next-videos');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withVideos(nextConfig);