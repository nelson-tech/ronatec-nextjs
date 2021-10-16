import getConfig from "next/config"
import { APIConfig } from "@common/types/api"
import { fetchAPI } from "../utils"
import { SHOPIFY_CHECKOUT_ID_COOKIE } from "@ecommerce/const"

class Config {
  private config: APIConfig

  constructor(config: APIConfig) {
    this.config = config
  }

  getCommerceConfig(): APIConfig {
    return this.config
  }
}

const configWrapper = new Config({
  fetch: fetchAPI,
  checkoutCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
})

export function getCommerceConfig() {
  return configWrapper.getCommerceConfig()
}
