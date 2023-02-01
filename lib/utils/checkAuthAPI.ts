import { RefreshAuthTokenDocument } from "@api/codegen/graphql"
import {
  API_URL,
  AUTH_TOKEN_EXPIRATION,
  AUTH_TOKEN_KEY,
  CART_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@lib/constants"
import type { CLIENT_Tokens_Type, EP_Auth_Check_Type } from "@lib/types/auth"
import { isTokenValid } from "@lib/utils/validateToken"
import { GraphQLClient } from "graphql-request"

type CheckAuthAPIInputType = {
  cookies: Partial<{
    [key: string]: string
  }>
  tokens?: CLIENT_Tokens_Type
}

const checkAuthAPI = async ({
  cookies,
  tokens: incomingTokens,
}: CheckAuthAPIInputType): Promise<EP_Auth_Check_Type> => {
  let tokens: CLIENT_Tokens_Type = {
    auth: cookies[AUTH_TOKEN_KEY] ?? incomingTokens?.auth,
    refresh: cookies[REFRESH_TOKEN_KEY] ?? incomingTokens?.refresh,
    cart: cookies[CART_TOKEN_KEY] ?? incomingTokens?.cart,
  }

  const newCookies: string[] = []

  let isAuth = false

  if (isTokenValid(tokens.auth)) {
    // Valid authToken is present

    isAuth = true
  } else if (tokens.refresh) {
    // authToken is invalid. Null it to be safe
    tokens.auth = null

    const client = new GraphQLClient(API_URL as string)

    tokens?.auth && client.setHeader("Authorization", `Bearer ${tokens.auth}`)

    // Try to get a new authToken
    const refreshData = await client.request(RefreshAuthTokenDocument, {
      input: { jwtRefreshToken: tokens.refresh },
    })

    if (refreshData.refreshJwtAuthToken?.authToken) {
      const authToken = refreshData.refreshJwtAuthToken.authToken
      newCookies.push(
        `${AUTH_TOKEN_KEY}=${authToken}; HttpOnly; Path=/; SameSite=None; Secure; expires=${new Date(
          Date.now() + AUTH_TOKEN_EXPIRATION,
        ).toUTCString()}`,
      )

      tokens.auth = authToken

      isAuth = true
    }

    // const authData = await useRefreshToken(tokens)
    // return { ...authData }
  }

  return { tokens, isAuth, newCookies: [] }
}

export default checkAuthAPI
