"use client"

import useClient from "@api/client"
import {
  ResetUserPasswordDocument,
  SendPasswordResetEmailDocument,
  User,
} from "@api/codegen/graphql"
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@lib/constants"
import setCookie from "@lib/utils/setCookie"
import { useState } from "react"

import useStore from "./useStore"

const errorCodes: { [key: string]: string } = {}

const useResetPassword = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const client = useClient()

  const { setAlert, setLoggedIn, setUser } = useStore(state => ({
    setAlert: state.alert.setAlert,
    setLoggedIn: state.auth.setLoggedIn,
    setUser: state.auth.setUser,
  }))

  const sendResetPasswordEmail = (username: string) => {
    setError(null)
    setLoading(true)
    return client
      .request(SendPasswordResetEmailDocument, { username })
      .then(() => {
        setLoading(false)
        return true
      })
      .catch(errors => {
        const message = errorCodes[errors.message]
          ? errorCodes[errors.message]
          : `Error: ${errors.message}`
        setError(message)
        setLoading(false)
        return false
      })
  }

  const resetUserPassword = (
    key: string,
    username: string,
    password: string,
  ) => {
    setError(null)
    setLoading(true)
    return client
      .request(ResetUserPasswordDocument, { key, login: username, password })
      .then(async response => {
        const user = (response.resetUserPassword?.user as User) || null

        if (user) {
          const { jwtAuthToken, jwtRefreshToken, ...plainUser } = user
          setUser(plainUser)

          // Set cookies
          setCookie(AUTH_TOKEN_KEY, jwtAuthToken)
          setCookie(REFRESH_TOKEN_KEY, jwtRefreshToken)

          setLoggedIn(true)

          setAlert({
            open: true,
            kind: "success",
            primary: `Welcome back${
              (user?.firstName || user?.lastName) && ","
            }${user?.firstName && ` ${user.firstName}`}${
              user?.lastName && ` ${user.lastName}`
            }!`,
            secondary: "Your password has been reset.",
          })

          setLoading(false)
          return true
        }
        setLoading(false)
        return false
      })
      .catch(errors => {
        const message = errorCodes[errors.message]
          ? errorCodes[errors.message]
          : `Error: ${errors.message}`
        setError(message)
        setLoading(false)
        return false
      })
  }

  return {
    resetUserPassword,
    sendResetPasswordEmail,
    error,
    loading,
  }
}

export default useResetPassword
