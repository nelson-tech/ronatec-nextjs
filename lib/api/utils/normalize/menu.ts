import { MainMenuReturnType } from "@api/queries/types"
import { MenuItem } from "@api/gql/types"
import { initialMenu, NormalizedMenuItem } from "@lib/apollo/cache"
import { removeTrailingSlash } from "@lib/utils"

const error = (field: string): void => {
  console.log(`Menu ${field} not supplied`)
}

const normalizeMenuItems = (menuItems: MenuItem[]): NormalizedMenuItem[] => {
  const noramlizedMenuItems = menuItems!.map<NormalizedMenuItem>(menuItem => {
    let label = menuItem?.label
    if (!label) {
      label = "Missing"
      error("label")
    }

    let id = menuItem?.id
    if (!id) {
      id = label
      error("ID")
    }

    let path = menuItem?.path
    if (!path) {
      path = "#"
      error("path")
    }
    path = removeTrailingSlash(path)

    let children = null
    if (
      menuItem.childItems &&
      menuItem.childItems?.nodes &&
      menuItem.childItems?.nodes?.length > 0
    ) {
      const childItems = menuItem.childItems.nodes as MenuItem[]
      children = normalizeMenuItems(childItems)
    }
    return {
      id,
      label,
      path,
      children,
      mega: menuItem.menuFields?.mega || false,
    }
  })

  return noramlizedMenuItems
}

export const normalizeMenu = (
  menu: MainMenuReturnType,
): NormalizedMenuItem[] => {
  const menuItems = menu?.menuItems?.nodes
  if (!menuItems) {
    error("menuItems")
    return initialMenu
  }
  const receivedMenuItems = menuItems as MenuItem[]

  return normalizeMenuItems(receivedMenuItems)
}
