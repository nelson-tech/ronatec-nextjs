import {
  GetProductsDataByCategoryQuery,
  GetProductsDataByCategoryQueryVariables,
  OrderEnum,
  ProductsOrderByEnum,
} from "@api/codegen/graphql"
import { defaultPagination } from "@lib/pagination"
import { FullProduct } from "@lib/types/products"
import getCachedQuery from "./getCachedQuery"

const getProductsByCategory = async (
  slug: string,
  input?: GetProductsDataByCategoryQueryVariables,
) => {
  const defaultData: GetProductsDataByCategoryQueryVariables = {
    field: ProductsOrderByEnum.MenuOrder,
    order: OrderEnum.Asc,
    categories: [slug],
    ...defaultPagination,
  }
  const { data } = await getCachedQuery<GetProductsDataByCategoryQuery>(
    `getProductsDataByCategory&variables={"field":"${
      input?.field ?? defaultData.field
    }","order":"${input?.order ?? defaultData.order}","categories":"${
      input?.categories ?? defaultData.categories
    }","first":"${input?.first ?? defaultData.first}","last":"${
      input?.last ?? defaultData.last
    }","after":"${input?.after ?? defaultData.after}","before":"${
      input?.before ?? defaultData.before
    }"}`,
  )

  return data?.products?.nodes as FullProduct[]
}

export default getProductsByCategory
