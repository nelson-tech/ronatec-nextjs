"use client"

import { Cart } from "@api/codegen/graphql"
import { AUTH_ENDPOINT } from "@lib/constants"
import { useCreateStore, Provider } from "@lib/store"
import { initialState } from "@lib/store/vanilla"
import { LayoutAuthDataType } from "@lib/types/auth"

type RootClientContextProps = {
  children: React.ReactNode
  authData: LayoutAuthDataType
}

const RootClientContext = ({ children, authData }: RootClientContextProps) => {
  const { setTokens, isAuth, cart, tokens } = authData
  console.log("TOKENS", tokens)

  // TODO - Fix Typescript issues

  const initialState: initialState = {
    auth: {
      loggedIn: isAuth,
      user: tokens.user ? JSON.parse(decodeURIComponent(tokens.user)) : null,
    },
    cart: { state: cart ? (cart as Cart) : null },
  }

  const createStore = useCreateStore(initialState)
  // useNavigationEvent()

  if (setTokens.length > 0) {
    // Make refresh call on client to set cookies
    // Remove this once next.js supports setting cookies from within the layout call

    const tokens = Object.fromEntries(setTokens)

    const body: ENDPOINT_SetInputType = { action: "SET", tokens }

    fetch(AUTH_ENDPOINT, { method: "POST", body: JSON.stringify(body) })
  }

  return (
    <Provider createStore={createStore}>
      {/* <RootStyleRegistry colors={colors}> */}
      {children}
      {/* </RootStyleRegistry> */}
    </Provider>
  )
}

export default RootClientContext
