export const AUTH_TOKEN_KEY: string = `auth-token`
export const REFRESH_TOKEN_KEY: string = `refresh-token`
export const CART_TOKEN_KEY: string = `cart_key`
export const WOO_SESSION_KEY: string = `shopping-session`
export const USER_TOKEN_KEY: string = `user-token`
export const CLIENT_MUTATION_KEY: string = `client-mutation`
export const LOGGED_OUT_KEY: string = `logged-out-time`

export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const FRONTEND_BASE = process.env.NEXT_PUBLIC_FRONTEND_HOST

export const AUTH_ENDPOINT = FRONTEND_BASE + "/api/auth"
export const CART_ENDPOINT: string = FRONTEND_BASE + "/api/cart"
