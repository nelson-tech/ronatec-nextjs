import { StateCreator } from "zustand"

import { Cart } from "~payload-types"

export type CartSliceType = typeof initialState & {
  cart: {
    setOpen: (open: boolean) => void
    setCart: (cart: Cart | null) => void
    setCookieId: (id: string | null) => void
    setLoading: (loading: boolean) => void
    setSessionError: (error: string | null) => void
  }
}

export const initialState = {
  cart: {
    open: false,
    state: null as Cart | null,
    loading: false,
    cookieId: null as string | null,
    errors: {
      session: null as string | null,
      adding: null as string | null,
      removing: null as string | null,
      clearing: null as string | null,
    },
  },
}

// TODO: Remove cookieId and setCookieId

const createCartSlice = (
  defaultValues?: Partial<(typeof initialState)["cart"]> | undefined
): StateCreator<CartSliceType, [], []> => {
  return (set) => ({
    cart: {
      ...initialState.cart,
      ...defaultValues,
      setOpen: (open) => set((state) => ({ cart: { ...state.cart, open } })),
      setCart: (cart) =>
        set((state) => ({ cart: { ...state.cart, state: cart } })),
      setCookieId: (id) =>
        set((state) => ({ cart: { ...state.cart, cookieId: id } })),
      setLoading: (loading) =>
        set((state) => ({ cart: { ...state.cart, loading } })),
      setSessionError: (error) =>
        set((state) => ({
          cart: {
            ...state.cart,
            errors: { ...state.cart.errors, session: error },
          },
        })),
    },
  })
}

export default createCartSlice
