import {
  GetCategoryDataBySlugQuery,
  ProductCategory,
} from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getCategoryBySlug = async (slug: string) => {
  try {
    const { data } = await getCachedQuery<GetCategoryDataBySlugQuery>(
      `getCategoryDataBySlug&variables={"id":"${slug}"}`,
    )

    return data?.productCategory as ProductCategory
  } catch (error) {
    console.warn("Error in getCategoryBySlug:", error)

    return null
  }
}

export default getCategoryBySlug
