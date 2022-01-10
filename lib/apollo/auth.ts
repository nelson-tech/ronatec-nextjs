import jwt_decode, { JwtPayload } from "jwt-decode"
import { TokenRefreshLink } from "apollo-link-token-refresh"
import { isServer } from "@lib/utils"
import { gql } from "@apollo/client"

// Local Storage Key
export const AUTH_TOKEN_KEY: string = `auth-token`
export const REFRESH_TOKEN_KEY: string = `refresh-token`
export const WOO_SESSION_KEY: string = `woo-session`
export const CLIENT_MUTATION_KEY: string = `client-mutation`
export const LOGGED_OUT_KEY: string = `logged-out-time`

type inMemoryAuthTokenType = {
  authToken: string | null
  authExpiration: number | null
}

const inMemoryAuthTokenDefault: inMemoryAuthTokenType = {
  authToken: null,
  authExpiration: null,
}

let inMemoryAuthToken = inMemoryAuthTokenDefault

// Example decoded authToken:
// {
//   iss: 'https://api.ronatec.us',
//   iat: 1641827249,
//   nbf: 1641827249,
//   exp: 1641827549,
//   data: { user: { id: '1' } }
// }

// Example decoded refreshToken:
// {
//   iss: 'https://api.ronatec.us',
//   iat: 1641827249,
//   nbf: 1641827249,
//   exp: 1673363249,
//   data: { user: { id: '1', user_secret: 'graphql_jwt_61db225bb92fa' } }
// }

// Example decoded wooSessionToken:
// {
//   iss: 'https://api.ronatec.us',
//   iat: 1641827249,
//   nbf: 1641827249,
//   exp: 1643036849,
//   data: { customer_id: 1 }
// }

export const registerMutation = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user {
        jwtAuthToken
        jwtRefreshToken
      }
    }
  }
`

export const refreshMutation = gql`
  mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {
    refreshJwtAuthToken(input: $input) {
      authToken
    }
  }
`

export const isTokenExpired = (): boolean => {
  if (!isServer()) {
    const now = Date.now()
    const authToken = getAuthToken()
    const expiration = authToken?.authExpiration
      ? authToken.authExpiration
      : now
    return authToken ? now - expiration < 1000 : true
  }
  return true
}

export const isLoggedOut = () => {
  const loggedOutTime = getLoggedOutTime()
  return loggedOutTime && loggedOutTime <= Date.now()
}

export const getAuthToken = () => {
  if (!isServer()) {
    return inMemoryAuthToken
  }
  return null
}

export const getRefreshToken = () => {
  if (!isServer()) {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  }
  return null
}

export const getClientMutationId = () => {
  if (!isServer()) {
    return localStorage.getItem(CLIENT_MUTATION_KEY)
  }
  return null
}

export const getSessionToken = () => {
  if (!isServer()) {
    return localStorage.getItem(WOO_SESSION_KEY)
  }
  return null
}

export const getLoggedOutTime = () => {
  if (!isServer()) {
    return JSON.parse(localStorage.getItem(LOGGED_OUT_KEY) || "")
  }
  return null
}

export const setAuthToken = (authToken: string) => {
  if (!isServer()) {
    inMemoryAuthToken = {
      authToken,
      authExpiration: jwt_decode<JwtPayload>(authToken).exp || null,
    }
  }
}

export const setRefreshToken = (refreshToken: string, callback: any) => {
  if (!isServer()) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    localStorage.removeItem(LOGGED_OUT_KEY)

    if (callback) {
      callback()
    }
  }
}

export const setWooSession = (wooSession: string) => {
  if (!isServer()) {
    localStorage.setItem(WOO_SESSION_KEY, wooSession)
  }
}

export const setLoggedOutTime = () => {
  if (!isServer()) {
    localStorage.setItem(LOGGED_OUT_KEY, JSON.stringify(Date.now()))
  }
}

export const deleteRefreshToken = () => {
  if (!isServer()) {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }
  return null
}

export const logout = (callback: () => any) => {
  inMemoryAuthToken = inMemoryAuthTokenDefault
  deleteRefreshToken()
  setLoggedOutTime()

  if (callback) {
    callback()
  }
}

// const refreshLink = new TokenRefreshLink<{ token; refreshToken }>({
//   isTokenValidOrUndefined: (token: string) =>
//     !isTokenExpired(token) || typeof getRefreshToken() !== "string",
//   fetchAccessToken: () => {
//     return fetch(getEndpoint("getAccessTokenPath"), {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${getAccessToken()}`,
//         "refresh-token": getRefreshToken(),
//       },
//     })
//   },
//   handleFetch: accessToken => {
//     const accessTokenDecrypted = jwtDecode(accessToken)
//     setAccessToken(accessToken)
//     setExpiresIn(parseExp(accessTokenDecrypted.exp).toString())
//   },
//   handleResponse: (operation, accessTokenField) => response => {
//     // here you can parse response, handle errors, prepare returned token to
//     // further operations
//     // returned object should be like this:
//     // {
//     //    access_token: 'token string here'
//     // }
//   },
//   handleError: err => {
//     // full control over handling token fetch Error
//     console.warn("Your refresh token is invalid. Try to relogin")
//     console.error(err)

//     // your custom action here
//     user.logout()
//   },
// })
