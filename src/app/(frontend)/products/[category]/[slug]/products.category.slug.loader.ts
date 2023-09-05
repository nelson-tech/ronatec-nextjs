import getPayloadClient from "~payload/payloadClient"
import { Product } from "~payload-types"

const getProductBySlug = async (slug: string) => {
  const client = await getPayloadClient()

  let product: Product | null = null

  try {
    const products = await client.find({
      collection: "products",
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
      },
    })

    products?.docs?.length > 0 && (product = products.docs[0])
  } catch (error) {
    console.warn("Error in getProductBySlug:", error)
  }

  const firstCategory =
    product?.categories && product.categories.length > 0
      ? product.categories[0]
      : null

  const breadcrumbs =
    typeof firstCategory === "object" ? firstCategory?.breadcrumbs : undefined

  return { product, breadcrumbs }
}

export default getProductBySlug
