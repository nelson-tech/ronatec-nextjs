"use client"

import useClient from "@api/client"
import {
  GetProductsByCategoryDocument,
  GetProductsByCategoryQuery,
  GetProductsByCategoryQueryVariables,
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
  GetProductsByCategoryQuery,
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

  const client = useClient()

  const fetchProducts = useCallback(
    async (queryVars: GetProductsByCategoryQueryVariables) => {
      setLoading(true)

      const productsData = await client.request(
        GetProductsByCategoryDocument,
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
