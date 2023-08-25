import { Product } from "payload/generated-types"

export type UpdateProduct = Omit<Product, "id" | "createdAt" | "updatedAt"> & {
  createdAt?: string
}
