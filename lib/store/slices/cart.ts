import { StateCreator } from "zustand"

import { AddCartItemsInput, Cart } from "@api/gql/types"

export type CartSliceType = typeof initialState & {
  cart: {
    setOpen: (open: boolean) => void
    setCart: (cart: Cart | null) => void
    setAddItem: (item: AddCartItemsInput | null) => void
    setLoading: (loading: boolean) => void
    setCheckout: (shouldCheckout: boolean) => void
    setWarnGuest: (warnGuest: boolean) => void
    setSessionError: (error: string | null) => void
  }
}

const initialState = {
  cart: {
    open: false,
    state: null as Cart | null,
    shouldAddItem: null as AddCartItemsInput | null,
    shouldCheckout: false,
    warnGuest: false,
    loading: false,
    errors: {
      session: null as string | null,
      adding: null as string | null,
      removing: null as string | null,
      clearing: null as string | null,
    },
  },
}

const createCartSlice: StateCreator<CartSliceType, [], []> = set => ({
  cart: {
    ...initialState.cart,
    setOpen: open => set(state => ({ cart: { ...state.cart, open } })),
    setCart: cart => set(state => ({ cart: { ...state.cart, state: cart } })),
    setAddItem: item => set(state => ({ cart: { ...state.cart, item } })),
    setLoading: loading => set(state => ({ cart: { ...state.cart, loading } })),
    setCheckout: shouldCheckout =>
      set(state => ({ cart: { ...state.cart, shouldCheckout } })),
    setWarnGuest: warnGuest =>
      set(state => ({ cart: { ...state.cart, warnGuest } })),
    setSessionError: error =>
      set(state => ({
        cart: {
          ...state.cart,
          errors: { ...state.cart.errors, session: error },
        },
      })),
  },
})

export default createCartSlice
