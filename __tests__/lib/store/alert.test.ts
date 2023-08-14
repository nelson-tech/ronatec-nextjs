// store/counter.store.spec.ts
import { act, renderHook } from "@testing-library/react"
import { useStore } from "@mocks/zustand"
import { initialState } from "@store/slices/alert"
import { AlertProps } from "@types"

const defaultAlert: AlertProps = {
  open: true,
  primary: "Testing alert",
  secondary: "The test has been successful.",
}

describe("Alert Store", () => {
  it("Should have default values", () => {
    const { result } = renderHook(() => useStore())
    const { setAlert, ...nonFunctions } = result.current.alert
    expect({ alert: nonFunctions }).toStrictEqual(initialState)
  })

  it("Should set alert", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.alert.setAlert(defaultAlert)
    })
    expect(result.current.alert.open).toBe(defaultAlert.open)
    expect(result.current.alert.primary).toBe(defaultAlert.primary)
    expect(result.current.alert.secondary).toBe(defaultAlert.secondary)
  })
})
