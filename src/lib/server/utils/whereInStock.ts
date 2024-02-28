import type { Where } from "payload/types"

const whereInStock: Where = {
  or: [
    { manageStock: { not_equals: true } },
    {
      and: [{ manageStock: { equals: true } }, { stock: { greater_than: 0 } }],
    },
  ],
}

export default whereInStock
