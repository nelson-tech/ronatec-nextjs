import "@styles/tailwind.css"

import localFont from "@next/font/local"

import { MenuItem } from "@api/codegen/graphql"
import getMenu from "@lib/server/getMenu"

import RootClientContext from "./RootClientContext"
import ScrollToTop from "@components/ui/ScrollToTop"
import Analytics from "@components/Analytics"
import Header from "@components/ui/Layout/Header"
import Footer from "@components/ui/Layout/Footer"
import Modals from "@components/ui/Layout/Modals"
import Alerts from "@components/ui/Alerts"

// ####
// #### Variables
// ####

const font = localFont({
  src: "./Exo-VariableFont.woff2",
})

// ####
// #### Component
// ####

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const menuItems = await getMenu()

  return (
    <html lang="en-us" className={font.className}>
      <RootClientContext>
        <body>
          <div id="top" />
          {menuItems?.mainMenu && (
            <Header menuItems={menuItems.mainMenu as MenuItem[]} promo />
          )}
          <div className="min-h-screen bg-white z-0">{children}</div>
          <Footer />
          <Modals menuItems={menuItems?.mobileMenu as MenuItem[]} />
          <Alerts />
          <ScrollToTop />
          <Analytics />
        </body>
      </RootClientContext>
    </html>
  )
}

export default RootLayout

export const metadata = {
  title: {
    default: "Ronatec C2C, Inc.",
    template: "%s",
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}
