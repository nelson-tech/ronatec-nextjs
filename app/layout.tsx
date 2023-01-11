import "@styles/tailwind.css"

import localFont from "@next/font/local"
import { GraphQLClient } from "graphql-request"

import getTokens from "@lib/utils/getTokens"
import { isTokenValid } from "@lib/utils/validateToken"
import { LayoutAuthDataType } from "@lib/types/auth"
import useClient from "@api/client"
import {
  GetCartDocument,
  GetMenuDocument,
  GetViewerDocument,
  RefreshAuthTokenDocument,
} from "@api/codegen/graphql"

import RootClientContext from "./RootClientContext"
import ScrollToTop from "@components/ui/ScrollToTop"
import Analytics from "@components/Analytics"
import Header from "@components/ui/Layout/Header"
import Footer from "@components/ui/Layout/Footer"
import Modals from "@components/ui/Layout/Modals"
// import Alerts from "@components/ui/Alerts"

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
  const client = useClient()
  const { menu } = await client.request(GetMenuDocument)
  const menuItems = menu?.menuItems?.nodes
  return menuItems
}

const getAuthData = async (): Promise<LayoutAuthDataType> => {
  const { tokens } = getTokens()

  let isAuth = false

  const setTokens: LayoutAuthDataType["setTokens"] = []

  let client: GraphQLClient

  if (isTokenValid(tokens.auth)) {
    // User is authenticated
    isAuth = true

    // Create GraphQL client with authentication
    client = useClient(tokens)
  } else if (tokens.refresh) {
    // Try to refresh auth token

    // Create unauthenticated client
    client = useClient()

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
      const result = await client.request(GetViewerDocument)

      if (result.viewer?.id) {
        // Tokenize user to pass as cookie
        console.log("Viewer:", result.viewer, JSON.stringify(result.viewer))

        const viewer = encodeURIComponent(JSON.stringify(result.viewer))

        // Add user to setTokens for client API call
        // Remove this after next.js implements server cookie setting
        setTokens.push(["user", viewer])

        // Set user in tokens
        tokens.user = viewer

        // Set cart session if present
        result.viewer.wooSessionToken &&
          client.setHeader(
            "woocommerce-session",
            `Session ${result.viewer.wooSessionToken}`,
          )
      }
    } else {
      // Error getting new authToken. Remove all tokens and logout.
      tokens.auth = null
      tokens.refresh = null
      tokens.user = null
      setTokens.push(["remove", true])
    }
  } else {
    // User is unauthenticated

    // Create unauthenticated client (pass tokens in case cart session is present)
    client = useClient()
  }

  // Fetch cart
  const cartResponse = await client.request(GetCartDocument).catch(e => {
    console.warn("Error fetching cart", e.response.errors)
  })

  const cart = cartResponse ? cartResponse.cart : null

  return { tokens, setTokens, isAuth, cart }
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
          {menuItems && <Header menuItems={menuItems} promo />}
          <div className="min-h-screen bg-white z-0">{children}</div>
          <Footer />
          <Modals menuItems={menuItems} />
          {/* <Alerts /> */}
          <ScrollToTop />
          <Analytics />
        </body>
      </RootClientContext>
    </html>
  )
}

export default RootLayout
