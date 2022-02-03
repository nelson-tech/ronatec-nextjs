import { useCallback, useEffect } from "react"
import { useReactiveVar } from "@apollo/client"
import isEqual from "lodash.isequal"
import { v4 as uuid } from "uuid"
import jwt_decode, { JwtPayload } from "jwt-decode"

import { loggedInVar } from "@lib/apollo/cache"
import { InMemoryAuthTokenType } from "@lib/types"
import { initializeApollo } from "@lib/apollo"
import { loginMutation, refreshMutation } from "@api/mutations"
import { User } from "@api/gql/types"
import { authConstants } from "@lib"
import { isServer } from "@lib/utils"

const useAuth = () => {
  const loggedIn = useReactiveVar(loggedInVar)

  // Setters

  const setAuthToken = useCallback((serverAuthToken: string) => {
    if (!isServer) {
      const authToken = {
        authToken: serverAuthToken,
        authExpiration: jwt_decode<JwtPayload>(serverAuthToken).exp || null,
      }

      localStorage.setItem(
        authConstants.AUTH_TOKEN_KEY,
        JSON.stringify(authToken),
      )
    }
  }, [])

  const setLoggedIn = (loggedIn: boolean) => {
    const currentAuth = loggedInVar()
    loggedIn !== currentAuth && loggedInVar(loggedIn)
  }

  const setRefreshToken = (refreshToken: string, callback?: () => any) => {
    if (!isServer) {
      console.log("REFRESH", jwt_decode<JwtPayload>(refreshToken))

      localStorage.setItem(authConstants.REFRESH_TOKEN_KEY, refreshToken)
      localStorage.removeItem(authConstants.LOGGED_OUT_KEY)

      if (callback) {
        callback()
      }
    }
  }

  // Getters

  const getAuthToken = useCallback((): InMemoryAuthTokenType | undefined => {
    if (!isServer) {
      const authToken = localStorage.getItem(authConstants.AUTH_TOKEN_KEY)
      if (authToken) {
        return JSON.parse(authToken)
      }
    }
  }, [])

  const getClientMutationId = useCallback(() => {
    if (!isServer) {
      let clientMutationId = localStorage.getItem(
        authConstants.CLIENT_MUTATION_KEY,
      )
      if (!clientMutationId) {
        clientMutationId = uuid()
        localStorage.setItem(
          authConstants.CLIENT_MUTATION_KEY,
          clientMutationId,
        )
      }
      return uuid()
    }
  }, [])

  const getClientShopId = () => {
    if (!isServer) {
      const sessionToken = getWooSession() || ""
      if (sessionToken) {
        const clientShopId =
          jwt_decode<{ data: { customer_id: string } }>(sessionToken).data
            .customer_id

        return clientShopId
      }
    }
  }

  const getRefreshToken = useCallback(() => {
    if (!isServer) {
      return localStorage.getItem(authConstants.REFRESH_TOKEN_KEY)
    }
    return null
  }, [])

  const getWooSession = () => {
    if (!isServer) {
      return localStorage.getItem(authConstants.WOO_SESSION_KEY)
    }
    return null
  }

  const isTokenExpired = useCallback((): boolean => {
    if (!isServer) {
      const now = Date.now()
      const authToken = getAuthToken()
      if (authToken) {
        const expiration = authToken.authExpiration
          ? authToken.authExpiration
          : now
        return authToken ? now - expiration < 1000 : true
      }
    }
    return true
  }, [getAuthToken])

  // Refresh Token

  const refreshAuthToken = useCallback(async () => {
    const clientMutationId = getClientMutationId()

    const refreshToken = getRefreshToken()

    if (refreshToken) {
      // Refresh Token
      const clientMutationId = getClientMutationId()

      const client = initializeApollo({})

      const input = { clientMutationId, jwtRefreshToken: refreshToken }

      if (client) {
        await client
          .mutate({
            mutation: refreshMutation,
            variables: { input },
          })
          .then(response => {
            const authToken = response.data.refreshJwtAuthToken
              ? response.data.refreshJwtAuthToken.authToken
              : null
            if (authToken) {
              // Refresh successful
              setAuthToken(authToken)
              !loggedIn && setLoggedIn(true)
              console.log("silentRefresh #3!")
            } else {
              // Refresh failed. User must login
              loggedIn && setLoggedIn(false)
            }
          })
      }
    } else {
      // No authentication method. User must login.
      loggedIn && setLoggedIn(false)
    }
  }, [getClientMutationId, getRefreshToken, loggedIn, setAuthToken])

  useEffect(() => {
    const tokenExpired = isTokenExpired()

    if (tokenExpired) {
      // Invalid Token

      refreshAuthToken()
    } else {
      // Token is valid
      !loggedIn && setLoggedIn(true)
    }
  }, [
    loggedIn,
    getClientMutationId,
    getRefreshToken,
    isTokenExpired,
    setAuthToken,
    refreshAuthToken,
  ])

  // const syncLoginStatus = (event: any) => {
  //   if (event.key === authConstants.LOGGED_OUT_KEY && !loggedIn) {
  //     // logout(navigate("/dashboard/"))
  //   }
  // }

  // /**
  //  * Make sure, User is logged out on all Tabs
  //  */
  // useEffect(() => {
  //   window.addEventListener("storage", syncLoginStatus)

  //   return () => {
  //     window.removeEventListener("storage", syncLoginStatus)
  //   }
  // })

  // Login

  const login = async (
    userInput: { login: string; password: string; rememberMe: boolean },
    callback?: () => any,
  ) => {
    let errors: string | null = null
    if (!isServer) {
      const client = initializeApollo({})
      const input = {
        clientMutationId: getClientMutationId(),
        ...userInput,
      }

      await client
        .mutate({
          mutation: loginMutation,
          variables: { input },
          errorPolicy: "all",
        })
        .then(response => {
          console.log("COOKIES", response)

          if (response.data?.loginWithCookies?.status === "SUCCESS") {
            // const user: User = response.data.login.user
            // user.jwtAuthToken && setAuthToken(user.jwtAuthToken)
            // user.jwtRefreshToken &&
            //   setRefreshToken(user.jwtRefreshToken, callback)
            setLoggedIn(true)
            console.log("LOGGGGG")
          }

          if (response.errors) {
            const error = response.errors[0]

            ;["invalid_email", "incorrect_password"].includes(error.message) &&
              (errors = "Email or password incorrect.")
          }
        })
        .catch(err => {
          console.log("useAuth Login Error", err)
        })
    }
    return { errors }
  }

  // Logout

  const logout = (callback?: () => any) => {
    if (!isServer) {
      localStorage.removeItem(authConstants.AUTH_TOKEN_KEY)
      localStorage.removeItem(authConstants.REFRESH_TOKEN_KEY)

      localStorage.setItem(
        authConstants.LOGGED_OUT_KEY,
        JSON.stringify(Date.now()),
      )

      setLoggedIn(false)

      if (callback) {
        callback()
      }
    }
  }

  return {
    loggedIn,
    getAuthToken,
    getClientMutationId,
    getClientShopId,
    login,
    logout,
    refreshAuthToken,
    setAuthToken,
    setRefreshToken,
  }
}

export default useAuth
