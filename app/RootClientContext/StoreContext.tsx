"use client"

import { Cart } from "@api/codegen/graphql"
import StoreProvider from "@lib/store/StoreProvider"
import type { initialStateType } from "@lib/store"
import { Layout_AuthData_Type } from "@lib/types/auth"

type StoreContextPropsType = {
  children: React.ReactNode
  authData: Layout_AuthData_Type
}

const StoreContext = ({ children, authData }: StoreContextPropsType) => {
  const { isAuth, cart, user } = authData

  const initialState: initialStateType = {
    auth: {
      loggedIn: isAuth,
      user,
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
