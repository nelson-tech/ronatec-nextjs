export const AUTH_TOKEN_KEY: string = `auth-token`
export const REFRESH_TOKEN_KEY: string = `refresh-token`
export const CART_TOKEN_KEY: string = `cart_token`
export const USER_TOKEN_KEY: string = `user-token`
export const CLIENT_MUTATION_KEY: string = `client-mutation`
export const LOGGED_OUT_KEY: string = `logged-out-time`

export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const FRONTEND_BASE = process.env.NEXT_PUBLIC_FRONTEND_HOST

export const AUTH_ENDPOINT = FRONTEND_BASE + "/api/auth"
export const CART_ENDPOINT: string = FRONTEND_BASE + "/api/cart"

export const AUTH_TOKEN_EXPIRATION: number = 4 * 60 * 1000 // 4 minutes (240 seconds)
export const REFRESH_TOKEN_EXPIRATION: number = 7 * 24 * 60 * 60 * 1000 // 7 days
export const CART_TOKEN_EXPIRATION: number = 30 * 24 * 60 * 60 * 1000 // 30 days
