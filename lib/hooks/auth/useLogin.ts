import { shallow } from "zustand/shallow"

import useClient from "@api/client"
import {
  LoginUserDocument,
  LoginUserMutationVariables,
} from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@lib/constants"
import setCookie from "@lib/utils/setCookie"

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
    await client
      .request(LoginUserDocument, { input })
      .then(async data => {
        if (data) {
          const { login } = data
          if (login?.user?.jwtAuthToken && login.user.jwtRefreshToken) {
            const { jwtAuthToken, jwtRefreshToken, ...user } = login.user

            // Set authToken in client

            client.setHeader("Authorization", `Bearer ${jwtAuthToken}`)

            // Set user in store
            setUser(user)

            // Set cookies
            setCookie(AUTH_TOKEN_KEY, jwtAuthToken)
            setCookie(REFRESH_TOKEN_KEY, jwtRefreshToken)

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
  }

  return { login }
}

export default useLogin
