/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/data-api/:path*',
        destination: 'http://localhost:3000/:path*'
      }
    ]
  },
}

module.exports = nextConfig
