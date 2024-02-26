import type { CollectionBeforeChangeHook } from "payload/types"
import { Product } from "~payload-types"

const setUsed: CollectionBeforeChangeHook<Product> = async ({ data }) => {
  if (data.lanco) {
    data.used = true
  }

  return data
}

export default setUsed
