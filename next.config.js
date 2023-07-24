/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Crendentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "*",
          },
          {
            key: "Access-Control-Max-Age",
            value: "86400",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "steamcommunity-a.akamaihd.net",
        port: "",
        pathname: "/economy/image/**",
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       has: [
  //         {
  //           type: "query",
  //           key: "itemsCs",
  //           value: "arrayItemsCs",
  //         },
  //       ],
  //       permanent: true,
  //       destination: "api/ListItems/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
