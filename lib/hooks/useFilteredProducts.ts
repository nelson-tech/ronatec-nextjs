"use client"

import getClient from "@api/client"
import {
  GetProductsDataByCategoryDocument,
  GetProductsDataByCategoryQuery,
  GetProductsDataByCategoryQueryVariables,
  Product,
} from "@api/codegen/graphql"
import getFilteredProducts, {
  GetFilteredProductsPropsType,
} from "@lib/server/getFilteredProducts"
import { useCallback, useState } from "react"

// ####
// #### Types
// ####

type UseFilteredProductsPropsType = {
  initialProducts: Product[]
}

type PageDataType = DeepNull<
  GetProductsDataByCategoryQuery,
  "products"
>["products"]["pageInfo"]

// ####
// #### Hook
// ####

const useFilteredProducts = (props?: UseFilteredProductsPropsType) => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[] | null>(
    props?.initialProducts ?? null,
  )
  const [pageData, setPageData] = useState<PageDataType>()

  const fetchProducts = useCallback(
    async (queryVars: GetFilteredProductsPropsType) => {
      setLoading(true)

      const productsData = await getFilteredProducts(queryVars)

      productsData?.nodes && setProducts(productsData.nodes as Product[])
      productsData?.pageInfo && setPageData(productsData.pageInfo)

      setLoading(false)
    },
    [],
  )

  return { products, pageData, loading, fetchProducts }
}

export default useFilteredProducts
