import useClient from "@api/client"
import {
  GetCategoryBySlugDocument,
  GetProductsByCategoryDocument,
  OrderEnum,
  ProductsOrderByEnum,
} from "@api/codegen/graphql"
import { defaultPagination } from "@lib/pagination"

const getCategoryBySlug = async (slug: string) => {
  const client = useClient()

  const categoryData = await client.request(GetCategoryBySlugDocument, {
    id: slug,
  })

  const initialProductsData = await client.request(
    GetProductsByCategoryDocument,
    {
      field: ProductsOrderByEnum.MenuOrder,
      order: OrderEnum.Asc,
      categories: [slug],
      ...defaultPagination,
    },
  )

  return {
    category: categoryData.productCategory,
    initialProducts: initialProductsData.products?.nodes,
  }
}

export default getCategoryBySlug
