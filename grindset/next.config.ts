import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Optional, but it's a good practice to enable React strict mode
  swcMinify: true, // Enable SWC minification for faster builds
  webpack(config) {
    // Custom webpack configuration if needed, such as for handling custom fonts or CSS
    return config;
  },
};

export default nextConfig;
