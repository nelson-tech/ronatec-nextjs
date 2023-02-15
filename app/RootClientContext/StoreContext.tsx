"use client"

import StoreProvider from "@lib/store/StoreProvider"

type StoreContextPropsType = {
  children: React.ReactNode
}

const StoreContext = ({ children }: StoreContextPropsType) => {
  // const { isAuth, cart, user } = authData

  // const initialState: initialStateType = {
  //   auth: {
  //     loggedIn: isAuth,
  //     user,
  //   },
  //   cart: { state: cart ? (cart as Cart) : null },
  // }

  // const initialState: initialStateType = getTokensClient().then(
  //   ({ tokens, isAuth }) => {
  //     if (isAuth) {
  //       // Tokens are stored.

  //       return {
  //         auth: {
  //           loggedIn: isAuth,
  //           customer: decodeCustomerToken(tokens.customer ?? ""),
  //         },
  //         cart: { state: null },
  //       }
  //     }
  //     return {
  //       auth: {
  //         loggedIn: false,
  //       },
  //       cart: { state: null },
  //     }
  //   },
  // )

  return (
    <>
      <StoreProvider>{children}</StoreProvider>
    </>
  )
}

export default StoreContext
