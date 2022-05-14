import { StateCreator } from "zustand"

import { User } from "@api/gql/types"
import isServer from "@lib/utils/isServer"
import { USER_ID_KEY } from "@lib/constants"

export type AuthSliceType = typeof initialState & {
  auth: {
    setLoggedIn: (loggedIn: boolean) => void
    setLoginError: (error: string) => void
    setUser: (user: User | null) => void
    setUserId: (userId: string) => void
    setLoginModalOpen: (loginModal: boolean) => void
  }
}

const initialState = {
  auth: {
    loggedIn: false,
    errors: { login: null as string | null, register: null as string | null },
    user: null as User | null,
    userId: "",
    loginModal: false,
  },
}

const createAuthSlice: StateCreator<AuthSliceType, [], []> = set => ({
  auth: {
    ...initialState.auth,
    setLoggedIn: loggedIn =>
      set(state => ({ auth: { ...state.auth, loggedIn } })),
    setLoginError: error =>
      set(state => ({
        auth: { ...state.auth, errors: { ...state.auth.errors, login: error } },
      })),
    setUser: user => {
      // Set userId and save to localStorage
      const userId = user?.databaseId.toString() || ""
      if (userId && !isServer) {
        localStorage.setItem(USER_ID_KEY, userId.toString())
      }
      return set(state => ({ auth: { ...state.auth, user, userId } }))
    },
    setUserId: userId => set(state => ({ auth: { ...state.auth, userId } })),
    setLoginModalOpen: loginModal =>
      set(state => ({ auth: { ...state.auth, loginModal } })),
  },
})

export default createAuthSlice
