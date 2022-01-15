import { createContext, FC, useContext, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"

import {
  getAuthToken,
  getRefreshToken,
  isLoggedOut,
  isTokenExpired,
  LOGGED_OUT_KEY,
  logout,
  refreshMutation,
  setAuthToken,
} from "@lib/apollo/auth"
import { initializeApollo } from "@lib/apollo"

const AuthContext = createContext<{ isLoggedIn: () => boolean } | null>(null)

export const AuthProvider: FC = ({ children }) => {
  return (
    <AuthContext.Provider value={useProvideAuth()}>
      {children}
    </AuthContext.Provider>
  )
}

const syncLoginStatus = (event: any) => {
  if (event.key === LOGGED_OUT_KEY && isLoggedOut()) {
    // logout(navigate("/dashboard/"))
  }
}

const useProvideAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const isLoggedIn = (): boolean => loggedIn

  /**
   * Make sure, User is logged out on all Tabs
   */
  useEffect(() => {
    window.addEventListener("storage", syncLoginStatus)

    return () => {
      window.removeEventListener("storage", syncLoginStatus)
    }
  })

  useEffect(() => {
    let tokenExpired = isTokenExpired()

    if (tokenExpired) {
      // Invalid Token
      const refreshToken = getRefreshToken()

      if (refreshToken) {
        // Refresh Token
        const clientMutationId = uuid()
        const client = initializeApollo({})

        const input = { clientMutationId, jwtRefreshToken: refreshToken }

        client
          .mutate({
            mutation: refreshMutation,
            variables: { input },
          })
          .then(response => {
            console.log("silentRefresh", response)
            const authToken = response.data.refreshJwtAuthToken
              ? response.data.refreshJwtAuthToken.authToken
              : null
            if (authToken) {
              // Refresh successful
              setAuthToken(authToken)
              !loggedIn && setLoggedIn(true)
            } else {
              // Refresh failed. User must login
              loggedIn && setLoggedIn(false)
            }
          })
      } else {
        // No authentication method. User must login.
        loggedIn && setLoggedIn(false)
      }
    } else {
      // Token is valid
      !loggedIn && setLoggedIn(true)
      console.log("Valid User")
    }
  }, [loggedIn])

  return {
    isLoggedIn,
    // user: token ? token.user : null,
  }
}

const useAuth = () => useContext(AuthContext)

export default useAuth
