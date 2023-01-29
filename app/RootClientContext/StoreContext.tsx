"use client"

import { Cart } from "@api/codegen/graphql"
import StoreProvider from "@lib/store/StoreProvider"
import type { initialStateType } from "@lib/store"
import { LayoutAuthDataType } from "@lib/types/auth"

type StoreContextPropsType = {
  children: React.ReactNode
  authData: LayoutAuthDataType
}

const StoreContext = ({ children, authData }: StoreContextPropsType) => {
  const { setTokens, isAuth, cart, tokens } = authData

  const initialState: initialStateType = {
    auth: {
      loggedIn: isAuth,
      user: tokens.user ? JSON.parse(decodeURIComponent(tokens.user)) : null,
    },
    cart: { state: cart ? (cart as Cart) : null },
  }
  return (
    <>
      <StoreProvider {...initialState}>{children}</StoreProvider>
    </>
  )
}

export default StoreContext
