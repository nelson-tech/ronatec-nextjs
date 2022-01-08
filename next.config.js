// const { withEcommerceConfig } = require("./lib/api/config")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = module.exports = withBundleAnalyzer({
  ecommerce: {
    platform: process.env.NEXT_PUBLIC_ECOMMERCE_PLATFORM,
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  images: {
    domains: ["cdn.ronatec.us", "ronatec.us"],
  },
  reactStrictMode: true,
})
