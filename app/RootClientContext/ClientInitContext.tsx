"use client"

import { AUTH_ENDPOINT } from "@lib/constants"
import useCart from "@lib/hooks/useCart"
import { EP_Auth_Input_Set_Type, Layout_AuthData_Type } from "@lib/types/auth"
import { useEffect } from "react"

type ClientInitContextPropsType = {
  children: React.ReactNode
  authData: Layout_AuthData_Type
}

const ClientInitContext = ({
  children,
  authData,
}: ClientInitContextPropsType) => {
  const { setTokens, isAuth, cart, tokens } = authData

  if (setTokens.length > 0) {
    // Make refresh call on client to set cookies
    // Remove this once next.js supports setting cookies from within the layout call

    const tokens = Object.fromEntries(setTokens)

    const body: EP_Auth_Input_Set_Type = { action: "SET", tokens }

    fetch(AUTH_ENDPOINT, { method: "POST", body: JSON.stringify(body) })
  }

  // Fetch cart to ensure latest data
  const { fetchCart } = useCart()

  useEffect(() => {
    fetchCart()
  }, [authData])

  return <>{children}</>
}

export default ClientInitContext
