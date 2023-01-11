import {
  AUTH_TOKEN_KEY,
  CART_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_TOKEN_KEY,
  WOO_SESSION_KEY,
} from "@lib/constants"
import { isTokenValid } from "@lib/utils/validateToken"
// import loginOrRefresh from "../api/loginOrRefresh"

type CheckAuthAPIInputType = {
  cookies: Partial<{
    [key: string]: string
  }>
  tokens?: CLIENT_TokensType
}

const checkAuthAPI = async ({
  cookies,
  tokens: incomingTokens,
}: CheckAuthAPIInputType): Promise<API_AuthCheckResultType> => {
  let tokens: CLIENT_TokensType = {
    auth: cookies[AUTH_TOKEN_KEY] ?? incomingTokens?.auth,
    refresh: cookies[REFRESH_TOKEN_KEY] ?? incomingTokens?.refresh,
    cart: cookies[CART_TOKEN_KEY] ?? incomingTokens?.cart,
    session: cookies[WOO_SESSION_KEY] ?? incomingTokens?.session,
    user: cookies[USER_TOKEN_KEY] ?? incomingTokens?.user,
  }

  let isAuth = false

  if (isTokenValid(tokens.auth)) {
    // Valid authToken is present

    isAuth = true
  } else if (tokens.refresh) {
    // Try to get a new authToken
    // const authData = await loginOrRefresh({ tokens })
    // return { ...authData }
  }

  return { tokens, isAuth, newCookies: [], user: null }
}

export default checkAuthAPI
