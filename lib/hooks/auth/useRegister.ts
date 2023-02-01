import { shallow } from "zustand/shallow"

import useStore from "@lib/hooks/useStore"
import useClient from "@api/client"
import {
  RegisterUserDocument,
  RegisterUserMutationVariables,
  User,
} from "@api/codegen/graphql"
import { EP_Auth_Input_Set_Type } from "@lib/types/auth"
import { AUTH_ENDPOINT } from "@lib/constants"

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

      // Make call to endpoint to set cookies on client
      const body: EP_Auth_Input_Set_Type = {
        action: "SET",
        tokens: { auth: jwtAuthToken, refresh: jwtRefreshToken },
      }
      await fetch(AUTH_ENDPOINT, { method: "POST", body: JSON.stringify(body) })

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
