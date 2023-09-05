import { Cart } from "~payload-types"

export type CartUpdate = Omit<Cart, "id" | "createdAt" | "updatedAt">
