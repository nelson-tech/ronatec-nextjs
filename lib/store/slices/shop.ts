import { StateCreator } from "zustand"

export enum ProductsOrderByEnum {
  /** Order by publish date */
  Date = "DATE",
  // /** Preserve the ID order given in the IN array */
  // In = "IN",
  /** Order by the menu order value */
  MenuOrder = "MENU_ORDER",
  // /** Order by last modified date */
  // Modified = "MODIFIED",
  // /** Preserve slug order given in the NAME_IN array */
  // NameIn = "NAME_IN",
  // /** Order by date product sale starts */
  // OnSaleFrom = "ON_SALE_FROM",
  // /** Order by date product sale ends */
  // OnSaleTo = "ON_SALE_TO",
  // /** Order by parent ID */
  // Parent = "PARENT",
  // /** Order by product's current price */
  // Price = "PRICE",
  // /** Order by product average rating */
  // Rating = "RATING",
  // /** Order by product's regular price */
  // RegularPrice = "REGULAR_PRICE",
  // /** Order by number of reviews on product */
  // ReviewCount = "REVIEW_COUNT",
  // /** Order by product's sale price */
  // SalePrice = "SALE_PRICE",
  /** Order by slug */
  Slug = "SLUG",
  // /** Order by total sales of products sold */
  // TotalSales = "TOTAL_SALES",
}

export enum OrderEnum {
  /** Sort the query result set in an ascending order */
  Asc = "ASC",
  /** Sort the query result set in a descending order */
  Desc = "DESC",
}

const { MenuOrder, Slug, Date } = ProductsOrderByEnum

const { Asc, Desc } = OrderEnum

export type SortOptionType = {
  name: string
  id: { field: ProductsOrderByEnum; order: OrderEnum }
}

export const sortOptions: SortOptionType[] = [
  { name: "Default", id: { field: MenuOrder, order: Asc } },
  // { name: "Price: Low to High", id: { field: Price, order: Asc } },
  // { name: "Price: High to Low", id: { field: Price, order: Desc } },
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
    viewMode: "grid" as "grid" | "list",
    selectedSort: sortOptions[0],
    productsPerPage: 12,
  },
}

const createShopSlice: StateCreator<ShopSliceType, [], []> = set => ({
  shop: {
    ...initialState.shop,
    setViewMode: viewMode =>
      set(state => ({ shop: { ...state.shop, viewMode } })),
    setGlobalSort: selectedSort =>
      set(state => ({ shop: { ...state.shop, selectedSort } })),
    setProductsPerPage: productsPerPage =>
      set(state => ({ shop: { ...state.shop, productsPerPage } })),
  },
})

export default createShopSlice
