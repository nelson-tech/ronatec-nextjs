import { NormalizedCacheObject } from "@apollo/client/cache/inmemory/types"
import { ApolloClient } from "@apollo/client/core/ApolloClient"

import mergeCache from "./mergeCache"

const mergeAndRestoreCache = (
  client: ApolloClient<NormalizedCacheObject>,
  state: NormalizedCacheObject | undefined,
) => {
  if (!state) return

  // Get existing cache, loaded during client side data fetching
  const existingCache = client.extract()
  // Merge the existing cache into data passed from getStaticProps/getServerSideProps
  const data = mergeCache(state, existingCache)
  // Restore the cache with the merged data
  client.cache.restore(data)
}

export default mergeAndRestoreCache
