import { shallow } from "zustand/shallow"

import getClient from "@api/client"
import {
  Customer,
  LoginUserDocument,
  LoginUserMutationVariables,
} from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@lib/constants"
import setCookie from "@lib/utils/setCookie"
import { useCallback } from "react"

const useLogin = () => {
  const { setAlert, setCustomer, setLoggedIn } = useStore(
    (state) => ({
      setCustomer: state.auth.setCustomer,
      setLoggedIn: state.auth.setLoggedIn,
      setAlert: state.alert.setAlert,
    }),
    shallow
  )

  const client = getClient()

  const login = useCallback(
    async ({ input }: LoginUserMutationVariables) => {
      await client
        .request(LoginUserDocument, { input })
        .then(async (data) => {
          if (data) {
            const { login } = data
            if (login?.authToken && login.refreshToken) {
              const customer = login.customer

              // Set authToken in client
              client.setHeader("Authorization", `Bearer ${login.authToken}`)

              // Set customer in store
              setCustomer(customer as Customer)

              // Set cookies
              setCookie(AUTH_TOKEN_KEY, login.authToken)
              setCookie(REFRESH_TOKEN_KEY, login.refreshToken)

              setAlert({
                open: true,
                kind: "success",
                primary: `Welcome back${
                  (customer?.firstName || customer?.lastName) && ","
                }${customer?.firstName && ` ${customer.firstName}`}${
                  customer?.lastName && ` ${customer.lastName}`
                }!`,
                secondary: "You are now logged in.",
              })
              setLoggedIn(true)
            }
          }
        })
        .catch((error) => {
          console.warn("Error logging in", error)

          setAlert({
            open: true,
            kind: "error",
            primary: "Email or password is incorrect.",
          })
        })
    },
    [client, setAlert, setCustomer, setLoggedIn]
  )

  return { login }
}

export default useLogin
