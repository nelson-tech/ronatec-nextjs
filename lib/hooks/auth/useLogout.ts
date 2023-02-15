import { useRouter } from "next/navigation"
import { shallow } from "zustand/shallow"

import getClient from "@api/client"
import { LogoutUserDocument } from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@lib/constants"
import { deleteCookie } from "cookies-next"

const useLogout = () => {
  const router = useRouter()

  const { setLoggedIn, setCustomer, setAlert } = useStore(
    state => ({
      setLoggedIn: state.auth.setLoggedIn,
      setCustomer: state.auth.setCustomer,
      setAlert: state.alert.setAlert,
    }),
    shallow,
  )

  const client = getClient()

  const logout = async () => {
    await client.request(LogoutUserDocument, { input: {} })

    // Delete cookies
    deleteCookie(AUTH_TOKEN_KEY)
    deleteCookie(REFRESH_TOKEN_KEY)

    setLoggedIn(false)
    setCustomer(null)
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
