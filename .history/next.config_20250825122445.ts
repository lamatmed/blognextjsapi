/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',           // Pour le développement local
      'res.cloudinary.com',  // Si vous utilisez Cloudinary
      'images.unsplash.com', // Si vous utilisez Unsplash
      'via.placeholder.com', // Pour les images de placeholder
      // Ajoutez ici d'autres domaines que vous utilisez pour les images
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Autorise tous les domaines HTTPS - À utiliser avec précaution en production
      },
    ],
  },
};

export default nextConfig;