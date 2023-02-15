import {
  GetHomeDataQuery,
  Page,
  Product,
  ProductCategory,
} from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getHomeData = async () => {
  const { data } = await getCachedQuery<GetHomeDataQuery>("getHomeData")

  return {
    page: data?.page as GetHomeDataQuery["page"],
    categories: data?.productCategories?.nodes as
      | ProductCategory[]
      | null
      | undefined,
    topSellers: data?.products?.nodes as Product[] | null | undefined,
  }
}

export default getHomeData
