import { GetProductDataBySlugQuery } from "@api/codegen/graphql"
import { FullProduct } from "@lib/types/products"
import getCachedQuery from "./getCachedQuery"

const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await getCachedQuery<GetProductDataBySlugQuery>(
      `getProductDataBySlug&variables={"id":"${slug}"}`,
    )

    return data?.product as FullProduct
  } catch (error) {
    console.warn("Error in getProductBySlug:", error)

    return null
  }
}

export default getProductBySlug
