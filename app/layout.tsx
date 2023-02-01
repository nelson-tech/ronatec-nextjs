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
  RefreshAuthTokenDocument,
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

  const setTokens: Layout_AuthData_Type["setTokens"] = []

  // Set new authToken if fetching in getTokens
  newAuth && tokens.auth && setTokens.push(["auth", tokens.auth])

  let client: GraphQLClient

  let viewer: GetViewerQuery["viewer"] = null

  if (isTokenValid(tokens.auth)) {
    // User is authenticated
    isAuth = true

    // Create GraphQL client with authentication
    client = useClient(tokens)
  } else if (tokens.refresh) {
    // Try to refresh auth token

    // Create unauthenticated client
    client = useClient(tokens)

    // Try to get refreshed authToken
    const result = await client.request(RefreshAuthTokenDocument, {
      input: { jwtRefreshToken: tokens.refresh },
    })

    const authToken = result?.refreshJwtAuthToken?.authToken
    if (authToken) {
      // User is now authenticated
      isAuth = true

      // Add token to setTokens for client API call
      // Remove this after next.js implements server cookie setting
      setTokens.push(["auth", authToken])

      // Set new token and apply to client
      tokens.auth = authToken
      client.setHeader("Authorization", `Bearer ${authToken}`)

      // Get user details
      // client.setHeader("auth", "true")
      const userData = await client.request(GetViewerDocument)

      if (userData.viewer?.id) {
        viewer = userData.viewer
      }
    } else {
      // Error getting new authToken. Remove all tokens and logout.
      tokens.auth = null
      tokens.refresh = null
      setTokens.push(["remove", true])
    }
  } else {
    // User is unauthenticated

    // Create unauthenticated client (pass tokens in case cart session is present)
    client = useClient(tokens)
  }

  // Fetch cart
  const cartResponse = await client.request(GetCartDocument).catch(e => {
    console.warn("Error fetching cart", e.response.errors)
  })

  // Return client to public queries
  // client.setHeader("auth", "false")

  const cart = cartResponse ? cartResponse.cart : null

  return { tokens, setTokens, isAuth, cart, user: viewer }
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
