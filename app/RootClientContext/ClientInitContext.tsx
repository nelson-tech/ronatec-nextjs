"use client"

import { useEffect } from "react"

import useCart from "@lib/hooks/useCart"
import { Layout_AuthData_Type } from "@lib/types/auth"

type ClientInitContextPropsType = {
  children: React.ReactNode
  authData: Layout_AuthData_Type
}

const ClientInitContext = ({
  children,
  authData,
}: ClientInitContextPropsType) => {
  // Fetch cart to ensure latest data
  const { fetchCart } = useCart()

  useEffect(() => {
    fetchCart()
  }, [authData])

  return <>{children}</>
}

export default ClientInitContext
