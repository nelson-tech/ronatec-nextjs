import getClient from "@api/client"
import { GetProductCategoriesDataDocument } from "@api/codegen/graphql"
import type { ProductCategory } from "@api/codegen/graphql"

const getCategories = async () => {
  try {
    const client = getClient()

    const data = await client.request(GetProductCategoriesDataDocument)

    const categoriesData = data?.productCategories?.nodes

    const rootCategories =
      categoriesData &&
      (categoriesData.filter((productCategory) => {
        if (!productCategory?.ancestors) {
          return true
        } else {
          return false
        }
      }) as ProductCategory[])

    const getSlugs = (categories: ProductCategory[]) => {
      return categories
        .map((category) => category?.slug)
        .filter((category) => {
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
  } catch (error) {
    console.warn("Error in getCategories:", error)

    return null
  }
}

export default getCategories
