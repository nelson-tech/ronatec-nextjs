import { useEffect } from "react"
import shallow from "zustand/shallow"

import useStore from "@lib/hooks/useStore"
import { getUserId } from "@api/urql/utils"
import { useGetUserQuery, User } from "@api/gql/types"
import useLogout from "@lib/hooks/auth/useLogout"

const UserLogic = () => {
  const { loggedIn, user, userId, authActions } = useStore(
    state => ({
      loggedIn: state.auth.loggedIn,
      user: state.auth.user,
      userId: state.auth.userId,
      authActions: state.auth,
    }),
    shallow,
  )
  const { setUser, setUserId } = authActions

  const { logout } = useLogout()

  const [{ data: getUserData }, _] = useGetUserQuery({
    variables: { id: userId },
    pause: userId.length < 1 || !!user?.username, // Pause if userId not set or user already set
  })

  // Look for userId if none and loggedIn
  useEffect(() => {
    if (loggedIn && !userId) {
      if (!userId) {
        // No userId set. Try to set
        const storedId = getUserId()

        if (storedId) {
          // Set userId which will un-pause user query

          setUserId(storedId)
        } else {
          // No userId found. Logout user
          logout()
        }
      }
    }
  }, [loggedIn, userId, logout, setUserId])

  // Set user if retrieved and different
  useEffect(() => {
    const newUser = getUserData?.user
    if (loggedIn && newUser?.username) {
      if (user?.username !== newUser.username) {
        setUser(newUser as User)
      }
    }
  }, [loggedIn, user, getUserData?.user, setUser])

  return <></>
}

export default UserLogic
