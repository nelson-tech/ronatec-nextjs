const COOKIE_PREFIX = process.env.PAYLOAD_COOKIE_PREFIX
export const AUTH_TOKEN_KEY: string = `${COOKIE_PREFIX}-token`
export const REFRESH_TOKEN_KEY: string = `refresh-token`
export const CUSTOMER_TOKEN_KEY: string = "customer-token"
export const CART_TOKEN_KEY: string = `${COOKIE_PREFIX}-cart`
export const CART_SESSION_HEADER_KEY = "woocommerce-session"
export const SITE_NAME = `${process.env.NEXT_PUBLIC_SITE_NAME}`
export const SEO_TITLE = `- ${SITE_NAME}`

export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
