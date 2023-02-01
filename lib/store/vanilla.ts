import { createStore } from "zustand/vanilla"

import createAlertSlice, { AlertSliceType } from "./slices/alert"
import createAuthSlice, { AuthSliceType } from "./slices/auth"
import createCartSlice, { CartSliceType } from "./slices/cart"
import createShopSlice, { ShopSliceType } from "./slices/shop"
import createUISlice, { UISliceType } from "./slices/ui"

export type SlicesType = AlertSliceType &
  AuthSliceType &
  CartSliceType &
  ShopSliceType &
  UISliceType

export type initialStateType = DeepPartial<SlicesType>

const vanillaStore = (initialState?: initialStateType) => {
  return createStore<SlicesType>()((...a) => ({
    ...createAlertSlice(...a),
    ...createAuthSlice(initialState?.auth)(...a),
    ...createCartSlice(initialState?.cart)(...a),
    ...createShopSlice(...a),
    ...createUISlice(...a),
  }))
}

export default vanillaStore
