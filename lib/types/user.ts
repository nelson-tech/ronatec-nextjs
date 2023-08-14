import { User } from "payload/generated-types"

export type UserUpdate = Omit<User, "id" | "createdAt" | "updatedAt">
