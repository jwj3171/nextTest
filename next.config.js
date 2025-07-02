/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/products/:id",
        destination: "/items/:id",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        //https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/codeitmall**
        protocol: "https",
        hostname: "learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/codeitmall/**",
        // search: '',
      },
    ],
  },
};

module.exports = nextConfig;
