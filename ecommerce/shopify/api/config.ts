import getConfig from "next/config";
import { APIConfig } from "@common/types/api";
import { fetchAPI } from "../utils";

class Config {
  private config: APIConfig;

  constructor(config: APIConfig) {
    this.config = config;
  }

  getCommerceConfig(): APIConfig {
    return this.config;
  }
}

const getAPIUrl = (nextConfig: any): string => {
  // TODO: Define interface for next_config.
  // TODO: Account for edge cases in next_config

  const shopifyLocalURL = "http://localhost:4000/graphql";
  const shopifyDevURL = "https://shopify.dev/graphiql/storefront-graphiql";
  const shopifyLiveURL = "";

  const { platform } = nextConfig.ecommerce;

  let apiUrl: string;

  switch (platform) {
    case "shopify_local":
      apiUrl = shopifyLocalURL;
      break;

    case "shopify_dev":
      apiUrl = shopifyDevURL;
      break;
    default:
      apiUrl = shopifyLiveURL;
      break;
  }

  return apiUrl;
};

const configWrapper = new Config({
  apiUrl: getAPIUrl(getConfig().serverRuntimeConfig),
  fetch: fetchAPI,
});

export function getCommerceConfig() {
  return configWrapper.getCommerceConfig();
}
