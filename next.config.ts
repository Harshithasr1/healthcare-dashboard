import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
      return [
          {
              source: '/:path*',
              headers: [
                  {
                      key: 'Content-Security-Policy',
                      value: `
                        default-src 'self';
                        script-src 'self' 'unsafe-inline' 'unsafe-eval';
                        style-src 'self' 'unsafe-inline';
                        img-src 'self' https://fedskillstest.ct.digital;
                        font-src 'self';
                        connect-src 'self' https://fedskillstest.coalitiontechnologies.workers.dev;
                      `.replace(/\s+/g, ' ').trim()
                  },
              ],
          },
      ];
  },
  env: {
    NEXT_PUBLIC_API_USERNAME: process.env.NEXT_PUBLIC_API_USERNAME,
    NEXT_PUBLIC_API_PASSWORD: process.env.NEXT_PUBLIC_API_PASSWORD,
  },
};

export default nextConfig;
