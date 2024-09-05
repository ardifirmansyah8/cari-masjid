/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.masjed.id",
        port: "",
        pathname: "/assets/icons/menus/**",
      },
      {
        protocol: "https",
        hostname: "api.masjed.id",
        port: "",
        pathname: "/api/v1/mosques/**",
      },
    ],
  },
};

export default nextConfig;
