"use client"

import { Fragment, useEffect, useState } from "react"

import useCart from "@lib/hooks/useCart"
import getTokensClient from "@lib/utils/getTokensClient"
import useStore from "@lib/hooks/useStore"
import { shallow } from "zustand/shallow"

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

  return <Fragment>{children}</Fragment>
}

export default ClientContext
