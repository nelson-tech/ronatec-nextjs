import {
  cacheExchange,
  Client,
  ClientOptions,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql"
import { initUrqlClient } from "next-urql"

import config from "./config"
import isServer from "@lib/utils/isServer"

type urqlPropsType = {
  options?: ClientOptions
  suspense?: boolean
}

let client: Client

const urql = (props?: urqlPropsType) => {
  const ssrCache = ssrExchange({ isClient: !isServer })

  const options = props?.options || {
    ...config,
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  }
  const suspense = props?.suspense || false
  if (!client) {
    client = initUrqlClient(options, suspense)!
  }
  return { client, ssrCache }
}

export default urql
