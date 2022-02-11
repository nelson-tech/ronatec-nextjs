import { NormalizedCacheObject } from "@apollo/client/cache/inmemory/types"
import merge from "deepmerge"
import isEqual from "lodash.isequal"

const mergeCache = (
  cache1: NormalizedCacheObject,
  cache2: NormalizedCacheObject,
) => {
  return merge(cache1, cache2, {
    // Combine arrays using object equality (like in sets)
    arrayMerge: (destinationArray, sourceArray) => [
      ...sourceArray,
      ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
    ],
  })
}

export default mergeCache
