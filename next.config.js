/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 1000,
  swcMinify: true,
  images: {
    domains: [
      'www.countryflagicons.com', 'avatars.githubusercontent.com', 'raw.githubusercontent.com',
      'platform-lookaside.fbsbx.com', 'lh3.googleusercontent.com',
    ],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/lordksix/f1-next-app",
        permanent: false,
      },
      {
        source: "/home",
        destination: "/",
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig
