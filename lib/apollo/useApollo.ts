import { useEffect, useState } from "react"
import { NormalizedCacheObject } from "@apollo/client/cache/inmemory/types"
import { ApolloClient } from "@apollo/client/core/ApolloClient"
import isEqual from "lodash.isequal"
import { useEffectOnce, usePrevious } from "react-use"

import { APOLLO_STATE_PROP_NAME, default as initializeApollo } from "./client"
import { cache as defaultCache } from "./cache"
import mergeAndRestoreCache from "./mergeAndRestoreCache"

const useApollo = (
  pageProps: Record<string, unknown>,
): {
  client: ApolloClient<NormalizedCacheObject> | undefined
  // cachePersistor: CachePersistor<NormalizedCacheObject> | undefined
} => {
  const state = pageProps[APOLLO_STATE_PROP_NAME] as
    | NormalizedCacheObject
    | undefined
  const previousState = usePrevious(state)

  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
  // const [cachePersistor, setCachePersistor] =
  //   useState<CachePersistor<NormalizedCacheObject>>()

  useEffectOnce(() => {
    async function init() {
      const cache = defaultCache

      // if (!isDev) {
      //   const cachePersistor = new CachePersistor({
      //     cache,
      //     storage: new LocalStorageWrapper(window.localStorage),
      //     debug: process.env.NODE_ENV === "development",
      //     key: PERSISTOR_CACHE_KEY,
      //   })

      //   // Restore client side persisted data before letting the application to
      //   // run any queries
      //   await cachePersistor.restore()
      // }

      const client = initializeApollo({ cache })

      // if (!isDev) {
      mergeAndRestoreCache(client, state)

      // Trigger persist to persist data from SSR
      // if (cachePersistor) {
      //   cachePersistor.persist()
      // }
      // setCachePersistor(cachePersistor)
      // }

      setClient(client)
    }

    init()
  })

  useEffect(() => {
    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here during page transitions
    if (client && state && previousState && !isEqual(state, previousState)) {
      // if (!isDev) {
      mergeAndRestoreCache(client, state)

      // if (cachePersistor) {
      //   // Trigger persist to persist data from SSR
      //   cachePersistor.persist()
      // }
      // }
    }
  }, [state, previousState, client])

  return { client }
}

export default useApollo
