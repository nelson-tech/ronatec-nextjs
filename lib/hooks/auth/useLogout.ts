import { useRouter } from "next/navigation"
import shallow from "zustand/shallow"

import useStore from "@lib/hooks/useStore"
// import { logout as logoutClient } from "@api/urql/utils"
// import { useLogoutUserMutation } from "@api/codegen/graphql"

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

  // const [_, logoutMutation] = useLogoutUserMutation()

  const logout = async () => {
    // logoutMutation({ input: {} }).then(res => {
    //   const { data, error } = res
    //   if (loggedIn && data) {
    //     setLoggedIn(false)
    //     setUser(null)
    //     logoutClient(true)
    //     setAlert({
    //       open: true,
    //       primary: "Logged out.",
    //       secondary: "",
    //       type: "info",
    //     })
    //     // Redirect to homepage
    //     router.push("/")
    //   }
    // })
    // TODO - Set errors
  }
  return { logout }
}

export default useLogout
