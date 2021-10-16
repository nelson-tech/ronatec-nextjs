import getConfig from "next/config"
import { APIConfig } from "@common/types/api"
import { fetchAPI } from "../utils"

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
})

export function getCommerceConfig() {
  return configWrapper.getCommerceConfig()
}
