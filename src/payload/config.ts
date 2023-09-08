import nestedDocs from "@payloadcms/plugin-nested-docs"
import { cloudStorage } from "@payloadcms/plugin-cloud-storage"
import path from "path"
import { buildConfig } from "payload/config"
// import "@websolutespa/payload-plugin-localization/dist/index.css"

import Categories from "./collections/Categories"
import Media from "./collections/Media"
import Orders from "./collections/Orders"
import Products from "./collections/Products"
import Users from "./collections/Users"
import Logo from "./components/Logo"
import BeforeDashboard from "./components/BeforeDashboard"
import Pages from "./globals/pages"
import Menus from "./globals/Menus"
import { Settings } from "./globals/Settings"
import adapter from "./utils/s3adapter"
import { Carts } from "./collections/Carts"
import Suppliers from "./collections/Suppliers"
import Employees from "./collections/Employees"
import Tags from "./collections/Tags"
import { localization } from "@websolutespa/payload-plugin-localization"
import webpackConfig from "./webpack"
import { LexicalPlugin } from "payload-plugin-lexical"

// const mockModulePath = path.resolve(__dirname, "./emptyModuleMock.js")

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? ""
const S3_CDN_URL = process.env.S3_CDN_URL ?? ""

const config = buildConfig({
  admin: {
    user: Users.slug,
    components: {
      // The BeforeDashboard component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import BeforeDashboard statement on line 15.
      beforeDashboard: [BeforeDashboard],
      afterDashboard: [],
      graphics: {
        Logo,
        Icon: Logo,
      },
    },
    // css: path.resolve(__dirname, "styles.scss"),
    meta: {
      titleSuffix: ` - Ronatec`,
    },
    webpack: webpackConfig,
  },
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  cookiePrefix: process.env.PAYLOAD_COOKIE_PREFIX,
  collections: [
    // PagesCollection,
    Media({ slug: "images" }),
    Media({ slug: "videos" }),
    Media({ slug: "productImages" }),
    Media({ slug: "documents" }),
    Products,
    Categories,
    Tags,
    Carts,
    Orders,
    Users,
    Employees,
    Suppliers,
  ],
  globals: [...Pages, Menus, Settings],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  cors: [SITE_URL, "http://localhost:8140"].filter(Boolean),
  csrf: [SITE_URL, "http://localhost:8140"].filter(Boolean),
  localization: { locales: ["en", "es"], defaultLocale: "en", fallback: true },
  plugins: [
    // localization(),

    LexicalPlugin({
      // Only set this if you want to use the the AISuggest Feature
      ai: {
        openai_key: process.env.OPENAI_API_KEY ?? "",
      },
    }),

    nestedDocs({
      collections: ["categories"],
      parentFieldSlug: "parent",
      breadcrumbsFieldSlug: "breadcrumbs",
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => `/products/${docs.at(-1)?.slug}`,
    }),

    cloudStorage({
      collections: {
        images: {
          prefix: "media/images",
          disablePayloadAccessControl: true,
          adapter,
          generateFileURL: ({ prefix, filename }) =>
            `${S3_CDN_URL}/${prefix}/${filename}`,
        },
        productImages: {
          prefix: "media/images/products",
          disablePayloadAccessControl: true,
          adapter,
          generateFileURL: ({ prefix, filename }) =>
            `${S3_CDN_URL}/${prefix}/${filename}`,
        },
        documents: {
          prefix: "media/documents",
          disablePayloadAccessControl: true,
          adapter,
          generateFileURL: ({ prefix, filename }) =>
            `${S3_CDN_URL}/${prefix}/${filename}`,
        },
        videos: {
          prefix: "media/videos",
          disablePayloadAccessControl: true,
          adapter,
          generateFileURL: ({ prefix, filename }) =>
            `${S3_CDN_URL}/${prefix}/${filename}`,
        },
      },
    }),
  ],
})

export default config
