/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["@payloadcms/plugin-nested-docs"],
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "cdn.ronatec.us",
      "api.ronatec.us",
      "ronatec.us",
      "assets.ronatec.us",
      "lanco-corp.com",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
}

module.exports = nextConfig
