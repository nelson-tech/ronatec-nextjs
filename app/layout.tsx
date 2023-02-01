import "@styles/tailwind.css"

import localFont from "@next/font/local"
import { GraphQLClient } from "graphql-request"

import getTokens from "@lib/utils/getTokens"
import { isTokenValid } from "@lib/utils/validateToken"
import { Layout_AuthData_Type } from "@lib/types/auth"
import useClient from "@api/client"
import {
  GetCartDocument,
  GetViewerDocument,
  GetViewerQuery,
  MenuItem,
} from "@api/codegen/graphql"

import RootClientContext from "./RootClientContext"
import ScrollToTop from "@components/ui/ScrollToTop"
import Analytics from "@components/Analytics"
import Header from "@components/ui/Layout/Header"
import Footer from "@components/ui/Layout/Footer"
import Modals from "@components/ui/Layout/Modals"
import Alerts from "@components/ui/Alerts"
import { API_URL } from "@lib/constants"

// ####
// #### Variables
// ####

const font = localFont({
  src: "./Exo-VariableFont.woff2",
})

// ####
// #### API
// ####

const getMenuItems = async () => {
  const menuResponse = await fetch(API_URL + "?queryId=getMenus", {
    headers: { "content-type": "application/json" },
  })
  const { data } = await menuResponse.json()
  const mainMenuItems = data.mainMenu?.menuItems?.nodes
  const mobileMenuItems = data.mobileMenu?.menuItems?.nodes
  return { mainMenuItems, mobileMenuItems }
}

const getAuthData = async (): Promise<Layout_AuthData_Type> => {
  const { tokens, newAuth } = await getTokens()

  let isAuth = false

  let client: GraphQLClient

  isTokenValid(tokens.auth) && (isAuth = true)

  // Create GraphQL client with any available authentication
  client = useClient(tokens)

  // Fetch user if authenticated
  let user: GetViewerQuery["viewer"] = null
  if (isAuth) {
    const viewerData = await client.request(GetViewerDocument).catch(e => {
      console.warn("Error fetching user", e.response.errors)
    })
    viewerData?.viewer && (user = viewerData.viewer)
  }

  // Fetch cart
  const cartResponse = await client.request(GetCartDocument).catch(e => {
    console.warn("Error fetching cart", e.response.errors)
  })

  const cart = cartResponse ? cartResponse.cart : null

  return { tokens, isAuth, cart, user, newAuth }
}

// ####
// #### Component
// ####

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const menuPromise = getMenuItems()
  const authPromise = getAuthData()

  const [menuItems, authData] = await Promise.all([menuPromise, authPromise])

  return (
    <html lang="en-us" className={font.className}>
      <RootClientContext authData={authData}>
        <body>
          <div id="top" />
          {menuItems.mainMenuItems && (
            <Header menuItems={menuItems.mainMenuItems as MenuItem[]} promo />
          )}
          <div className="min-h-screen bg-white z-0">{children}</div>
          <Footer />
          <Modals menuItems={menuItems.mobileMenuItems as MenuItem[]} />
          <Alerts />
          <ScrollToTop />
          <Analytics />
        </body>
      </RootClientContext>
    </html>
  )
}

export default RootLayout
