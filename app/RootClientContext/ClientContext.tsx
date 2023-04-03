"use client"

import { useEffect } from "react"
import { shallow } from "zustand/shallow"

import useCart from "@lib/hooks/useCart"
import getTokensClient from "@lib/utils/getTokensClient"
import useStore from "@lib/hooks/useStore"

//
// Types
//

type ClientContextProps = {
  children: React.ReactNode
}

//
// Component
//

const ClientContext = ({ children }: ClientContextProps) => {
  const { ready, setLoggedIn, setReady } = useStore(
    (state) => ({
      ready: state.auth.ready,
      setLoggedIn: state.auth.setLoggedIn,
      setReady: state.auth.setReady,
    }),
    shallow
  )
  const { fetchCart } = useCart()

  useEffect(() => {
    if (!ready) {
      getTokensClient().then((data) => {
        if (data.isAuth) {
          setLoggedIn(true)
        }
        return data
      })
      fetchCart()
      setReady(true)
    }
  }, [ready, fetchCart, setLoggedIn, setReady])

  return <>{children}</>
}

export default ClientContext
