import { StateCreator } from "zustand"

import { UserAuthBaseFragment } from "@api/codegen/graphql"

export type AuthSliceType = typeof initialState & {
  auth: {
    setLoggedIn: (loggedIn: boolean) => void
    setLoginError: (error: string) => void
    setUser: (user: UserAuthBaseFragment | null) => void
    setLoginModalOpen: (loginModal: boolean) => void
    setReady: (ready: boolean) => void
  }
}

export const initialState = {
  auth: {
    loggedIn: false,
    errors: { login: null as string | null, register: null as string | null },
    user: null as UserAuthBaseFragment | null,
    loginModal: false,
    ready: false,
  },
}

const createAuthSlice = (
  defaultValues?: Partial<typeof initialState["auth"]> | undefined,
): StateCreator<AuthSliceType, [], []> => {
  return set => ({
    auth: {
      ...initialState.auth,
      ...defaultValues,
      setLoggedIn: loggedIn =>
        set(state => ({ auth: { ...state.auth, loggedIn } })),
      setLoginError: error =>
        set(state => ({
          auth: {
            ...state.auth,
            errors: { ...state.auth.errors, login: error },
          },
        })),
      setUser: user => set(state => ({ auth: { ...state.auth, user } })),
      setLoginModalOpen: loginModal =>
        set(state => ({ auth: { ...state.auth, loginModal } })),
      setReady: ready => set(state => ({ auth: { ...state.auth, ready } })),
    },
  })
}

export default createAuthSlice
