import { User } from "~payload-types"

export type UserUpdate = Omit<User, "id" | "createdAt" | "updatedAt">
