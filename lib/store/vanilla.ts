import create from "zustand/vanilla"

import createAlertSlice, { AlertSliceType } from "./slices/alert"
import createAuthSlice, { AuthSliceType } from "./slices/auth"
import createCartSlice, { CartSliceType } from "./slices/cart"
import createShopSlice, { ShopSliceType } from "./slices/shop"
import createUISlice, { UISliceType } from "./slices/ui"

export type StoreType = AlertSliceType &
  AuthSliceType &
  CartSliceType &
  ShopSliceType &
  UISliceType

const vanillaStore = create<StoreType>()((...a) => ({
  ...createAlertSlice(...a),
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
  ...createShopSlice(...a),
  ...createUISlice(...a),
}))

export default vanillaStore
