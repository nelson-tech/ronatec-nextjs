"use client"

import useClient from "@api/client"
import { CLIENT_Tokens_Type } from "@lib/types/auth"

type APIContextPropsType = {
  children: React.ReactNode
  tokens: CLIENT_Tokens_Type
}

const APIContext = ({ children, tokens }: APIContextPropsType) => {
  //
  // Initiate client-side API client
  //

  // Create client-side GQL client with available tokens
  const client = useClient(tokens)

  return <>{children}</>
}

export default APIContext
