type MenuItemsType = (Array<{
  __typename?: "MenuItem"
  id: string
  databaseId: number
  url?: string | null
  label?: string | null
  parentDatabaseId?: number | null
  menuFields?: {
    __typename?: "MenuItem_Menufields"
    mega?: boolean | null
    column?: boolean | null
  } | null
  childItems?: {
    __typename?: "MenuItemToMenuItemConnection"
    nodes: Array<{ __typename?: "MenuItem"; id: string }>
  } | null
}>[0] & {
  children?: MenuItemsType
})[]

type MenuItemType = MenuItemsType[0]
