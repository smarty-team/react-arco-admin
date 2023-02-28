module.exports = {
  async rewrites() {
    return [
      {
        source: '/data-api/:path*',
        destination: process.env.SERVER + '/:path*'
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  }
}