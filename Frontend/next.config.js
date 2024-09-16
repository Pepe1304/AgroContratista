/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/auth/container',
            permanent: true,
          },
        ]
      }
}

module.exports = nextConfig

