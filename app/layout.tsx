import "@styles/tailwind.css"

import localFont from "@next/font/local"

import getTokens from "@lib/utils/getTokens"
// import getMenu from "@lib/server/getMenu"
// import { AUTH_ENDPOINT } from "@lib/constants"

import RootClientContext from "./RootClientContext"
import ScrollToTop from "@components/ui/ScrollToTop"
import Analytics from "@components/Analytics"
import Header from "@components/ui/Layout/Header"
import Footer from "@components/ui/Layout/Footer"
import Modals from "@components/ui/Layout/Modals"
// import Alerts from "@components/ui/Alerts"
import useClient from "@api/client"
import { GetMenuDocument } from "@api/codegen/graphql"
import { isTokenValid } from "@lib/utils/validateToken"

// ####
// #### Variables
// ####

const font = localFont({
  src: "./Exo-VariableFont.woff2",
})

// ####
// #### Server Calls
// ####

const getMenuItems = async () => {
  const client = useClient()

  const { menu } = await client.request(GetMenuDocument)

  const menuItems = menu?.menuItems?.nodes

  console.log("Menu items", menuItems?.length)

  if (menuItems) {
    const parents: MenuItemsType = menuItems.filter(
      item => item.parentDatabaseId === 0,
    )

    const getChildren = (menuItem: MenuItemsType[0]): MenuItemsType => {
      const children: MenuItemsType = menuItems.filter(
        item => item.parentDatabaseId === menuItem.databaseId,
      )

      return children.map(child => {
        let grandkids: MenuItemsType =
          child.childItems?.nodes.length && child.childItems.nodes.length > 0
            ? getChildren(child)
            : []

        grandkids && (child["children"] = grandkids)

        return child
      })
    }

    parents?.map(parent => {
      const children = getChildren(parent)

      children && (parent["children"] = children)
    })

    return parents
  }

  return null
}

const getAuthData = async () => {
  const { tokens } = getTokens()

  if (isTokenValid(tokens.auth)) {
    // User is authenticated

    // Create GraphQL client with authentication
    const client = useClient(tokens)
  } else if (tokens.refresh) {
    // Try to refresh auth token
  } else {
    // User is unauthenticated
  }
}

// ####
// #### Component
// ####

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const menuItems = await getMenuItems()
  return (
    <html lang="en-us" className={font.className}>
      <RootClientContext>
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
