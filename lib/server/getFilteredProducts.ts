import {
  GetProductsDataByCategoryQuery,
  OrderEnum,
  ProductsOrderByEnum,
} from "@api/codegen/graphql"
import { defaultPagination } from "@lib/pagination"
import type { PaginationType } from "@lib/pagination"
import getCachedQuery from "./getCachedQuery"

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
  const variables = {
    field,
    order,
    categories,
    first,
    last,
    after,
    before,
  }

  try {
    const { data } = await getCachedQuery<GetProductsDataByCategoryQuery>(
      `getProductsDataByCategory&variables=${JSON.stringify(variables)}`
    )

    return data?.products
  } catch (error) {
    console.warn("Error in getFilteredProducts:", error)

    return null
  }
}

export default getFilteredProducts
