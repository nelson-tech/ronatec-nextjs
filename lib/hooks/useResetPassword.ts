import { useState } from "react"

import { useAlert, useAuth } from "@lib/hooks"

import { useSendPasswordResetEmail } from "./mutations"
import { useResetUserPassword } from "./mutations"
import { User } from "@api/gql/types"

const errorCodes: { [key: string]: string } = {}

/**
 * Hook which tracks if the user is logged in (assumed until a failed response).
 */
const useResetPassword = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { sendPasswordResetEmail: emailMutation } = useSendPasswordResetEmail()
  const { resetUserPassword: resetMutation } = useResetUserPassword()

  const { setLoggedIn, setUser, setAuthToken, setRefreshToken } = useAuth()

  const { showAlert } = useAlert()

  const sendResetPasswordEmail = (username: string) => {
    setError(null)
    setLoading(true)
    return emailMutation(username)
      .then(() => {
        setLoading(false)
        return true
      })
      .catch(errors => {
        const message = errorCodes[errors.message]
          ? errorCodes[errors.message]
          : `Error: ${errors.message}`
        setError(message)
        setLoading(false)
        return false
      })
  }

  const resetUserPassword = (
    key: string,
    username: string,
    password: string,
  ) => {
    setError(null)
    setLoading(true)
    return resetMutation(key, username, password)
      .then(response => {
        const user = (response.data.resetUserPassword?.user as User) || null

        if (user) {
          const { jwtAuthToken, jwtRefreshToken, ...plainUser } = user
          setUser(plainUser)

          jwtAuthToken && setAuthToken(jwtAuthToken)
          jwtRefreshToken && setRefreshToken(jwtRefreshToken)

          setLoggedIn(true)

          showAlert({
            open: true,
            type: "success",
            primary: `Welcome back${
              (user?.firstName || user?.lastName) && ","
            }${user?.firstName && ` ${user.firstName}`}${
              user?.lastName && ` ${user.lastName}`
            }!`,
            secondary: "Your password has been reset.",
          })

          setLoading(false)
          return true
        }
        setLoading(false)
        return false
      })
      .catch(errors => {
        const message = errorCodes[errors.message]
          ? errorCodes[errors.message]
          : `Error: ${errors.message}`
        setError(message)
        setLoading(false)
        return false
      })
  }

  return {
    resetUserPassword,
    sendResetPasswordEmail,
    error,
    loading,
  }
}

export default useResetPassword
