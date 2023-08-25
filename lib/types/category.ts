import { Category } from "payload/generated-types"

export type UpdateCategory = Omit<Category, "id" | "createdAt" | "updatedAt">
