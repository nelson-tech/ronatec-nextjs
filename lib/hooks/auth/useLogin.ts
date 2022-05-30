import shallow from "zustand/shallow"

import useStore from "@lib/hooks/useStore"
import { setAuthToken, setRefreshToken } from "@api/urql/utils"
import { useLoginUserMutation, User } from "@api/gql/types"

type LoginPropsType = {
  input: {
    username: string
    password: string
  }
}

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

  const [_, loginMutation] = useLoginUserMutation()

  const login = async ({ input }: LoginPropsType) => {
    await loginMutation({ input }).then(res => {
      const { data, error } = res
      if (data) {
        const { login } = data
        if (login?.user?.jwtAuthToken) {
          const { jwtAuthToken, jwtRefreshToken, ...user } = login.user

          setUser(user as User)

          jwtAuthToken && setAuthToken(jwtAuthToken)
          jwtRefreshToken && setRefreshToken(jwtRefreshToken)

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

      if (error) {
        if (error.message.includes("incorrect")) {
          setLoginError("Email or password is incorrect.")
        }
      }
    })
  }

  return { login }
}

export default useLogin
