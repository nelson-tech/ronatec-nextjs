import { useCallback, useEffect } from "react"
import { ApolloQueryResult, gql, useReactiveVar } from "@apollo/client"
import { v4 as uuid } from "uuid"
import jwt_decode, { JwtPayload } from "jwt-decode"

import { loggedInVar, userVar } from "@lib/apollo/cache"
import { InMemoryAuthTokenType } from "@lib/types"
import { initializeApollo } from "@lib/apollo"
import {
  loginMutation,
  logoutMutation,
  refreshMutation,
  registerMutation,
} from "@api/mutations"
import { RegisterUserInput, User } from "@api/gql/types"
import { authConstants } from "@lib"
import { isServer } from "@lib/utils"
import { useAlert } from "."

const userQuery = gql`
  query UserQuery($id: ID!) {
    user(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      firstName
      lastName
      username
      email
    }
  }
`

const useAuth = () => {
  const loggedIn = useReactiveVar(loggedInVar)
  const user = useReactiveVar(userVar)

  const { showAlert } = useAlert()

  // Setters

  const setAuthToken = useCallback((serverAuthToken: string) => {
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

  const setUser = (user?: User) => {
    const currentUser = userVar()
    currentUser !== user && userVar(user)
  }

  const setRefreshToken = (refreshToken: string, callback?: () => any) => {
    if (!isServer) {
      console.log("REFRESH", jwt_decode<JwtPayload>(refreshToken))

      localStorage.setItem(authConstants.REFRESH_TOKEN_KEY, refreshToken)
      localStorage.removeItem(authConstants.LOGGED_OUT_KEY)
      setLoggedIn(true)

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

  // Populate User

  const fetchUser = useCallback(async () => {
    const client = initializeApollo({})

    if (client) {
      const authData = getAuthToken()

      if (authData?.userId) {
        const userReturnData: ApolloQueryResult<{ user: User }> =
          await client.query({
            query: userQuery,
            variables: { id: authData.userId },
            errorPolicy: "all",
          })

        if (userReturnData?.data) {
          const { ...userData } = userReturnData.data.user

          userData && setUser(userData)
        }
      }
    }
  }, [getAuthToken])

  useEffect(() => {
    if (loggedIn && !user) {
      fetchUser()
    }
  })

  // Login

  const login = async (
    userInput: { login: string; password: string; rememberMe: boolean },
    callback?: () => any,
  ) => {
    let errors: string | null = null
    if (!isServer) {
      const client = initializeApollo({})
      const cookiesInput = {
        clientMutationId: getClientMutationId(),
        ...userInput,
      }
      const jwtInput = {
        clientMutationId: getClientMutationId(),
        username: userInput.login,
        password: userInput.password,
      }

      await client
        .mutate({
          mutation: loginMutation,
          variables: { cookiesInput, jwtInput },
          errorPolicy: "all",
        })
        .then(response => {
          if (response.data?.loginWithCookies?.status === "SUCCESS") {
            const user: User = response.data.login.user
            setUser(user)

            user.jwtAuthToken && setAuthToken(user.jwtAuthToken)
            user.jwtRefreshToken && setRefreshToken(user.jwtRefreshToken)

            setLoggedIn(true)

            showAlert({
              open: true,
              type: "success",
              primary: `Welcome back${
                (user?.firstName || user?.lastName) && ","
              }${user?.firstName && ` ${user.firstName}`}${
                user?.lastName && ` ${user.lastName}`
              }!`,
              secondary: "You are now logged in.",
            })

            callback && callback()
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

  const logout = async (callback?: () => any) => {
    if (!isServer) {
      const client = initializeApollo({})

      await client
        .mutate({
          mutation: logoutMutation,
          variables: { input: { clientMutationId: getClientMutationId() } },
          errorPolicy: "all",
        })
        .then(async r => {
          localStorage.removeItem(authConstants.AUTH_TOKEN_KEY)
          localStorage.removeItem(authConstants.REFRESH_TOKEN_KEY)

          localStorage.setItem(
            authConstants.LOGGED_OUT_KEY,
            JSON.stringify(Date.now()),
          )

          setLoggedIn(false)
          setUser()

          showAlert({
            open: true,
            primary: "Logged out.",
            secondary: "",
            type: "info",
          })

          await client.refetchQueries({ include: ["CartQuery"] })

          if (callback) {
            callback()
          }
        })
        .catch(err => {
          console.log("useAuth Logout Error", err)
        })
    }
  }

  const registerUser = async ({
    input,
    callback,
  }: {
    input: RegisterUserInput
    callback?: () => any
  }) => {
    if (!isServer) {
      const client = initializeApollo({})

      let error: string | null = null

      console.log("INPUT", input)

      await client
        .mutate({
          mutation: registerMutation,
          variables: { input },
          errorPolicy: "all",
        })
        .then(async r => {
          console.log("REGISTER RES", r)

          const { data, errors } = r

          const registerUser = data?.registerUser
          if (registerUser) {
            const user = (registerUser.user as User) || null

            if (user) {
              user.jwtAuthToken && setAuthToken(user.jwtAuthToken)
              user.jwtRefreshToken &&
                setRefreshToken(user.jwtRefreshToken, callback)

              showAlert({
                open: true,
                type: "success",
                primary: `Welcome${(user?.firstName || user?.lastName) && ","}${
                  user?.firstName && ` ${user.firstName}`
                }${user?.lastName && ` ${user.lastName}`}!`,
                secondary: "You are now registered.",
              })
            }
            // TODO - Handle error cases
          }

          if (errors && errors.length > 0) {
            if (
              errors[0].message.includes(
                "This email address is already registered.",
              )
            )
              error = "This email address is already registered."
          }

          console.log("REG ERR", error)
        })
        .catch(e => {
          console.log("REGISTER ERROR", e)
        })
      return error
    }
  }

  return {
    loggedIn,
    user,
    getAuthToken,
    getClientMutationId,
    getClientShopId,
    login,
    logout,
    refreshAuthToken,
    registerUser,
    setAuthToken,
    setLoggedIn,
    setRefreshToken,
    setUser,
  }
}

export default useAuth
