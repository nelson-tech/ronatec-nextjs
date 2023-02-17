import getClient from "@api/client"
import { GetCategoryDataBySlugDocument } from "@api/codegen/graphql"
import type { ProductCategory } from "@api/codegen/graphql"

const getCategoryBySlug = async (slug: string) => {
  try {
    const client = getClient()

    const data = await client.request(GetCategoryDataBySlugDocument, {
      id: slug,
    })

    return data?.productCategory as ProductCategory | null | undefined
  } catch (error) {
    console.warn("Error in getCategoryBySlug:", error)

    return null
  }
}

export default getCategoryBySlug
