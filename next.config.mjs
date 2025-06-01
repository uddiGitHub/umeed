// next.config.js
export default {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/pages/home',
        permanent: true,
      },
    ];
  },
};
