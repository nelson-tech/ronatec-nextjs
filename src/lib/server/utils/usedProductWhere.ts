import type { Where } from "payload/types"
import whereInStock from "./whereInStock"

type ProductWhereArgs = {
  categoriesIds?: (string | null | undefined)[] | undefined
}

const usedProductWhere = (args?: ProductWhereArgs) =>
  ({
    and: [
      { or: [{ lanco: { equals: true } }, { used: { equals: true } }] },

      args?.categoriesIds
        ? {
            categories: {
              in: args.categoriesIds,
            },
          }
        : {},
      { _status: { equals: "published" } },
      whereInStock,
    ],
  }) as Where

export default usedProductWhere
