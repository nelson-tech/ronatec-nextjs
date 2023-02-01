import { useRouter } from "next/navigation"
import { shallow } from "zustand/shallow"

import useClient from "@api/client"
import { LogoutUserDocument } from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"
import { EP_Auth_Input_Logout_Type } from "@lib/types/auth"
import { AUTH_ENDPOINT } from "@lib/constants"

const useLogout = () => {
  const router = useRouter()

  const { setLoggedIn, setUser, setAlert } = useStore(
    state => ({
      setLoggedIn: state.auth.setLoggedIn,
      setUser: state.auth.setUser,
      setAlert: state.alert.setAlert,
    }),
    shallow,
  )

  const client = useClient()

  const logout = async () => {
    client.setHeader("auth", "true")
    await client.request(LogoutUserDocument, { input: {} })
    client.setHeader("auth", "false")

    // Make client call to API to set cookies for frontend
    const body: EP_Auth_Input_Logout_Type = {
      action: "LOGOUT",
    }

    await fetch(AUTH_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(body),
    })

    setLoggedIn(false)
    setUser(null)
    setAlert({
      open: true,
      primary: "Logged out.",
      secondary: "",
      kind: "info",
    })

    router.push("/")
  }
  return { logout }
}

export default useLogout
