/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'th.bing.com',
      'tse1.mm.bing.net',
      'tse2.mm.bing.net',
      'tse3.mm.bing.net',
      'tse4.mm.bing.net',
      // Ajoutez d'autres domaines si nécessaire
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.bing.com',
      },
      {
        protocol: 'https',
        hostname: '**.bing.net',
      },
    ],
  },
};

export default nextConfig;