import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /**
   * Local development subdomain rewrites.
   *
   * In production, Vercel wildcard domains handle *.hylthcare.com → this app
   * and the middleware does the rewrite. In dev we need next.config rewrites
   * because the browser hits localhost and we can't set up real wildcard DNS.
   *
   * Example: GET drsmith.localhost:3000/ is rewritten to /drsmith internally.
   *
   * NOTE: You also need to add entries to your /etc/hosts (Windows: C:\Windows\System32\drivers\etc\hosts):
   *   127.0.0.1  drsmith.localhost
   *   127.0.0.1  cityclinic.localhost
   *   (one line per slug you want to test locally)
   */
  async rewrites() {
    return [
      {
        // Match requests from *.localhost:3000
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<slug>[^.]+)\\.localhost',
          },
        ],
        destination: '/:slug/:path*',
      },
    ]
  },

  // Allow images from Supabase Storage and common CDNs
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.in',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig

