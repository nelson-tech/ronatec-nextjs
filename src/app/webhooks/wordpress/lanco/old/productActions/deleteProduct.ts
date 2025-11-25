import { WCWH_Product } from "../../utils/types"
import getPayloadClient from "~payload/payloadClient"

const deleteProduct = async (data: WCWH_Product) => {
  const payload = await getPayloadClient()

  const productMatches = await payload.find({
    collection: "products",
    where: { "wc.wc_id": { equals: data.id } },
  })

  const existingProduct = productMatches.docs.at(0)

  if (existingProduct?.id) {
    // Found a match

    const deletedProduct = await payload.delete({
      collection: "products",
      id: existingProduct.id,
    })

    return "Product deleted"
  }
}

export default deleteProduct
