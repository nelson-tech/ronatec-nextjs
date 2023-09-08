/** @type {import('next').NextConfig} */

const path = require("path")
// const { withPayload } = require("@payloadcms/next-payload")

const nextConfig = {
  // experimental: {
  //   // appDir: true,
  //   // serverComponentsExternalPackages: ["cross-fetch"],
  //   serverActions: true,
  // },
  transpilePackages: ["@payloadcms/plugin-nested-docs"],
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  // output: "standalone",
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
    // loader: "custom",
    // loaderFile: "lib/utils/imageLoader.ts",
  },
  compiler: {
    // removeConsole: process.env.NODE_ENV === "production",
  },
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(nextConfig)
// withPayload(nextConfig, {
//   // The second argument to `withPayload`
//   // allows you to specify paths to your Payload dependencies
//   // and configure the admin route to your Payload CMS.

//   // Point to your Payload config (Required)
//   configPath: path.resolve(__dirname, "./payload/payload.config.ts"),

//   // Point to custom Payload CSS (optional)
//   // cssPath: path.resolve(__dirname, "./css/my-custom-payload-styles.css"),

//   // Point to your exported, initialized Payload instance (optional, default shown below`)
//   payloadPath: path.resolve(process.cwd(), "./payload/payloadClient.ts"),

//   // Set a custom Payload admin route (optional, default is `/admin`)
//   // NOTE: Read the "Set a custom admin route" section in the payload/next-payload README.
//   adminRoute: "/admin",
// })
//)
