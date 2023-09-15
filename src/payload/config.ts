import path from "path"
import { buildConfig } from "payload/config"

import Users from "./collections/Users"
import Logo from "./components/Logo"
import BeforeDashboard from "./components/BeforeDashboard"
import Pages from "./globals/pages"
import Menus from "./globals/Menus"
import { Settings } from "./globals/Settings"
import webpackConfig from "./webpack"
import plugins from "./plugins"
import collections from "./collections"

// const mockModulePath = path.resolve(__dirname, "./emptyModuleMock.js")

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || ""
const SERVER_CORS_BASE = process.env.NEXT_PUBLIC_SERVER_CORS_BASE || ""
const LOCAL_CORS_BASE = process.env.NEXT_PUBLIC_LOCAL_CORS_BASE || ""

const CORS_SERVERS = [
  `https://${SERVER_CORS_BASE}`,
  `https://www.${SERVER_CORS_BASE}`,
  `http://${SERVER_CORS_BASE}`,
  `http://www.${SERVER_CORS_BASE}`,
  `https://${LOCAL_CORS_BASE}`,
  `http://${LOCAL_CORS_BASE}`,
  "http://localhost:4321",
]

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
  serverURL: SITE_URL,
  cookiePrefix: process.env.PAYLOAD_COOKIE_PREFIX,
  collections,
  globals: [...Pages, Menus, Settings],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  cors: CORS_SERVERS,
  csrf: CORS_SERVERS,
  localization: { locales: ["en", "es"], defaultLocale: "en", fallback: true },
  plugins,
})

export default config
