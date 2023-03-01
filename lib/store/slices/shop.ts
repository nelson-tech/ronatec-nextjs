import { StateCreator } from "zustand"

import { OrderEnum, ProductsOrderByEnum } from "@api/codegen/graphql"

const { MenuOrder, Slug, Date } = ProductsOrderByEnum

const { Asc, Desc } = OrderEnum

export type SortOptionType = {
  name: string
  id: { field: ProductsOrderByEnum; order: OrderEnum }
}

export const sortOptions: SortOptionType[] = [
  { name: "Default", id: { field: MenuOrder, order: Asc } },
  { name: "A - Z", id: { field: Slug, order: Asc } },
  { name: "Z - A", id: { field: Slug, order: Desc } },
  { name: "Newest", id: { field: Date, order: Desc } },
  { name: "Oldest", id: { field: Date, order: Asc } },
]

export type ShopSliceType = typeof initialState & {
  shop: {
    setViewMode: (viewMode: "grid" | "list") => void
    setGlobalSort: (selectedSort: SortOptionType) => void
    setProductsPerPage: (productsPerPage: number) => void
  }
}

export const initialState = {
  shop: {
    viewMode: "list" as "grid" | "list",
    selectedSort: sortOptions[0],
    productsPerPage: 12,
  },
}

const createShopSlice: StateCreator<ShopSliceType, [], []> = (set) => ({
  shop: {
    ...initialState.shop,
    setViewMode: (viewMode) =>
      set((state) => ({ shop: { ...state.shop, viewMode } })),
    setGlobalSort: (selectedSort) =>
      set((state) => ({ shop: { ...state.shop, selectedSort } })),
    setProductsPerPage: (productsPerPage) =>
      set((state) => ({ shop: { ...state.shop, productsPerPage } })),
  },
})

export default createShopSlice
