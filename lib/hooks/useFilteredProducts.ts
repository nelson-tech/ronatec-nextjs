"use client"

import useClient from "@api/client"
import {
  GetProductsByCategoryDocument,
  GetProductsByCategoryQuery,
  GetProductsByCategoryQueryVariables,
} from "@api/codegen/graphql"
import { useState } from "react"

const useFilteredProducts = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] =
    useState<GetProductsByCategoryQuery["products"]>()

  const client = useClient()

  const fetchProducts = async (
    queryVars: GetProductsByCategoryQueryVariables,
  ) => {
    setLoading(true)

    const productsData = await client.request(
      GetProductsByCategoryDocument,
      queryVars,
    )

    productsData.products?.nodes && setProducts(productsData.products)

    setLoading(false)
  }
  return { products, loading, fetchProducts }
}

export default useFilteredProducts
