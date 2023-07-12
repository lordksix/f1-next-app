/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 1000,
  swcMinify: true,
  images: {
    domains: ['www.countryflagicons.com', 'avatars.githubusercontent.com', 'raw.githubusercontent.com'],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/lordksix/f1-next-app",
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig
