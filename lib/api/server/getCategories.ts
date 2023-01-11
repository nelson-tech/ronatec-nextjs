import {
  GetProductCategoriesDocument,
  GetProductsByCategoryDocument,
  OrderEnum,
  ProductCategory,
  ProductsOrderByEnum,
} from "@api/codegen/graphql"

import useClient from "@api/client"
import { defaultPagination } from "@lib/pagination"

const getCategories = async () => {
  const client = useClient()

  const categoryData = await client.request(GetProductCategoriesDocument)

  const rootCategories =
    categoryData.productCategories?.nodes &&
    (categoryData.productCategories.nodes.filter(productCategory => {
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

  const initialProductsData = await client.request(
    GetProductsByCategoryDocument,
    {
      field: ProductsOrderByEnum.MenuOrder,
      order: OrderEnum.Asc,
      categories: categorySlugs,
      ...defaultPagination,
    },
  )

  return {
    categories: rootCategories,
    categorySlugs,
    initialProducts: initialProductsData.products?.nodes,
  }
}

export default getCategories
