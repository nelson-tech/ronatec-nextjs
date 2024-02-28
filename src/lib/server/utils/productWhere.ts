import type { Where } from "payload/types"
import whereInStock from "./whereInStock"

type ProductWhereArgs = {
  categoriesIds?: (string | null | undefined)[] | undefined
}

const productWhere = (args?: ProductWhereArgs) =>
  ({
    and: [
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

export default productWhere
