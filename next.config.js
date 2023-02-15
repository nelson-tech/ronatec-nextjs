/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "cdn.ronatec.us",
      "api.ronatec.us",
      "ronatec.us",
      "shy.nelson.tech",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(nextConfig)
