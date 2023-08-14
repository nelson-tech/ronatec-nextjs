"use client"

import React, { useEffect } from "react"
import useStore from "@hooks/useStore"
import useCart from "@hooks/useCart"

type AuthContextPropsType = {
  children: React.ReactNode
}

export const AuthContext: React.FC<AuthContextPropsType> = ({ children }) => {
  const { userID, cartUser } = useStore((stores) => ({
    userID: stores.auth.user?.id,
    cartUser:
      typeof stores.cart.state?.user === "object"
        ? stores.cart.state.user.id
        : stores.cart.state?.user,
  }))

  const { fetchCart } = useCart()

  // get cart on first render and when user changes
  useEffect(() => {
    if (cartUser !== userID) {
      fetchCart()
    }
  }, [userID, cartUser, fetchCart])

  return <>{children}</>
}
