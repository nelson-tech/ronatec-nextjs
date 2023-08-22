import type { ProductItems } from "payload/generated-types"

type MergeCartItemsInputType = {
  newItems: ProductItems
  existingItems: ProductItems
}

type MergeCartItemsType = (args: MergeCartItemsInputType) => ProductItems

const mergeCartItems: MergeCartItemsType = ({ newItems, existingItems }) => {
  let mergedItems = new Map<string, ProductItems[0]>(
    existingItems.map((item) => [
      item.id ?? "",
      {
        ...item,
        product:
          typeof item.product === "object" ? item.product.id : item.product,
      },
    ])
  )

  newItems.forEach((item) => {
    const productID =
      typeof item.product === "object" ? item.product.id : item.product

    mergedItems.set(item.id ?? "", { ...item, product: productID })
  })

  return Array.from(mergedItems.values())
}

export default mergeCartItems
