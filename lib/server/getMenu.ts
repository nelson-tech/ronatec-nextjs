import getClient from "@api/client"
import { GetMenusDocument } from "@api/codegen/graphql"
import type { MenuItem } from "@api/codegen/graphql"

const getMenu = async () => {
  try {
    const client = getClient()

    const data = await client.request(GetMenusDocument)

    return {
      mainMenu: data?.mainMenu?.menuItems?.nodes as
        | MenuItem[]
        | null
        | undefined,
      mobileMenu: data?.mobileMenu?.menuItems?.nodes as
        | MenuItem[]
        | null
        | undefined,
    }
  } catch (error) {
    console.warn("Error in getMenu:", error)

    return null
  }
}

export default getMenu
