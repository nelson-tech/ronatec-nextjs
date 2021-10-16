import { APIConfig } from "@common/types/api"
import { Product } from "@common/types/product"
import { ProductConnection } from "@ecommerce/schema"
import { getAllProductPathsQuery } from "@ecommerce/utils/queries"

type ReturnType = {
  products: Pick<Product, "slug">[]
}

const getAllProductPaths = async (config: APIConfig): Promise<ReturnType> => {
  const { data } = await config.fetch<{ products: ProductConnection }>({
    query: getAllProductPathsQuery,
  })

  const products = data.products.edges.map(({ node: { handle } }) => ({
    slug: handle,
  }))

  return { products }
}

export default getAllProductPaths
