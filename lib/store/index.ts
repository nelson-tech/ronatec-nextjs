"use client"

import { createStore } from "zustand"

import createAlertSlice, { AlertSliceType } from "./slices/alert"
import createAuthSlice, { AuthSliceType } from "./slices/auth"
import createCartSlice, { CartSliceType } from "./slices/cart"
import createShopSlice, { ShopSliceType } from "./slices/shop"
import createUISlice, { UISliceType } from "./slices/ui"

import { createContext } from "react"

//
// Types
//

export type SlicesType = AlertSliceType &
  AuthSliceType &
  CartSliceType &
  ShopSliceType &
  UISliceType

export type initialStateType = DeepPartial<SlicesType>

export type StoreType = ReturnType<typeof createClientStore>

//
// Variables
//

export const StoreContext = createContext<StoreType | null>(null)

//
// Hook
//

export const createClientStore = (initialState?: initialStateType) => {
  return createStore<SlicesType>()((...a) => ({
    ...createAlertSlice(...a),
    ...createAuthSlice(initialState?.auth)(...a),
    ...createCartSlice(initialState?.cart)(...a),
    ...createShopSlice(...a),
    ...createUISlice(...a),
  }))
}
