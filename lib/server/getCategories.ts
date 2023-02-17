import type {
  GetProductCategoriesDataQuery,
  ProductCategory,
} from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getCategories = async () => {
  const { data } = await getCachedQuery<GetProductCategoriesDataQuery>(
    "getProductCategoriesData",
  )
  const categoriesData = data?.productCategories?.nodes

  const rootCategories =
    categoriesData &&
    (categoriesData.filter(productCategory => {
      if (!productCategory?.ancestors) {
        return true
      } else {
        return false
      }
    }) as ProductCategory[])

  const getSlugs = (categories: ProductCategory[]) => {
    return categories
      .map(category => category?.slug)
      .filter(category => {
        if (typeof category === "string") {
          return true
        } else return false
      }) as string[]
  }

  const categorySlugs = rootCategories
    ? getSlugs(rootCategories as ProductCategory[])
    : []

  return {
    categories: rootCategories,
    categorySlugs,
  }
}

export default getCategories
