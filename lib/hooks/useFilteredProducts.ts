"use client"

import { useCallback, useState } from "react"

import { GetProductsDataByCategoryQuery, Product } from "@api/codegen/graphql"
import getFilteredProducts, {
  GetFilteredProductsPropsType,
} from "@lib/server/getFilteredProducts"
import { FullProduct } from "@lib/types/products"

// ####
// #### Types
// ####

type UseFilteredProductsPropsType = {
  initialProducts: FullProduct[] | null | undefined
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
