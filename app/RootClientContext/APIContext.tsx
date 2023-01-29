"use client"

import useClient from "@api/client"
import { WOO_SESSION_KEY } from "@lib/constants"
import { CLIENT_TokensType } from "@lib/types/auth"

type APIContextPropsType = {
  children: React.ReactNode
  tokens: CLIENT_TokensType
}

const APIContext = ({ children, tokens }: APIContextPropsType) => {
  //
  // Initiate client-side API client
  //

  // Compare client-side shopping session with server-side
  const clientSession = localStorage.getItem(WOO_SESSION_KEY)

  if (!clientSession && tokens.cart) {
    // Cookie exists, but client-side session does not
    // Set for client-side requests
    localStorage.setItem(WOO_SESSION_KEY, tokens.cart)
  }

  // Create client-side GQL client with available tokens
  const client = useClient(tokens)
  return <>{children}</>
}

export default APIContext
