import { OrderEnum, ProductsOrderByEnum } from "@api/codegen/graphql"
import type { GetProductsDataByCategoryQuery } from "@api/codegen/graphql"
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
  const { data } = await getCachedQuery<GetProductsDataByCategoryQuery>(
    `getProductsDataByCategory&variables={"field":"${field}","order":"${order}","categories":"${categories}","first":"${first}","last":"${last}","after":"${after}","before":"${before}"}`,
  )

  return data?.products
}

export default getFilteredProducts
