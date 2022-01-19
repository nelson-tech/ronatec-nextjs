import { useReactiveVar } from "@apollo/client"
import isEqual from "lodash.isequal"

import { menuVar } from "@lib/apollo/cache"
import { NormalizedMenuItem } from "@lib/types"

const useGlobalState = () => {
  const isServer: boolean = ((): boolean => typeof window === "undefined")()

  const menu = useReactiveVar(menuVar)

  const setMenu = (menu: NormalizedMenuItem[]) => {
    const currentState = menuVar()
    const currentMenu = currentState
    !isEqual(menu, currentMenu) && menuVar(menu)
  }

  return { menu, setMenu }
}

export default useGlobalState
