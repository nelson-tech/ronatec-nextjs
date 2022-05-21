import { StateCreator } from "zustand"

export type UISliceType = typeof initialState & {
  ui: {
    setDarkMode: (dark: boolean) => void
    setMobileMenuOpen: (mobileMenuOpen: boolean) => void
    setSearchOpen: (searchOpen: boolean) => void
  }
}

const initialState = {
  ui: {
    dark: false,
    mobileMenuOpen: false,
    searchOpen: false,
  },
}

const createUISlice: StateCreator<UISliceType, [], []> = set => ({
  ui: {
    ...initialState.ui,
    setDarkMode: dark => set(state => ({ ui: { ...state.ui, dark } })),
    setMobileMenuOpen: mobileMenuOpen =>
      set(state => ({ ui: { ...state.ui, mobileMenuOpen } })),
    setSearchOpen: searchOpen =>
      set(state => ({ ui: { ...state.ui, searchOpen } })),
  },
})

export default createUISlice
