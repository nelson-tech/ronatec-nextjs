"use client"

import Breadcrumbs from "../Breadcrumbs"
import CategorySummary from "./CategorySummary"
import { useEffect, useRef, useState } from "react"

import type { PaginatedDocs } from "payload/dist/mongoose/types"
import ProductGrid from "../Products"
import Pagination from "../Pagination"
import Sort from "../Sort"
import type { Category, Product } from "payload/generated-types"
import useStore from "@hooks/useStore"
import { SortOptionType } from "@store/slices/shop"
import qs from "qs"

// ####
// #### Types
// ####

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

type CategoryPropsType = {
  category: Category | null | undefined
  childCategories: Category[] | null
}

type CategoriesPropsType = {
  categories: Category[] | null | undefined
}

type CategoryLayoutProps = (CategoryPropsType | CategoriesPropsType) & {
  isCategories?: boolean | undefined
  productsData: PaginatedDocs<Product> | null
}

// ####
// #### Component
// ####

const CategoryLayout = ({
  isCategories,
  productsData,
  ...props
}: CategoryLayoutProps) => {
  const productRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[] | undefined>(
    productsData?.docs
  )
  const [pageData, setPageData] = useState<PageDataType>()
  const [selectedSort, setSelectedSort] = useState<SortOptionType>()
  const [selectedCategories, setSelectedCategories] = useState(
    isCategories
      ? (props as CategoriesPropsType).categories
      : [
          (props as CategoryPropsType).category,
          ...((props as CategoryPropsType).childCategories ?? []),
        ]
  )

  const [page, setPage] = useState(productsData?.page ?? 1)

  const { productsPerPage } = useStore((stores) => ({
    productsPerPage: stores.shop.productsPerPage,
  }))

  useEffect(() => {
    setLoading(true)

    const query = qs.stringify(
      {
        where: {
          and: [
            {
              categories: {
                in: selectedCategories?.map((category) => category?.id),
              },
            },
            { _status: { equals: "published" } },
          ],
        },
      },
      { addQueryPrefix: false }
    )

    const url = `/api/products?limit=${productsPerPage}${
      selectedSort
        ? `&sort=${selectedSort.id.order}${selectedSort.id.orderby}`
        : ""
    }&page=${page ?? pageData?.page}&${query}`

    fetch(url).then((response) => {
      response.json().then(
        (
          productsData: {
            errors: string[]
            docs: Product[]
          } & PaginationMetadataType
        ) => {
          const { docs: products, errors, ...newPageData } = productsData

          products && setProducts(products)
          newPageData && setPageData(newPageData)
        }
      )
    })

    setLoading(false)
  }, [selectedSort, page, pageData?.page, productsPerPage, selectedCategories])

  return (
    <main>
      {!isCategories && (
        <Breadcrumbs
          breadcrumbs={(props as CategoryPropsType).category?.breadcrumbs}
        />
      )}
      <CategorySummary
        category={
          isCategories
            ? ({
                title: "Categories",
                id: "",
                createdAt: "",
                updatedAt: "",
              } as Category)
            : (props as CategoryPropsType).category
        }
        main={isCategories}
        childCategories={
          isCategories
            ? (props as CategoriesPropsType).categories
            : (props as CategoryPropsType).childCategories
        }
        productRef={productRef}
      />
      <Sort
        productRef={productRef}
        loading={loading}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        selectedCategories={selectedCategories}
      />
      {products && (
        <div className="products">
          <ProductGrid products={products} />

          {productsData && (
            <Pagination
              setPage={setPage}
              productRef={productRef}
              pageData={pageData ?? productsData}
            />
          )}
        </div>
      )}
    </main>
  )
}

export default CategoryLayout
