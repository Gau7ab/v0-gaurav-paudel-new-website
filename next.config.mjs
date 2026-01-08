/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  redirects: async () => {
    return [
      {
        source: '/:path*',
        destination: 'https://omgaurav.com.np/:path*',
        permanent: true,
        basePath: false,
      },
    ]
  },
  rewrites: async () => {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default nextConfig
