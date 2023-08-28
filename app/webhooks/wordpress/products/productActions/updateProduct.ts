import getPayloadClient from "~payload/payloadClient"
import type { WCWH_Product } from "../../utils/types"
import formatProduct from "../../utils/formatProduct"
import findMatchingDocument from "../../utils/findMatchingDocument"

export const updateProduct = async (data: WCWH_Product, lanco?: boolean) => {
  const payload = await getPayloadClient()

  // check if WC data has been imported before
  const existingProduct = await findMatchingDocument({
    collection: "products",
    where: { "wc.wc_id": { equals: data?.id } },
    payload,
  })

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
