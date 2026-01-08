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
      // For SEO migration, handle redirects from old domain at the hosting/DNS level
      // Do NOT use next.config redirects as they cause infinite loops when redirecting to the same domain
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
