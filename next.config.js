/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  productionBrowserSourceMaps: true,
  logging: {
    fetches: {
      fullUrl: true
    },
    level: "verbose"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**/*',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '**/*',
      }
    ]
  }
}

module.exports = nextConfig
