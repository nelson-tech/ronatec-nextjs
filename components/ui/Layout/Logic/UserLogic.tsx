import { useEffect } from "react"
import shallow from "zustand/shallow"

import useStore from "@lib/hooks/useStore"
import { useGetCustomerDataQuery, User } from "@api/gql/types"

// ####
// #### Component
// ####

const UserLogic = () => {
  const { loggedIn, user, authActions } = useStore(
    state => ({
      loggedIn: state.auth.loggedIn,
      user: state.auth.user,
      authActions: state.auth,
    }),
    shallow,
  )
  const { setUser } = authActions

  const [{ data: getUserData }, _] = useGetCustomerDataQuery({
    pause: !loggedIn, // Pause if not logged in
  })

  // Set user if retrieved and different
  useEffect(() => {
    const newUser = getUserData?.customer
    if (loggedIn && newUser?.email) {
      if (user?.username !== newUser.email) {
        setUser(newUser as User)
      }
    }
  }, [loggedIn, user, getUserData?.customer, setUser])

  return <></>
}

export default UserLogic
