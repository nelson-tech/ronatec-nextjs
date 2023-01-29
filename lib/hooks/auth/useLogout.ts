import { useRouter } from "next/navigation"
import { shallow } from "zustand/shallow"

import useStore from "@lib/hooks/useStore"
import useClient from "@api/client"
import { LogoutUserDocument } from "@api/codegen/graphql"
import { ENDPOINT_LogoutInputType } from "@lib/types/auth"
import { AUTH_ENDPOINT } from "@lib/constants"

const useLogout = () => {
  const router = useRouter()

  const { loggedIn, setLoggedIn, setUser, setAlert } = useStore(
    state => ({
      loggedIn: state.auth.loggedIn,
      setLoggedIn: state.auth.setLoggedIn,
      setUser: state.auth.setUser,
      setAlert: state.alert.setAlert,
    }),
    shallow,
  )

  const client = useClient()

  const logout = async () => {
    const logoutData = await client.request(LogoutUserDocument, { input: {} })

    if (logoutData.logout?.status) {
      setLoggedIn(false)
      setUser(null)
      setAlert({
        open: true,
        primary: "Logged out.",
        secondary: "",
        type: "info",
      })
      // Make client call to API to set cookies for frontend
      const body: ENDPOINT_LogoutInputType = {
        action: "LOGOUT",
      }

      await fetch(AUTH_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(body),
      })
      router.push("/")
    }
    // TODO - Set errors
  }
  return { logout }
}

export default useLogout
