export type USER_JWT_DATA = {
  user: {
    email: string
    createdAt: string
    updatedAt: string
    id: string
  }
  token: string
  exp: number
}
