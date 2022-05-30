import { act, renderHook } from "@testing-library/react"
import { useStore } from "@mocks/zustand"
import { initialState } from "@lib/store/slices/ui"

describe("UI Store", () => {
  it("Should have default values", () => {
    const { result } = renderHook(() => useStore())
    const { setDarkMode, setMobileMenuOpen, setSearchOpen, ...nonFunctions } =
      result.current.ui
    expect({ ui: nonFunctions }).toStrictEqual(initialState)
  })

  it("Should set dark mode", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.ui.setDarkMode(true)
    })
    expect(result.current.ui.dark).toStrictEqual(true)
  })

  it("Should set products per page", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.ui.setMobileMenuOpen(true)
    })
    expect(result.current.ui.mobileMenuOpen).toBe(true)
  })

  it("Should set view mode", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.ui.setSearchOpen(true)
    })
    expect(result.current.ui.searchOpen).toBe(true)
  })
})
