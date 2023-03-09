import type {
  GetProductCategoriesDataQuery,
  ProductCategory,
} from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getCategories = async () => {
  try {
    const { data } = await getCachedQuery<GetProductCategoriesDataQuery>(
      "getProductCategoriesData"
    )

    const categoriesData = data?.productCategories?.nodes

    const rootCategories =
      categoriesData &&
      (categoriesData.filter((productCategory) => {
        if (!productCategory?.ancestors) {
          return true
        } else {
          return false
        }
      }) as ProductCategory[] | null | undefined)

    const getSlugs = (categories: ProductCategory[]) => {
      return categories
        .map((category) => category?.slug)
        .filter((category) => {
          if (typeof category === "string") {
            return true
          } else return false
        }) as string[] | null | undefined
    }

    const categorySlugs = rootCategories
      ? getSlugs(rootCategories as ProductCategory[])
      : []

    return {
      categories: rootCategories,
      categorySlugs,
    }
  } catch (error) {
    console.warn("Error in getCategories:", error)

    return null
  }
}

export default getCategories
