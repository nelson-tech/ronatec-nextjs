import { Product } from "~payload-types"

export type UpdateProduct = Omit<Product, "id" | "createdAt" | "updatedAt"> & {
  createdAt?: string
}
