import {
  Client,
  createClient,
  cacheExchange,
  dedupExchange,
  fetchExchange,
} from "urql"

import isServer from "@lib/utils/isServer"

import config from "./config"
import authExchange from "./auth"

let client: Client

const initializeClient = () => {
  const _client =
    client ??
    createClient({
      ...config,
      exchanges: [dedupExchange, cacheExchange, authExchange, fetchExchange],
    })

  // For SSG and SSR always create a new Apollo Client
  if (isServer) return _client

  // Create the Apollo Client once in the client
  if (!client) client = _client

  return _client
}

export default initializeClient
