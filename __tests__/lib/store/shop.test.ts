import { act, renderHook } from "@testing-library/react"
import { useStore } from "@mocks/zustand"
import {
  initialState,
  OrderEnum,
  ProductsOrderByEnum,
  SortOptionType,
} from "@lib/store/slices/shop"

const { MenuOrder, Slug, Date } = ProductsOrderByEnum

const { Asc, Desc } = OrderEnum

const defaultSort: SortOptionType = {
  name: "A-Z",
  id: { field: MenuOrder, order: Asc },
}

describe("Shop Store", () => {
  it("Should have default values", () => {
    const { result } = renderHook(() => useStore())
    const { setGlobalSort, setProductsPerPage, setViewMode, ...nonFunctions } =
      result.current.shop
    expect({ shop: nonFunctions }).toStrictEqual(initialState)
  })

  it("Should set global sort", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.shop.setGlobalSort(defaultSort)
    })
    expect(result.current.shop.selectedSort).toStrictEqual(defaultSort)
  })

  it("Should set products per page", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.shop.setProductsPerPage(40)
    })
    expect(result.current.shop.productsPerPage).toBe(40)
  })

  it("Should set view mode", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.shop.setViewMode("list")
    })
    expect(result.current.shop.viewMode).toBe("list")
  })
})
