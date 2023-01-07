import { StateCreator } from "zustand"

import { User } from "@api/codegen/graphql"

export type AuthSliceType = typeof initialState & {
  auth: {
    setLoggedIn: (loggedIn: boolean) => void
    setLoginError: (error: string) => void
    setUser: (user: User | null) => void
    setLoginModalOpen: (loginModal: boolean) => void
    setReady: (ready: boolean) => void
  }
}

export const initialState = {
  auth: {
    loggedIn: false,
    errors: { login: null as string | null, register: null as string | null },
    user: null as User | null,
    loginModal: false,
    ready: false,
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
    setUser: user => set(state => ({ auth: { ...state.auth, user } })),
    setLoginModalOpen: loginModal =>
      set(state => ({ auth: { ...state.auth, loginModal } })),
    setReady: ready => set(state => ({ auth: { ...state.auth, ready } })),
  },
})

export default createAuthSlice
