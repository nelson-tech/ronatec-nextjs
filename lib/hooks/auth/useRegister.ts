import { shallow } from "zustand/shallow"

import getClient from "@api/client"
import {
  Customer,
  RegisterCustomerDocument,
  RegisterUserMutationVariables,
} from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@lib/constants"
import setCookie from "@lib/utils/setCookie"

const useRegister = () => {
  const { loggedIn, error, setCustomer, setLoggedIn, setAlert } = useStore(
    state => ({
      loggedIn: state.auth.loggedIn,
      error: state.auth.errors.register,
      setCustomer: state.auth.setCustomer,
      setLoggedIn: state.auth.setLoggedIn,
      setAlert: state.alert.setAlert,
    }),
    shallow,
  )

  const client = getClient()

  const register = async (input: RegisterUserMutationVariables) => {
    const registerData = await client.request(RegisterCustomerDocument, input)
    const registrationData = registerData?.registerCustomer
    if (registrationData?.authToken && registrationData.refreshToken) {
      // Set cookies
      setCookie(AUTH_TOKEN_KEY, registrationData.authToken)
      setCookie(REFRESH_TOKEN_KEY, registrationData.refreshToken)

      const customer = registrationData.customer as Customer

      setCustomer(customer)
      setAlert({
        open: true,
        kind: "success",
        primary: `Welcome${(customer?.firstName || customer?.lastName) && ","}${
          customer?.firstName && ` ${customer.firstName}`
        }${customer?.lastName && ` ${customer.lastName}`}!`,
        secondary: "You are now registered.",
      })
      setLoggedIn(true)
    }
    // TODO - Set Error
  }

  return { register }
}

export default useRegister
