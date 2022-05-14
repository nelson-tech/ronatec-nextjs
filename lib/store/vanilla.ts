import create from "zustand/vanilla"

import createAlertSlice, { AlertSliceType } from "./slices/alert"
import createAuthSlice, { AuthSliceType } from "./slices/auth"
import createCartSlice, { CartSliceType } from "./slices/cart"
import createUISlice, { UISliceType } from "./slices/ui"

export type StoreType = AlertSliceType &
  AuthSliceType &
  CartSliceType &
  UISliceType

const vanillaStore = create<StoreType>()((...a) => ({
  ...createAlertSlice(...a),
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
  ...createUISlice(...a),
}))

export default vanillaStore
