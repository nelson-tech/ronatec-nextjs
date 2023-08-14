import vanillaStore from "@store/vanilla"
import createAuthSlice, { AuthSliceType } from "@store/slices/auth"

import create from "zustand"
import createVanilla from "zustand/vanilla"

const vanillaAuth = createVanilla<AuthSliceType>()((...a) => ({
  ...createAuthSlice(...a),
}))

export const useAuthStore = create(vanillaAuth)

export const useStore = create(vanillaStore)
