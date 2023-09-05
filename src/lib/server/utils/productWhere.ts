import { Where } from "payload/types"

type ProductWhereArgs = {
  categoriesIds?: (string | null | undefined)[] | undefined
}

export const whereInStock: Where = {
  or: [
    { manageStock: { not_equals: true } },
    {
      and: [{ manageStock: { equals: true } }, { stock: { greater_than: 0 } }],
    },
  ],
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
