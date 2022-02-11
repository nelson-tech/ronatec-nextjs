import { AppProps } from "next/app"
import { NormalizedCacheObject } from "@apollo/client/cache/inmemory/types"
import { ApolloClient } from "@apollo/client/core/ApolloClient"

import { APOLLO_STATE_PROP_NAME } from "./client"
import mergeCache from "./mergeCache"

const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps["pageProps"],
  existingCache?: NormalizedCacheObject,
) => {
  if (pageProps && "props" in pageProps) {
    const props = pageProps.props

    if (existingCache) {
      props[APOLLO_STATE_PROP_NAME] = mergeCache(
        client.cache.extract(),
        existingCache,
      )
    } else {
      props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
    }
  }

  return pageProps
}

export default addApolloState
