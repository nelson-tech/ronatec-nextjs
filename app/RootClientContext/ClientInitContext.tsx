"use client"

import { useEffect } from "react"

import useCart from "@lib/hooks/useCart"
import useStore from "@lib/hooks/useStore"
import { shallow } from "zustand/shallow"
import getTokensClient from "@lib/utils/getTokensClient"
import { decodeCustomerToken } from "@lib/utils/decodeJwt"

type ClientInitContextPropsType = {
  children: React.ReactNode
}

const ClientInitContext = ({ children }: ClientInitContextPropsType) => {
  // Fetch cart to ensure latest data
  const { fetchCart } = useCart()

  const { loaded, setLoaded, setCustomer, setLoggedIn } = useStore(
    state => ({
      loaded: state.auth.loaded,
      setCustomer: state.auth.setCustomer,
      setLoggedIn: state.auth.setLoggedIn,
      setLoginError: state.auth.setLoginError,
      setLoaded: state.auth.setLoaded,
    }),
    shallow,
  )

  useEffect(() => {
    if (!loaded) {
      getTokensClient().then(({ tokens, isAuth }) => {
        if (isAuth) {
          // Tokens are stored.

          setLoggedIn(isAuth)
          tokens.customer && setCustomer(decodeCustomerToken(tokens.customer))
        }
      })

      fetchCart()

      setLoaded(true)
    }
  }, [loaded, fetchCart, setCustomer, setLoaded, setLoggedIn])

  return <>{children}</>
}

export default ClientInitContext
