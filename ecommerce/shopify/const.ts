const platform = process.env.NEXT_PUBLIC_ECOMMERCE_PLATFORM

export const API_URL =
  platform === "shopify_local"
    ? process.env.NEXT_PUBLIC_LOCAL_SHOPIFY_DOMAIN
    : platform == "shopify_dev"
    ? process.env.NEXT_PUBLIC_DEV_SHOPIFY_DOMAIN
    : process.env.NEXT_PUBLIC_LIVE_SHOPIFY_DOMAIN

export const SHOPIFY_CHECKOUT_ID_COOKIE =
  platform === "shopify_local"
    ? "shopify_local_checkoutId"
    : platform == "shopify_dev"
    ? "shopify_dev_checkoutId"
    : "shopify_checkoutId"

export const SHOPIFY_CHECKOUT_URL_COOKIE = "shopify_checkoutUrl"
export const SHOPIFY_COOKIE_EXPIRE = 90

export const SHOPIFY_ACCESS_TOKEN =
  platform === "shopify_live"
    ? process.env.NEXT_PUBLIC_DEV_SHOPIFY_LIVE_ACCESS_TOKEN
    : process.env.NEXT_PUBLIC_DEV_SHOPIFY_DEV_ACCESS_TOKEN
