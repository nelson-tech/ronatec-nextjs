import type { CollectionBeforeChangeHook } from "payload/types"
import type { Cart } from "payload/generated-types"

const updateCountHook: CollectionBeforeChangeHook<Cart> = async ({ data }) => {
  if (data.items) {
    // Items are being updated. Count must be calculated

    let count = 0
    data?.items &&
      data?.items.length > 0 &&
      data.items.forEach((item) => {
        count += item.quantity
      })

    const updatedCart = { ...data, count }

    return updatedCart
  } else {
    // Skip count calculation
    return data
  }
}

export default updateCountHook
