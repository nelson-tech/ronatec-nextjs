type MenuItemType = {
  path: string
  label: string
  id: string
  children: MenuItemType[] | null
  mega?: boolean
}

export default MenuItemType
