/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["cross-fetch"],
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.ronatec.us", "api.ronatec.us", "ronatec.us"],
    loader: "custom",
    loaderFile: "lib/utils/imageLoader.ts",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  output: "standalone",
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(nextConfig)
