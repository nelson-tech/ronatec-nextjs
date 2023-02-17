import { act, renderHook } from "@testing-library/react"
import { useStore } from "@mocks/zustand"
import { initialState } from "@lib/store/slices/cart"
import { Cart } from "@api/codegen/graphql"

const defaultCart: Cart = {
  isEmpty: false,
  needsShippingAddress: true,
}

describe("Cart Store", () => {
  it("Should have default values", () => {
    const { result } = renderHook(() => useStore())
    const { setCart, setLoading, setOpen, setSessionError, ...nonFunctions } =
      result.current.cart
    expect({ cart: nonFunctions }).toStrictEqual(initialState)
  })

  it("Should set cart", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.cart.setCart(defaultCart)
    })
    expect(result.current.cart.state?.isEmpty).toBe(defaultCart.isEmpty)
    expect(result.current.cart.state?.needsShippingAddress).toBe(
      defaultCart.needsShippingAddress
    )
  })

  it("Should set cart loading", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.cart.setLoading(true)
    })
    expect(result.current.cart.loading).toBe(true)
  })

  it("Should set cart modal open", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.cart.setOpen(true)
    })
    expect(result.current.cart.open).toBe(true)
  })

  it("Should set cart session error", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.cart.setSessionError("error")
    })
    expect(result.current.cart.errors.session).toBe("error")
  })
})
