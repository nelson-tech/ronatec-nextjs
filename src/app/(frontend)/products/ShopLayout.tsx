"use client"

import Breadcrumbs from "./Breadcrumbs"
import CategorySummary from "./CategorySummary"
import { useEffect, useRef, useState } from "react"

import type { PaginatedDocs } from "payload/dist/mongoose/types"
import ProductGrid from "./Products"
import Pagination from "./Pagination"
import Sort from "./Sort"
import type { Category, Product } from "~payload-types"
import useStore from "@hooks/useStore"
import { SortOptionType } from "@store/slices/shop"
import qs from "qs"
import productWhere from "@server/utils/productWhere"
import CategoryLink from "./CategoryLink"
import Link from "@components/Link"
import usedProductWhere from "@server/utils/usedProductWhere"

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

type CategoryLayoutProps = {
  category?: Category | null | undefined
  subCategories?: Category[] | null
  productsData: PaginatedDocs<Product> | null
  used?: boolean
}

// ####
// #### Component
// ####

const CategoryLayout = ({
  productsData,
  category,
  subCategories,
  used,
}: CategoryLayoutProps) => {
  const productRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[] | undefined>(
    productsData?.docs
  )
  const [pageData, setPageData] = useState<PageDataType>()
  const [selectedSort, setSelectedSort] = useState<SortOptionType>()
  const [selectedCategories, setSelectedCategories] = useState([
    category,
    ...(subCategories ?? []),
  ])

  const [page, setPage] = useState(productsData?.page ?? 1)

  const { productsPerPage } = useStore((stores) => ({
    productsPerPage: stores.shop.productsPerPage,
  }))

  useEffect(() => {
    setLoading(true)

    const query = qs.stringify(
      {
        where: used
          ? usedProductWhere({
              categoriesIds: selectedCategories?.map(
                (category) => category?.id
              ),
            })
          : productWhere({
              categoriesIds: selectedCategories?.map(
                (category) => category?.id
              ),
            }),
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
  }, [
    selectedSort,
    page,
    pageData?.page,
    productsPerPage,
    selectedCategories,
    used,
  ])

  return (
    <main>
      {category?.breadcrumbs && (
        <Breadcrumbs breadcrumbs={category?.breadcrumbs} used={used} />
      )}
      {category?.title && (
        <div className="p-4" data-testid="category-summary">
          <h2
            className="text-4xl w-full text-center font-extrabold tracking-tight text-gray-900"
            dangerouslySetInnerHTML={{ __html: category?.title }}
          ></h2>
        </div>
      )}

      <Sort
        productRef={productRef}
        loading={loading}
        subCategories={subCategories}
        selectedSort={selectedSort}
        main={!category}
        setSelectedSort={setSelectedSort}
        selectedCategories={selectedCategories}
      />
      <div className="flex">
        {(subCategories?.length ?? 0) > 0 && (
          <div className="hidden md:block basis-1/4 pl-6 my-4">
            <h3 className="text-lg font-bold py-4 border-b">
              {!category ? "Categories" : "Sub Categories"}
            </h3>

            <div className="" data-testid="categories-drawer">
              <div className="text-sm font-[600] text-gray-700 divide-y">
                {subCategories?.map((subCategory) => {
                  if (subCategory) {
                    return (
                      <Link
                        href={`/${used ? "used" : "products"}/${
                          subCategory.slug
                        }`}
                        className="block py-2 w-full hover:text-accent hover:tracking-wide transition-all"
                        key={subCategory?.id}
                        dangerouslySetInnerHTML={{
                          __html: subCategory.title ?? "",
                        }}
                      />
                    )
                  }
                })}
              </div>
            </div>
          </div>
        )}
        {products && (
          <div
            className={`products${
              (subCategories?.length ?? 0) > 0 ? " md:basis-3/4" : " basis-full"
            }`}
          >
            <ProductGrid products={products} used={used} />

            {productsData && (
              <Pagination
                setPage={setPage}
                productRef={productRef}
                pageData={pageData ?? productsData}
              />
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default CategoryLayout
