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
    ],
  },
};

export default nextConfig;
