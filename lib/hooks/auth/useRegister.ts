import { shallow } from "zustand/shallow"

import useClient from "@api/client"
import {
  RegisterUserDocument,
  RegisterUserMutationVariables,
  User,
} from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@lib/constants"
import setCookie from "@lib/utils/setCookie"

const useRegister = () => {
  const { loggedIn, error, setUser, setLoggedIn, setAlert } = useStore(
    state => ({
      loggedIn: state.auth.loggedIn,
      error: state.auth.errors.register,
      setUser: state.auth.setUser,
      setLoggedIn: state.auth.setLoggedIn,
      setAlert: state.alert.setAlert,
    }),
    shallow,
  )

  const client = useClient()

  const register = async (input: RegisterUserMutationVariables) => {
    const registerData = await client.request(RegisterUserDocument, input)
    const newUser = registerData?.registerUser?.user
    if (!loggedIn && newUser) {
      const { jwtAuthToken, jwtRefreshToken, ...user } = newUser

      // Set cookies
      setCookie(AUTH_TOKEN_KEY, jwtAuthToken)
      setCookie(REFRESH_TOKEN_KEY, jwtRefreshToken)

      setUser(user as User)
      setAlert({
        open: true,
        kind: "success",
        primary: `Welcome${(user?.firstName || user?.lastName) && ","}${
          user?.firstName && ` ${user.firstName}`
        }${user?.lastName && ` ${user.lastName}`}!`,
        secondary: "You are now registered.",
      })
      setLoggedIn(true)
    }
    // TODO - Set Error
  }

  return { register }
}

export default useRegister
