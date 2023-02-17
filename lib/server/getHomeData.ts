import getClient from "@api/client"
import { GetHomeDataDocument } from "@api/codegen/graphql"
import type {
  GetHomeDataQuery,
  Product,
  ProductCategory,
} from "@api/codegen/graphql"

const getHomeData = async () => {
  try {
    const client = getClient()

    const data = await client.request(GetHomeDataDocument)

    return {
      page: data?.page as GetHomeDataQuery["page"],
      categories: data?.productCategories?.nodes as
        | ProductCategory[]
        | null
        | undefined,
      topSellers: data?.products?.nodes as Product[] | null | undefined,
    }
  } catch (error) {
    console.warn("Error in getHomeData:", error)

    return null
  }
}

export default getHomeData
