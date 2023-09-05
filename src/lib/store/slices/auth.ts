import { StateCreator } from "zustand"

import { decodeToken } from "@utils/decodeJwt"
import type { User } from "~payload-types"

export type AuthSliceType = typeof initialState & {
  auth: {
    setLoggedIn: (loggedIn: boolean) => void
    setLoginModalOpen: (loginModal: boolean) => void
    setLoading: (loaded: boolean) => void
    setUser: (user: User | null) => void
    setResetError: (error: string | null) => void
    setToken: (
      token: string | { value: string | null; exp: number | null }
    ) => void
  }
}

export const initialState = {
  auth: {
    loggedIn: false,
    loginModal: false,
    loading: false,
    token: {
      value: null as null | string,
      exp: null as null | number,
    },
    user: null as User | null,
    errors: {
      reset: null as string | null,
    },
  },
}

const createAuthSlice = (
  defaultValues?: Partial<(typeof initialState)["auth"]> | undefined
): StateCreator<AuthSliceType, [], []> => {
  return (set) => ({
    auth: {
      ...initialState.auth,
      ...defaultValues,
      setLoggedIn: (loggedIn) =>
        set((state) => ({ auth: { ...state.auth, loggedIn } })),
      setLoginModalOpen: (loginModal) =>
        set((state) => ({ auth: { ...state.auth, loginModal } })),
      setLoading: (loading) =>
        set((state) => ({ auth: { ...state.auth, loading } })),
      setUser: (user) => set((state) => ({ auth: { ...state.auth, user } })),
      setResetError: (error) =>
        set((state) => ({
          auth: {
            ...state.auth,
            errors: { ...state.auth.errors, reset: error },
          },
        })),
      setToken: (token) => {
        if (typeof token === "object") {
          set((state) => ({ auth: { ...state.auth, token } }))
        } else {
          const exp = decodeToken(token)?.exp
          exp &&
            set((state) => ({
              auth: { ...state.auth, token: { value: token, exp } },
            }))
        }
      },
    },
  })
}

export default createAuthSlice
