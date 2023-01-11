import { GetMenuQuery } from "@api/codegen/graphql"

type MenuItemsType = DeepNull<
  GetMenuQuery,
  "menu.menuItems.nodes"
>["menu"]["menuItems"]["nodes"]

type MenuItemType = MenuItemsType[0]
