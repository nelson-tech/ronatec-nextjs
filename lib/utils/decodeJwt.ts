import jwt_decode from "jwt-decode"

type JWToken = {
  email: string
  id: string
  collection: number
  iat: number
  exp: number
}

export const decodeToken = (token: string | null | undefined) => {
  const tokenData = token ? jwt_decode<JWToken>(token) : null

  return tokenData
}
