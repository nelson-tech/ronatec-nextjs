import { useState } from "react"

// import { setAuthToken, setRefreshToken } from "@api/urql/utils"
// import {
//   User,
//   useResetUserPasswordMutation,
//   useSendPasswordResetEmailMutation,
// } from "@api/codegen/graphql"

import useStore from "./useStore"

const errorCodes: { [key: string]: string } = {}

/**
 * Hook which tracks if the user is logged in (assumed until a failed response).
 */
const useResetPassword = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // const [_sendEmail, emailMutation] = useSendPasswordResetEmailMutation()
  // const [_resetPassword, resetMutation] = useResetUserPasswordMutation()

  const { setAlert, setLoggedIn, setUser } = useStore(state => ({
    setAlert: state.alert.setAlert,
    setLoggedIn: state.auth.setLoggedIn,
    setUser: state.auth.setUser,
  }))

  const sendResetPasswordEmail = (username: string) => {
    setError(null)
    setLoading(true)
    // return emailMutation({ username })
    //   .then(() => {
    //     setLoading(false)
    //     return true
    //   })
    //   .catch(errors => {
    //     const message = errorCodes[errors.message]
    //       ? errorCodes[errors.message]
    //       : `Error: ${errors.message}`
    //     setError(message)
    //     setLoading(false)
    //     return false
    //   })
  }

  const resetUserPassword = (
    key: string,
    username: string,
    password: string,
  ) => {
    setError(null)
    setLoading(true)
    // return resetMutation({ key, login: username, password })
    //   .then(response => {
    //     const user = (response.data?.resetUserPassword?.user as User) || null

    //     if (user) {
    //       const { jwtAuthToken, jwtRefreshToken, ...plainUser } = user
    //       setUser(plainUser)

    //       jwtAuthToken && setAuthToken(jwtAuthToken)
    //       jwtRefreshToken && setRefreshToken(jwtRefreshToken)

    //       setLoggedIn(true)

    //       setAlert({
    //         open: true,
    //         type: "success",
    //         primary: `Welcome back${
    //           (user?.firstName || user?.lastName) && ","
    //         }${user?.firstName && ` ${user.firstName}`}${
    //           user?.lastName && ` ${user.lastName}`
    //         }!`,
    //         secondary: "Your password has been reset.",
    //       })

    //       setLoading(false)
    //       return true
    //     }
    //     setLoading(false)
    //     return false
    //   })
    //   .catch(errors => {
    //     const message = errorCodes[errors.message]
    //       ? errorCodes[errors.message]
    //       : `Error: ${errors.message}`
    //     setError(message)
    //     setLoading(false)
    //     return false
    //   })
  }

  return {
    resetUserPassword,
    sendResetPasswordEmail,
    error,
    loading,
  }
}

export default useResetPassword
