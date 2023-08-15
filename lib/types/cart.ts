import { Cart } from "payload/generated-types"

export type CartUpdate = Omit<Cart, "id" | "createdAt" | "updatedAt">
