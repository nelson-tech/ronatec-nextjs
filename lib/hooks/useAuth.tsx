import { createContext, FC, useContext, useEffect } from "react"
import {
  getAuthToken,
  isLoggedOut,
  isTokenExpired,
  LOGGED_OUT_KEY,
  logout,
} from "@lib/apollo/auth"

const AuthContext = createContext<{ isLoggedIn: () => boolean } | null>(null)

export const AuthProvider: FC = ({ children }) => {
  return (
    <AuthContext.Provider value={useProvideAuth()}>
      {children}
    </AuthContext.Provider>
  )
}

const syncLoginStatus = (event: any) => {
  if (event.key === LOGGED_OUT_KEY && isLoggedOut()) {
    // logout(navigate("/dashboard/"))
  }
}

const useProvideAuth = () => {
  const isLoggedIn = (): boolean => !!getAuthToken() && !isTokenExpired()

  /**
   * Make sure, User is logged out on all Tabs
   */
  useEffect(() => {
    window.addEventListener("storage", syncLoginStatus)

    return () => {
      window.removeEventListener("storage", syncLoginStatus)
    }
  })

  return {
    isLoggedIn,
    // user: token ? token.user : null,
  }
}

const useAuth = () => useContext(AuthContext)

export default useAuth
