/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["@payloadcms/plugin-nested-docs"],
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "localhost",
      "cdn.ronatec.us",
      "api.ronatec.us",
      "ronatec.us",
      "assets.ronatec.us",
      "lanco-corp.com",
      "px.ads.linkedin.com",
      "equipment.ronatec.us",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
}

module.exports = nextConfig
