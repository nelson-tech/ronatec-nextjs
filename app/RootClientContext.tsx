"use client"

import type { Cart } from "@api/codegen/graphql"
import { AUTH_ENDPOINT } from "@lib/constants"
import type { initialStateType } from "@lib/store"
import type { LayoutAuthDataType } from "@lib/types/auth"
import StoreProvider from "@lib/store/StoreProvider"

//
// Types
//

type RootClientContextProps = {
  children: React.ReactNode
  authData: LayoutAuthDataType
}

const RootClientContext = ({ children, authData }: RootClientContextProps) => {
  const { setTokens, isAuth, cart, tokens } = authData

  const initialState: initialStateType = {
    auth: {
      loggedIn: isAuth,
      user: tokens.user ? JSON.parse(decodeURIComponent(tokens.user)) : null,
    },
    cart: { state: cart ? (cart as Cart) : null },
  }

  // useNavigationEvent()

  if (setTokens.length > 0) {
    // Make refresh call on client to set cookies
    // Remove this once next.js supports setting cookies from within the layout call

    const tokens = Object.fromEntries(setTokens)

    const body: ENDPOINT_SetInputType = { action: "SET", tokens }

    fetch(AUTH_ENDPOINT, { method: "POST", body: JSON.stringify(body) })
  }

  return (
    <StoreProvider {...initialState}>
      {/* <RootStyleRegistry colors={colors}> */}
      {children}
      {/* </RootStyleRegistry> */}
    </StoreProvider>
  )
}

export default RootClientContext
