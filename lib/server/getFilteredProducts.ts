import {
  GetProductsDataByCategoryDocument,
  OrderEnum,
  ProductsOrderByEnum,
} from "@api/codegen/graphql"
import { defaultPagination } from "@lib/pagination"
import type { PaginationType } from "@lib/pagination"
import getClient from "@api/client"

export type GetFilteredProductsPropsType = {
  field?: ProductsOrderByEnum
  order?: OrderEnum
  categories: string[]
} & PaginationType

const getFilteredProducts = async ({
  field = ProductsOrderByEnum.MenuOrder,
  order = OrderEnum.Asc,
  categories,
  first = defaultPagination.first,
  last = defaultPagination.last,
  after = defaultPagination.after,
  before = defaultPagination.before,
}: GetFilteredProductsPropsType) => {
  try {
    const client = getClient()

    const data = await client.request(GetProductsDataByCategoryDocument, {
      field,
      order,
      categories,
      first,
      last,
      after,
      before,
    })

    return data.products
  } catch (error) {
    console.warn("Error in getFilteredProducts:", error)

    return null
  }
}

export default getFilteredProducts
