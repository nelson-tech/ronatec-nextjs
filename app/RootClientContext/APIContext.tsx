"use client"

import getClient from "@api/client"
import { CLIENT_Tokens_Type } from "@lib/types/auth"
import getTokensClient from "@lib/utils/getTokensClient"

type APIContextPropsType = {
  children: React.ReactNode
}

const APIContext = ({ children }: APIContextPropsType) => {
  //
  // Initiate client-side API client
  //

  getTokensClient().then(({ tokens }) => {
    const client = getClient(tokens)
  })

  return <>{children}</>
}

export default APIContext
