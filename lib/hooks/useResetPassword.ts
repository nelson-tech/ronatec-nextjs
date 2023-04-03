"use client"

import getClient from "@api/client"
import {
  Customer,
  GetCustomerDataDocument,
  ResetUserPasswordDocument,
  SendPasswordResetEmailDocument,
  User,
} from "@api/codegen/graphql"
import {
  AUTH_TOKEN_KEY,
  CUSTOMER_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@lib/constants"
import encodeToken from "@lib/utils/encodeJwt"
import setCookie from "@lib/utils/setCookie"
import { useState } from "react"

import useStore from "./useStore"

const errorCodes: { [key: string]: string } = {}

const useResetPassword = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const client = getClient()

  const { setAlert, setLoggedIn, setCustomer } = useStore((state) => ({
    setAlert: state.alert.setAlert,
    setLoggedIn: state.auth.setLoggedIn,
    setCustomer: state.auth.setCustomer,
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
      .catch((errors) => {
        const message = errorCodes[errors.message]
          ? errorCodes[errors.message]
          : `Error: ${errors.message}`
        setError(message)
        setLoading(false)
        return false
      })
  }

  const resetCustomerPassword = async (
    key: string,
    username: string,
    password: string
  ) => {
    setError(null)
    setLoading(true)

    const resetData = await client
      .request(ResetUserPasswordDocument, { key, login: username, password })
      .catch((errors) => {
        const message = errorCodes[errors.message]
          ? errorCodes[errors.message]
          : `Error: ${errors.message}`
        setError(message)
        setLoading(false)
        return false
      })

    if (typeof resetData !== "boolean") {
      const user = resetData?.resetUserPassword?.user
        ? (resetData.resetUserPassword.user as User)
        : null

      if (user) {
        const { jwtAuthToken, jwtRefreshToken } = user

        // Get customer data
        const customerData = await client.request(GetCustomerDataDocument)

        const customer = customerData?.customer
          ? (customerData.customer as Customer)
          : null

        // Encode customer into token
        const customerToken = customer ? encodeToken(customer) : null

        // Set cookies
        setCookie(AUTH_TOKEN_KEY, jwtAuthToken)
        setCookie(REFRESH_TOKEN_KEY, jwtRefreshToken)
        // Set customer token's expiration to same as refreshToken
        customerToken &&
          setCookie(CUSTOMER_TOKEN_KEY, customerToken, {}, jwtRefreshToken)

        setLoggedIn(true)
        setCustomer(customer)

        setAlert({
          open: true,
          kind: "success",
          primary: `Welcome back${(user?.firstName || user?.lastName) && ","}${
            user?.firstName && ` ${user.firstName}`
          }${user?.lastName && ` ${user.lastName}`}!`,
          secondary: "Your password has been reset.",
        })
        setLoading(false)
        return true
      }
    }

    return false
  }

  return {
    resetCustomerPassword,
    sendResetPasswordEmail,
    error,
    loading,
  }
}

export default useResetPassword
