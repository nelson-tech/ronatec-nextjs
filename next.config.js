const { withEcommerceConfig } = require("./ecommerce/common/config")

module.exports = withEcommerceConfig({
  ecommerce: {
    platform: process.env.NEXT_PUBLIC_ECOMMERCE_PLATFORM,
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  reactStrictMode: true,
})
