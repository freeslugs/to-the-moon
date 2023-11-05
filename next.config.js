/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  // transpilePackages: ["@web3inbox/widget-react"],
  // experimental: {
  //   esmExternals: "loose",
  // },

  eslint: { 
    ignoreDuringBuilds: true, 
  }, 
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
