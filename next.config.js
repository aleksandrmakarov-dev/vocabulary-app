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
      {
        hostname: "storage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
