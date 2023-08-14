// store/counter.store.spec.ts
import { act, renderHook } from "@testing-library/react"
import { useStore } from "@mocks/zustand"
import { initialState } from "@store/slices/auth"
import { User } from "@api/codegen/graphql"

const defaultUser: User = {
  id: "defaultUser",
  databaseId: 42,
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
  username: "johndoe92",
  isContentNode: false,
  isTermNode: true,
  isJwtAuthSecretRevoked: false,
}

describe("Auth Store", () => {
  it("Should have default values", () => {
    const { result } = renderHook(() => useStore())
    const {
      setLoggedIn,
      setLoginError,
      setLoginModalOpen,
      setReady,
      setUser,
      ...nonFunctions
    } = result.current.auth
    expect({ auth: nonFunctions }).toStrictEqual(initialState)
  })

  it("Should login", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.auth.setLoggedIn(true)
    })
    expect(result.current.auth.loggedIn).toBe(true)
  })

  it("Should set login error", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.auth.setLoginError("Error")
    })
    expect(result.current.auth.errors.login).toBe("Error")
  })

  it("Should set login modal open", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.auth.setLoginModalOpen(true)
    })
    expect(result.current.auth.loginModal).toBe(true)
  })

  it("Should set ready", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.auth.setReady(true)
    })
    expect(result.current.auth.ready).toBe(true)
  })

  it("Should set user", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.auth.setUser(defaultUser)
    })
    expect(result.current.auth.user).toStrictEqual(defaultUser)
  })
})
