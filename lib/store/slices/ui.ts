import { StateCreator } from "zustand"

export type SortOptionType = {
  name: string
  id: { field: string; order: string }
}

export const sortOptions: SortOptionType[] = [
  { name: "Default", id: { field: "MENU_ORDER", order: "ASC" } },
  // { name: "Price: Low to High", id: { field: "PRICE", order: "ASC" } },
  // { name: "Price: High to Low", id: { field: "PRICE", order: "DESC" } },
  { name: "A - Z", id: { field: "SLUG", order: "ASC" } },
  { name: "Z - A", id: { field: "SLUG", order: "DESC" } },
  { name: "Newest", id: { field: "DATE", order: "DESC" } },
  { name: "Oldest", id: { field: "DATE", order: "ASC" } },
]

export type UISliceType = typeof initialState & {
  ui: {
    setMobileMenuOpen: (mobileMenuOpen: boolean) => void
    setSearchOpen: (searchOpen: boolean) => void
    setViewMode: (viewMode: "grid" | "list") => void
    setSelectedSort: (selectedSort: SortOptionType) => void
  }
}

const initialState = {
  ui: {
    dark: false,
    mobileMenuOpen: false,
    searchOpen: false,
    viewMode: "grid" as "grid" | "list",
    selectedSort: sortOptions[0],
  },
}

const createUISlice: StateCreator<UISliceType, [], []> = set => ({
  ui: {
    ...initialState.ui,
    setMobileMenuOpen: mobileMenuOpen =>
      set(state => ({ ui: { ...state.ui, mobileMenuOpen } })),
    setSearchOpen: searchOpen =>
      set(state => ({ ui: { ...state.ui, searchOpen } })),
    setViewMode: viewMode => set(state => ({ ui: { ...state.ui, viewMode } })),
    setSelectedSort: selectedSort =>
      set(state => ({ ui: { ...state.ui, selectedSort } })),
  },
})

export default createUISlice
