import isServer from "./utils/isServer"

export const AUTH_TOKEN_KEY: string = `auth-token`
export const REFRESH_TOKEN_KEY: string = `refresh-token`
export const CUSTOMER_TOKEN_KEY: string = "customer-token"
export const CART_TOKEN_KEY: string = `cart-token`
export const CART_SESSION_HEADER_KEY = "woocommerce-session"
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME
export const SEO_TITLE = `- ${SITE_NAME}`

export const API_URL = isServer
  ? process.env.NEXT_PUBLIC_API_HOST
  : process.env.NEXT_PUBLIC_API_URL
export const FRONTEND_BASE = process.env.NEXT_PUBLIC_FRONTEND_HOST
