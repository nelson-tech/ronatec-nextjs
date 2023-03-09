import type {
  GetCategoryDataBySlugQuery,
  ProductCategory,
} from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getCategoryBySlug = async (slug: string) => {
  try {
    const { data } = await getCachedQuery<GetCategoryDataBySlugQuery>(
      `getCategoryDataBySlug&variables={"slug":"${slug}"}`
    )

    return data?.productCategory as ProductCategory | null | undefined
  } catch (error) {
    console.warn("Error in getCategoryBySlug:", error)

    return null
  }
}

export default getCategoryBySlug
