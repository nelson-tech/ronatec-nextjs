import { useCallback } from "react"

import useStore from "./useStore"
import type { Cart, User } from "~payload-types"
import type { UserUpdate } from "@lib/types/user"
import { CartUpdate } from "@lib/types/cart"
import mergeCartItems from "./utils/mergeCartItems"
import qs from "qs"

type AuthPayloadType = {
  user: User
  token: string
  exp: number
} | null

const errorCodes: { [key: string]: string } = {}

const useAuth = () => {
  const {
    cartState,
    setCart,
    setAlert,
    setUser,
    setLoggedIn,
    setLoading,
    setResetError,
    setToken,
  } = useStore((stores) => ({
    cartState: stores.cart.state,
    setCart: stores.cart.setCart,
    setAlert: stores.alert.setAlert,
    setUser: stores.auth.setUser,
    setLoggedIn: stores.auth.setLoggedIn,
    setLoading: stores.auth.setLoading,
    setResetError: stores.auth.setResetError,
    setToken: stores.auth.setToken,
  }))

  const login = useCallback(
    async ({
      email,
      password,
      skipAlert,
    }: {
      email: string
      password: string | undefined
      skipAlert?: boolean
    }) => {
      setLoading(true)

      try {
        const data = await fetch("/api/users/login", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })

        const loginData: AuthPayloadType = await data.json()

        if (loginData?.user?.id) {
          const { user, token, exp } = loginData
          setUser(user as User)
          token && exp && setToken({ value: token, exp })
          setLoggedIn(true)

          !skipAlert &&
            setAlert({
              open: true,
              kind: "success",
              primary: `Welcome back${
                user.fullName ? `, ${user.fullName}` : ""
              }!`,
              secondary: "You are now logged in.",
            })

          if (cartState?.id) {
            // User had guest cart before logging in
            // Delete guest cart cookie (cart will come from user cookie now)
            try {
              console.log("Deleting cart cookie")

              await fetch("/actions/cart/cookie", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              })
            } catch (error) {
              console.warn("Error deleting cart cookie", error)
            }
          }

          typeof user.cart === "object" && setCart(user.cart)
        }
      } catch (error) {
        console.warn("Error logging in", error)

        setAlert({
          open: true,
          kind: "error",
          primary: "Email or password is incorrect.",
        })
      }

      setLoading(false)
    },
    [
      cartState?.id,
      setAlert,
      setCart,
      setUser,
      setLoggedIn,
      setLoading,
      setToken,
    ]
  )

  const register = useCallback(
    async (args: UserUpdate) => {
      setLoading(true)

      try {
        const response = await fetch("/api/users", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(args),
        })

        const data: { message: string; doc: User } = await response.json()

        if (data?.doc.id && args.email) {
          const user = data.doc
          const { email, password } = args

          await login({ email, password, skipAlert: true })

          setAlert({
            open: true,
            kind: "success",
            primary: `Welcome${user.fullName ? `, ${user.fullName}` : ""}!`,
            secondary: "You are now registered.",
          })
        }
      } catch (error) {
        console.warn("Error during registration:", error)
        setAlert({
          open: true,
          kind: "error",
          primary: "Error during registration.",
        })
      }

      setLoading(false)
    },
    [setAlert, login, setLoading]
  )

  const getCurrentUser = useCallback(async () => {
    setLoading(true)

    try {
      const data = await fetch("/api/users/me")

      const userData: AuthPayloadType = await data.json()

      if (userData?.user.id) {
        const { user, token, exp } = userData
        setUser(user as User)
        token && exp && setToken({ value: token, exp })
        setLoggedIn(true)
      } else {
        setUser(null)
        setLoggedIn(false)
        // throw new Error("No user details found.")
      }
    } catch (e) {
      setUser(null)
      setLoggedIn(false)

      console.warn("An error occurred while fetching your account.", e)
    }

    setLoading(false)
  }, [setLoading, setLoggedIn, setToken, setUser])

  const logout = useCallback(async () => {
    setLoading(true)

    try {
      const data = await fetch("/api/users/logout", {
        method: "post",
        headers: { "Content-Type": "application/json" },
      })

      const logoutData: any = await data.json()

      if (logoutData) {
        setUser(null)
        setCart(null)
        setToken({ value: null, exp: null })
        setLoggedIn(false)

        setAlert({
          open: true,
          primary: "Logged out.",
          secondary: "",
          kind: "info",
        })
      }
    } catch (error) {
      setAlert({
        open: true,
        kind: "error",
        primary: "Error logging out.",
      })
    }

    setLoading(false)
  }, [setAlert, setCart, setUser, setLoggedIn, setLoading, setToken])

  const forgotPassword = useCallback(
    async ({ email }: { email: string }) => {
      setResetError(null)
      setLoading(true)

      try {
        const data = await fetch("/api/users/forgot-password", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        })

        setLoading(false)

        return true
      } catch (error) {
        const errors = error as any
        const message = errorCodes[errors.message]
          ? errorCodes[errors.message]
          : `Error: ${errors.message}`

        setResetError(message)
        setLoading(false)

        return false
      }
    },
    [setLoading, setResetError]
  )

  const resetPassword = useCallback(
    async ({ token, password }: { password: string; token: string }) => {
      setLoading(true)

      try {
        const data = await fetch("/api/users/reset-password", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        })

        const resetData: AuthPayloadType = await data.json()

        if (resetData?.user?.id) {
          const { user, token } = resetData
          setUser(user as User)
          token && setToken(token)
          setLoggedIn(true)

          setAlert({
            open: true,
            kind: "success",
            primary: `Welcome back${
              user.fullName ? `, ${user.fullName}` : ""
            }!`,
            secondary: "Your password has been reset.",
          })

          setLoading(false)
          return true
        }
      } catch (error) {
        const errors = error as any
        const message = errorCodes[errors.message]
          ? errorCodes[errors.message]
          : `Error: ${errors.message}`

        setResetError(message)
        setLoading(false)

        return false
      }

      setLoading(false)

      return false
    },
    [setLoading, setUser, setResetError, setAlert, setLoggedIn, setToken]
  )

  const refreshToken = async (token: string) => {
    try {
      const data = await fetch("/api/users/refresh-token", {
        method: "post",
        headers: { "Content-Type": "application/json" },
      })

      const refreshData: AuthPayloadType & { refreshedToken: string } =
        await data.json()

      if (refreshData?.refreshedToken) {
        // TODO: Just take the data from here to update user, silly...
        await getCurrentUser()
      } else {
        throw new Error("Request was made, but no token returned")
      }
    } catch (error) {
      console.warn("Error refreshing user token")
    }
  }

  return {
    register,
    getCurrentUser,
    login,
    logout,
    forgotPassword,
    resetPassword,
    refreshToken,
  }
}

export default useAuth
