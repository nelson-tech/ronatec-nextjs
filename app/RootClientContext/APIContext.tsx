"use client"

import getClient from "@api/client"
import getTokensClient from "@lib/utils/getTokensClient"

type APIContextPropsType = {
  children: React.ReactNode
}

const APIContext = ({ children }: APIContextPropsType) => {
  //
  // Initiate client-side API client
  //

  getTokensClient().then(({ tokens }) => {
    getClient(tokens)
  })

  return <>{children}</>
}

export default APIContext
