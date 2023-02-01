import { cookies as nextCookies } from "next/headers"

import {
  API_URL,
  AUTH_TOKEN_KEY,
  CART_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@lib/constants"
import { CLIENT_Tokens_Type } from "@lib/types/auth"
import { isTokenValid } from "./validateToken"
import { GraphQLClient } from "graphql-request"
import { RefreshAuthTokenDocument } from "@api/codegen/graphql"

// ####
// #### Function (Can only be called on server)
// ####

const getTokens = async (): Promise<{
  tokens: CLIENT_Tokens_Type
  newAuth: boolean
}> => {
  const cookies = nextCookies()

  let authToken = cookies.get(AUTH_TOKEN_KEY)?.value
  const refreshToken = cookies.get(REFRESH_TOKEN_KEY)?.value
  const cartToken = cookies.get(CART_TOKEN_KEY)?.value

  let newAuth = false

  // Validate authToken
  if (!isTokenValid(authToken) && refreshToken && isTokenValid(refreshToken)) {
    // Try to refresh

    const client = new GraphQLClient(API_URL ?? "")
    const refreshData = await client.request(RefreshAuthTokenDocument, {
      input: { jwtRefreshToken: refreshToken },
    })

    const newAuthToken = refreshData.refreshJwtAuthToken?.authToken

    if (newAuthToken) {
      authToken = newAuthToken
      newAuth = true
    }
  }

  return {
    tokens: {
      auth: authToken,
      refresh: refreshToken,
      cart: cartToken,
    },
    newAuth,
  }
}

export default getTokens
