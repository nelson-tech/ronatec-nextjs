import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { deleteCookie } from "cookies-next"
import { shallow } from "zustand/shallow"

import getClient from "@api/client"
import { LogoutUserDocument } from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@lib/constants"

const useLogout = () => {
  const router = useRouter()

  const { setLoggedIn, setCustomer, setAlert } = useStore(
    (state) => ({
      setLoggedIn: state.auth.setLoggedIn,
      setCustomer: state.auth.setCustomer,
      setAlert: state.alert.setAlert,
    }),
    shallow
  )

  const client = getClient()

  const logout = useCallback(async () => {
    await client.request(LogoutUserDocument, { input: {} })

    // Delete cookies
    deleteCookie(AUTH_TOKEN_KEY)
    deleteCookie(REFRESH_TOKEN_KEY)

    client.setHeader("Authorization", "")

    setLoggedIn(false)
    setCustomer(null)
    setAlert({
      open: true,
      primary: "Logged out.",
      secondary: "",
      kind: "info",
    })

    router.push("/")
  }, [client, router, setAlert, setCustomer, setLoggedIn])

  return { logout }
}

export default useLogout
