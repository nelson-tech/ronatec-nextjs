import { StateCreator } from "zustand"

import { Customer } from "@api/codegen/graphql"

export type AuthSliceType = typeof initialState & {
  auth: {
    setLoggedIn: (loggedIn: boolean) => void
    setLoginError: (error: string) => void
    setCustomer: (customer: Customer | null) => void
    setLoginModalOpen: (loginModal: boolean) => void
    setReady: (ready: boolean) => void
    setLoaded: (loaded: boolean) => void
  }
}

export const initialState = {
  auth: {
    loggedIn: false,
    errors: { login: null as string | null, register: null as string | null },
    customer: null as Customer | null,
    loginModal: false,
    ready: false,
    loaded: false,
  },
}

const createAuthSlice = (
  defaultValues?: Partial<(typeof initialState)["auth"]> | undefined,
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
      setCustomer: customer =>
        set(state => ({ auth: { ...state.auth, customer } })),
      setLoginModalOpen: loginModal =>
        set(state => ({ auth: { ...state.auth, loginModal } })),
      setReady: ready => set(state => ({ auth: { ...state.auth, ready } })),
      setLoaded: loaded => set(state => ({ auth: { ...state.auth, loaded } })),
    },
  })
}

export default createAuthSlice
