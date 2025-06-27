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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'pdfjs-dist': 'pdfjs-dist',
    };
    
    return config;
  },
  async headers() {
    return [
      {
        source: '/api/pdf.worker.min.js',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/pdf.worker.min.js',
        destination: '/api/pdf.worker.min.js'
      }
    ];
  }
};

export default nextConfig;