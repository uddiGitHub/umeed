/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/pages/home',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['images.unsplash.com'], 
  },
};

export default nextConfig;
