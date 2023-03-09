import type {
  GetHomeDataQuery,
  Page,
  Product,
  ProductCategory,
} from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getHomeData = async () => {
  try {
    const { data } = await getCachedQuery<GetHomeDataQuery>("getHomeData")

    return {
      page: data?.page as Page | null | undefined,
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
