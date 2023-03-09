import { SlicesType, StoreContext } from "@lib/store"
import { useContext } from "react"
import { useStore as useZuStore } from "zustand"

const useStore = <T>(
  selector: (state: SlicesType) => T,
  equalityFn?: (left: T, right: T) => boolean
) => {
  const store = useContext(StoreContext)
  if (!store) throw new Error("Missing StoreContext.Provider in the tree")
  return useZuStore(store, selector, equalityFn)
}

export default useStore
