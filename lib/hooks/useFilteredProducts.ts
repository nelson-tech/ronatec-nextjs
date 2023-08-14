"use client"

import { useCallback, useState } from "react"

import { Product } from "payload/generated-types"
import { SortOptionType } from "@store/slices/shop"
import { PaginatedDocs } from "payload/dist/mongoose/types"
import useStore from "./useStore"

// ####
// #### Types
// ####

type UseFilteredProductsPropsType = {
  initialProducts: Product[] | null | undefined
}

type PageDataType = Omit<PaginatedDocs<Product>, "docs">

type PaginationMetadataType = {
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

// ####
// #### Hook
// ####

const useFilteredProducts = (props?: UseFilteredProductsPropsType) => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[] | null>(
    props?.initialProducts ?? null
  )
  const [pageData, setPageData] = useState<PageDataType>()

  const { productsPerPage } = useStore((stores) => ({
    productsPerPage: stores.shop.productsPerPage,
  }))

  const fetchProducts = useCallback(
    async ({ sort, page }: { sort?: SortOptionType["id"]; page?: number }) => {
      setLoading(true)

      const response = await fetch(
        `/api/products?limit=${productsPerPage}${
          sort ? `&sort=${sort.order}${sort.orderby}` : ""
        }&page=${page ?? pageData?.page}`
      )

      const productsData: {
        errors: string[]
        docs: Product[]
      } & PaginationMetadataType = await response.json()

      const { docs: products, errors, ...newPageData } = productsData

      products && setProducts(products)
      newPageData && setPageData(newPageData)

      setLoading(false)
    },
    []
  )

  return { products, pageData, loading, fetchProducts }
}

export default useFilteredProducts
