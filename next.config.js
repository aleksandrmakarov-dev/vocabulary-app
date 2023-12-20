/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pixabay.com",
      },
      {
        hostname: "cdn.pixabay.com",
      },
    ],
  },
};

module.exports = nextConfig;
