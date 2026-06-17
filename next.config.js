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
  async redirects() {
    return [
      // Product/category sections -> ronatec.us/chemicals
      {
        source: "/products/chemicals/:path*",
        destination: "https://ronatec.us/chemicals/",
        permanent: true,
      },
      {
        source: "/products/metal-finishing/:path*",
        destination: "https://ronatec.us/chemicals/",
        permanent: true,
      },
      {
        source: "/products/food-beverage/:path*",
        destination: "https://ronatec.us/chemicals/",
        permanent: true,
      },
      {
        source: "/products/cleaning-sanitizing/:path*",
        destination: "https://ronatec.us/chemicals/",
        permanent: true,
      },
      {
        source: "/products/conventya/:path*",
        destination: "https://ronatec.us/chemicals/",
        permanent: true,
      },
      {
        source: "/products/macdermid/:path*",
        destination: "https://ronatec.us/chemicals/",
        permanent: true,
      },

      // Boeing/aerospace section
      {
        source: "/products/boeing-approved/:path*",
        destination: "https://ronatec.us/aerospace/",
        permanent: true,
      },

      // Electroless nickel section
      {
        source: "/products/electroless-nickel-plating/:path*",
        destination: "https://ronatec.us/electroless-nickel-plating/",
        permanent: true,
      },

      // Service pages
      {
        source: "/services/consulting",
        destination: "https://ronatec.us/consulting/",
        permanent: true,
      },
      {
        source: "/services/process-tank-lines",
        destination: "https://ronatec.us/process-tank-lines/",
        permanent: true,
      },
      {
        source: "/services/desalination",
        destination: "https://ronatec.us/desalination/",
        permanent: true,
      },
      {
        source: "/services/waste-removal-disposal",
        destination: "https://ronatec.us/waste-management-solutions/",
        permanent: true,
      },
      {
        source: "/services/waste-management",
        destination: "https://ronatec.us/waste-management-solutions/",
        permanent: true,
      },
      {
        source: "/services/sell-your-equipment",
        destination: "https://ronatec.us/sell-your-equipment/",
        permanent: true,
      },

      // Services landing page
      {
        source: "/services",
        destination: "https://ronatec.us/services/",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
