"use client"

import getClient from "@api/client"
import {
  GetProductsDataByCategoryDocument,
  GetProductsDataByCategoryQuery,
  GetProductsDataByCategoryQueryVariables,
  Product,
} from "@api/codegen/graphql"
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

  const client = getClient()

  const fetchProducts = useCallback(
    async (queryVars: GetProductsDataByCategoryQueryVariables) => {
      setLoading(true)

      const productsData = await client.request(
        GetProductsDataByCategoryDocument,
        queryVars,
      )

      productsData.products?.nodes &&
        setProducts(productsData.products.nodes as Product[])
      productsData.products?.pageInfo &&
        setPageData(productsData.products.pageInfo)

      setLoading(false)
    },
    [client],
  )

  return { products, pageData, loading, fetchProducts }
}

export default useFilteredProducts
