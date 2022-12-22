module.exports = {
  async rewrites() {
    return [
      {
        source: '/data-api/:path*',
        destination: 'http://localhost:3000/:path*'
      }
    ]
  },
}