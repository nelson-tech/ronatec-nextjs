import { GetMenusQuery } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getMenu = async () => {
  const menuData = await getCachedQuery<GetMenusQuery>("getMenus")

  return {
    mainMenu: menuData?.data?.mainMenu?.menuItems?.nodes,
    mobileMenu: menuData?.data?.mobileMenu?.menuItems?.nodes,
  }
}

export default getMenu
