import { cookies as nextCookies } from "next/headers"

import {
  AUTH_TOKEN_KEY,
  CART_TOKEN_KEY,
  WOO_SESSION_KEY,
  REFRESH_TOKEN_KEY,
  USER_TOKEN_KEY,
} from "@lib/constants"

// ####
// #### Function (Can only be called on server)
// ####

const getTokens = (): { tokens: CLIENT_TokensType } => {
  const cookies = nextCookies()

  const authToken = cookies.get(AUTH_TOKEN_KEY)?.value
  const refreshToken = cookies.get(REFRESH_TOKEN_KEY)?.value
  const cartToken = cookies.get(CART_TOKEN_KEY)?.value
  const cartSession = cookies.get(WOO_SESSION_KEY)?.value
  const userToken = cookies.get(USER_TOKEN_KEY)?.value

  console.log("USER", cookies)

  return {
    tokens: {
      auth: authToken,
      refresh: refreshToken,
      cart: cartToken,
      session: cartSession,
      user: userToken,
    },
  }
}

export default getTokens
