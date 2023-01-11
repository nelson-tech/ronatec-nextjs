import { shallow } from "zustand/shallow"

import useClient from "@api/client"
import {
  LoginUserDocument,
  LoginUserMutationVariables,
} from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"
import { AUTH_ENDPOINT } from "@lib/constants"

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
    console.log("Logging in", input)

    await client
      .request(LoginUserDocument, { input })
      .then(async data => {
        console.log("LOGIN RESPONSE", data)

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
            const body: ENDPOINT_SetInputType = {
              action: "SET",
              tokens: {
                auth: jwtAuthToken,
                refresh: jwtRefreshToken,
                user: encodeURIComponent(JSON.stringify(user)),
                session: user.wooSessionToken,
              },
            }

            await fetch(AUTH_ENDPOINT, {
              method: "POST",
              body: JSON.stringify(body),
            })

            setAlert({
              open: true,
              type: "success",
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
        if (error.message.includes("incorrect")) {
          setLoginError("Email or password is incorrect.")
        }
      })
  }

  return { login }
}

export default useLogin
