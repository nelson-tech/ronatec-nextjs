import jwt_decode from "jwt-decode"

import vanillaStore from "@lib/store/vanilla"
import isServer from "@lib/utils/isServer"
import {
  AUTH_TOKEN_KEY,
  LOGGED_OUT_KEY,
  REFRESH_TOKEN_KEY,
  USER_ID_KEY,
  WOO_SESSION_KEY,
} from "@lib/constants"
import { InMemoryAuthTokenType } from "@lib/types/auth"

const store = vanillaStore

export const isTokenValid = (): boolean => {
  if (!isServer) {
    const authToken = getAuthToken()
    if (authToken?.authExpiration) {
      const now = Date.now()
      const expiration = authToken.authExpiration
        ? authToken.authExpiration * 1000
        : now

      if (expiration - now > 1000) {
        return true
      } else {
        localStorage.removeItem(AUTH_TOKEN_KEY)
      }
    }
  }
  return false
}

export const login = (authToken?: string) => {
  authToken && setAuthToken(authToken)
  store.getState().auth.setLoggedIn(true)
}

export const logout = (full: boolean = false) => {
  if (!isServer) {
    localStorage.removeItem(AUTH_TOKEN_KEY)

    if (full) {
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      localStorage.removeItem(USER_ID_KEY)

      localStorage.setItem(LOGGED_OUT_KEY, JSON.stringify(Date.now()))
      store.getState().auth.setLoggedIn(false)
    }
  }
}

// Setters

export const setAuthToken = (serverAuthToken: string) => {
  if (!isServer) {
    const authTokenData = jwt_decode<{
      iss: string
      iat: number
      nbf: number
      exp: number
      data: { user: { id: string } }
    }>(serverAuthToken)

    const authToken = {
      authToken: serverAuthToken,
      userId: authTokenData.data.user.id,
      authExpiration: authTokenData.exp || null,
    }

    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(authToken))
  }
}

export const setRefreshToken = (refreshToken: string) => {
  if (!isServer) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    localStorage.removeItem(LOGGED_OUT_KEY)
  }
}

// Getters

export const getAuthToken = (): InMemoryAuthTokenType | null => {
  if (!isServer) {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
    if (authToken) {
      try {
        return JSON.parse(authToken)
      } catch (error) {
        return null
      }
    }
  }
  return null
}

export const getRefreshToken = (): string | null => {
  if (!isServer) return localStorage.getItem(REFRESH_TOKEN_KEY)

  return null
}

export const getWooSession = (): {
  raw: string
  clientShopId: string
} | null => {
  if (!isServer) {
    const raw = localStorage.getItem(WOO_SESSION_KEY)
    if (raw) {
      const clientShopId =
        jwt_decode<{ data: { customer_id: string } }>(raw).data.customer_id
      return { raw, clientShopId }
    }
  }
  return null
}

export const getUserId = (): string | null => {
  if (!isServer) return localStorage.getItem(USER_ID_KEY)

  return null
}
