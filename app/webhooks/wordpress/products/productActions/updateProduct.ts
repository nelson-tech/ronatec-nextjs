import getPayloadClient from "~payload/payloadClient"
import type { WCWH_Product } from "../../utils/types"
import formatProduct from "../../utils/formatProduct"

export const updateProduct = async (data: WCWH_Product, lanco?: boolean) => {
  const payload = await getPayloadClient()

  const productMatches = await payload.find({
    collection: "products",
    where: { "wc.wc_id": { equals: data.id } },
  })

  const existingProduct = productMatches.docs.at(0)

  if (existingProduct) {
    // Found a match

    // Format incoming product
    const formattedProduct = await formatProduct({
      incoming: data,
      existingProduct,
      lanco,
      payload,
      webhook: true,
    })

    console.log("Formatted Product", formattedProduct)

    const updatedProduct = await payload.update({
      collection: "products",
      id: existingProduct.id,
      data: formattedProduct,
    })

    return "Product updated"
  } else {
    // No matching product. Create it!

    const formattedProduct = await formatProduct({
      incoming: data,
      lanco: true,
      payload,
      webhook: true,
    })

    const newProduct = await payload.create({
      collection: "products",
      data: formattedProduct,
    })

    return "Product added"
  }
}
