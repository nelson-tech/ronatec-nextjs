import { useCallback } from "react"
import { shallow } from "zustand/shallow"

import getClient from "@api/client"
import {
  Customer,
  RegisterUserDocument,
  RegisterUserInput,
} from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@lib/constants"
import setCookie from "@lib/utils/setCookie"

const useRegister = () => {
  const { setCustomer, setLoggedIn, setAlert } = useStore(
    (state) => ({
      setCustomer: state.auth.setCustomer,
      setLoggedIn: state.auth.setLoggedIn,
      setAlert: state.alert.setAlert,
    }),
    shallow
  )

  const client = getClient()

  const register = useCallback(
    async (input: RegisterUserInput) => {
      try {
        const registerData = await client.request(RegisterUserDocument, {
          input,
        })

        const registrationData = registerData?.registerUser

        if (
          registrationData?.user?.jwtAuthToken &&
          registrationData.user.jwtRefreshToken
        ) {
          // Set cookies
          setCookie(AUTH_TOKEN_KEY, registrationData.user.jwtAuthToken)
          setCookie(REFRESH_TOKEN_KEY, registrationData.user.jwtRefreshToken)

          const customer = registrationData.user as Customer

          setCustomer(customer)
          setAlert({
            open: true,
            kind: "success",
            primary: `Welcome${
              (customer?.firstName || customer?.lastName) && ","
            }${customer?.firstName && ` ${customer.firstName}`}${
              customer?.lastName && ` ${customer.lastName}`
            }!`,
            secondary: "You are now registered.",
          })
          setLoggedIn(true)
        }
      } catch (error) {
        console.warn("Error during registration:", error)
        setAlert({
          open: true,
          kind: "error",
          primary: "Error during registration.",
        })
      }
    },
    [client, setAlert, setCustomer, setLoggedIn]
  )

  return { register }
}

export default useRegister
