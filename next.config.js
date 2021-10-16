const { withEcommerceConfig } = require("./ecommerce/common/config")

module.exports = withEcommerceConfig({
  serverRuntimeConfig: {
    ecommerce: {
      platform: "shopify_local",
    },
  },
  publicRuntimeConfig: {
    ecommerce: {
      platform: "shopify_local",
    },
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  reactStrictMode: true,
})
