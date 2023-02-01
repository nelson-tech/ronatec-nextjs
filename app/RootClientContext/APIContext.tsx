"use client"

import useClient from "@api/client"
import { CART_TOKEN_KEY } from "@lib/constants"
import { CLIENT_Tokens_Type } from "@lib/types/auth"
import isServer from "@lib/utils/isServer"

type APIContextPropsType = {
  children: React.ReactNode
  tokens: CLIENT_Tokens_Type
}

const APIContext = ({ children, tokens }: APIContextPropsType) => {
  //
  // Initiate client-side API client
  //

  // Compare client-side shopping session with server-side
  const clientSession = !isServer ? localStorage.getItem(CART_TOKEN_KEY) : null

  if (!isServer && !clientSession && tokens.cart) {
    // Cookie exists, but client-side session does not
    // Set for client-side requests
    localStorage.setItem(CART_TOKEN_KEY, tokens.cart)
  }

  // Create client-side GQL client with available tokens
  const client = useClient(tokens)
  return <>{children}</>
}

export default APIContext
