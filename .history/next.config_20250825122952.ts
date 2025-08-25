/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'tse4.mm.bing.net',
      'tse1.mm.bing.net',
      'tse2.mm.bing.net',
      'tse3.mm.bing.net',
      // Ajoutez d'autres domaines Bing si nécessaire
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.bing.net',
        port: '',
        pathname: '/th/id/**',
      },
    ],
  },
};

export default nextConfig;