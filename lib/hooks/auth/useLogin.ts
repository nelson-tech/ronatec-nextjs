import { shallow } from "zustand/shallow"

import useClient from "@api/client"
import {
  LoginUserDocument,
  LoginUserMutationVariables,
} from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"
import { AUTH_ENDPOINT } from "@lib/constants"
import { EP_Auth_Input_Set_Type } from "@lib/types/auth"

const useLogin = () => {
  const { setAlert, setUser, setLoggedIn, setLoginError } = useStore(
    state => ({
      setUser: state.auth.setUser,
      setLoggedIn: state.auth.setLoggedIn,
      setLoginError: state.auth.setLoginError,
      setAlert: state.alert.setAlert,
    }),
    shallow,
  )

  const client = useClient()

  const login = async ({ input }: LoginUserMutationVariables) => {
    client.setHeader("auth", "true")
    await client
      .request(LoginUserDocument, { input })
      .then(async data => {
        console.log("Login Data", data)

        if (data) {
          const { login } = data
          if (login?.user?.jwtAuthToken) {
            const { jwtAuthToken, jwtRefreshToken, ...user } = login.user

            // Set authToken in client
            client.setHeader("Authorization", `Bearer ${jwtAuthToken}`)

            // Set cart session in client
            user.wooSessionToken &&
              client.setHeader(
                "woocommerce-session",
                `Session ${user.wooSessionToken}`,
              )

            // Set user in store
            setUser(user)

            // Make client call to API to set cookies for frontend
            const body: EP_Auth_Input_Set_Type = {
              action: "SET",
              tokens: {
                auth: jwtAuthToken,
                refresh: jwtRefreshToken,
                cart: user.wooSessionToken,
              },
            }

            await fetch(AUTH_ENDPOINT, {
              method: "POST",
              body: JSON.stringify(body),
            })

            setAlert({
              open: true,
              kind: "success",
              primary: `Welcome back${
                (user?.firstName || user?.lastName) && ","
              }${user?.firstName && ` ${user.firstName}`}${
                user?.lastName && ` ${user.lastName}`
              }!`,
              secondary: "You are now logged in.",
            })
            setLoggedIn(true)
          }
        }
      })
      .catch(error => {
        console.warn("Error logging in", error)

        if (error.message.includes("invalid")) {
          setLoginError("Email or password is incorrect.")
        }
      })

    client.setHeader("auth", "false")
  }

  return { login }
}

export default useLogin
