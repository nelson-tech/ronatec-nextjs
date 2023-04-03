import type { GetMenusQuery, MenuItem } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getMenus = async () => {
  try {
    const { data } = await getCachedQuery<GetMenusQuery>("getMenus")

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

export default getMenus
