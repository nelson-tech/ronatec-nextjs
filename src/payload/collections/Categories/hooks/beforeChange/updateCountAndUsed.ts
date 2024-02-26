import type { PaginatedDocs } from "payload/dist/mongoose/types"
import type { Payload } from "payload/dist/payload"
import type { CollectionBeforeChangeHook } from "payload/types"
import type { Category, Product } from "~payload-types"

const updateCountAndUsed: CollectionBeforeChangeHook<Category> = async ({
  data,
  originalDoc,
  req,
}) => {
  const payload = req.payload as Payload

  const id = originalDoc?.id || data.id

  if (!id) {
    return data
  }

  const productsInCategory = (await payload.find({
    collection: "products",
    where: {
      categories: {
        contains: id,
      },
    },
    limit: 9999,
  })) as PaginatedDocs<Product>

  data.productCount = productsInCategory.totalDocs
  data.usedProductCount = productsInCategory.docs.filter(
    (product) => !!product.used || !!product.lanco
  ).length

  return data
}

export default updateCountAndUsed
