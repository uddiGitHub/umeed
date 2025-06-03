/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
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
