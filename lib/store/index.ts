import { useLayoutEffect } from "react"
import create, { StoreApi, UseBoundStore } from "zustand"
import createContext from "zustand/context"

import isServer from "@lib/utils/isServer"

import vanillaStore, { StoreType } from "./vanilla"

//
// TYPES
//

type BoundStoreType = UseBoundStore<StoreApi<StoreType>>

let store: BoundStoreType

const zustandContext = createContext<BoundStoreType>()
export const Provider = zustandContext.Provider
export const storeHook = zustandContext.useStore
export const storeAPI = zustandContext.useStoreApi

export const useCreateStore = (
  initialState?: StoreType,
): (() => BoundStoreType) => {
  // For SSR & SSG, always use a new store.
  if (isServer) {
    return () => create(vanillaStore)
  }

  // For CSR, always re-use same store.
  store = store ?? create(vanillaStore)
  // And if initialState changes, then merge states in the next render cycle.
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        ...store.getState(),
      })
    }
  }, [initialState])

  return () => store
}
