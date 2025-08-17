/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
    // Or, for older Next.js:
    // domains: ['picsum.photos'],
  },
};

export default nextConfig;
