/** @type {import('next').NextConfig} */

const nextConfig = {
  ecommerce: {
    platform: process.env.NEXT_PUBLIC_ECOMMERCE_PLATFORM,
  },
  images: {
    domains: ["cdn.ronatec.us", "ronatec.us"],
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
    runtime: "nodejs",
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(nextConfig)
