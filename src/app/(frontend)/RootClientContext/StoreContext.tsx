"use client"

import StoreProvider from "@store/StoreProvider"
import { initialState as defaultAuthState } from "@store/slices/auth"
import { initialState as defaultCartState } from "@store/slices/cart"
import { Cart, User } from "~payload-types"

type StoreContextPropsType = {
  children: React.ReactNode
  user: User | null
  cart: Cart | null | undefined
}

const StoreContext = ({ children, user, cart }: StoreContextPropsType) => {
  const initialAuth: (typeof defaultAuthState)["auth"] = {
    ...defaultAuthState.auth,
    user,
    loggedIn: !!user?.id,
  }

  const initialCart: (typeof defaultCartState)["cart"] = {
    ...defaultCartState.cart,
    state: cart ?? null,
  }

  return (
    <>
      <StoreProvider auth={initialAuth} cart={initialCart}>
        {children}
      </StoreProvider>
    </>
  )
}

export default StoreContext
