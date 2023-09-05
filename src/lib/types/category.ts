import { Category } from "~payload-types"

export type UpdateCategory = Omit<Category, "id" | "createdAt" | "updatedAt">
