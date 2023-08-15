import type { ProductItems } from "payload/generated-types"

type MergeCartItemsInputType = {
  newItems: ProductItems | undefined
  existingItems: ProductItems | undefined
}

type MergeCartItemsType = (args: MergeCartItemsInputType) => ProductItems

const mergeCartItems: MergeCartItemsType = ({ newItems, existingItems }) => {
  let mergedItems = new Map<string, ProductItems[0]>()
  ;[...(newItems ?? []), ...(existingItems ?? [])].forEach((item) => {
    const productID =
      typeof item.product === "object" ? item.product.id : item.product

    mergedItems.has(productID)
      ? mergedItems.set(productID, {
          ...item,
          product: productID,
          quantity: (mergedItems.get(productID)?.quantity ?? 0) + item.quantity,
        })
      : mergedItems.set(productID, { ...item, product: productID })
  })

  return Array.from(mergedItems.values())
}

export default mergeCartItems
