import { Product } from "payload/generated-types"
import { CollectionBeforeChangeHook } from "payload/types"

const checkVariations: CollectionBeforeChangeHook<Product> = async ({
  req,
  data,
  originalDoc,
}) => {
  const { payload } = req

  const newDoc = {
    ...data,
    hasVariation: (data.variations?.length ?? 0) > 0,
  }

  return newDoc
}

export default checkVariations
