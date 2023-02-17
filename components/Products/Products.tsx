"use client"

import { useEffect, useRef, useState } from "react"
import { shallow } from "zustand/shallow"

import { InputMaybe, Product, ProductCategory } from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"
import { defaultPagination, PaginationType } from "@lib/pagination"
import { SortOptionType } from "@lib/store/slices/shop"
import useFilteredProducts from "@lib/hooks/useFilteredProducts"
import { GetFilteredProductsPropsType } from "@lib/server/getFilteredProducts"
import { FullProduct } from "@lib/types/products"

import Sort from "@components/Sort"
import ProductGrid from "@components/ProductGrid"
import Pagination from "@components/Pagination"
import CategoryLink from "@components/CategoryLink"

// ####
// #### Types
// ####

type ProductsInputType = {
  categories: ProductCategory[] | null | undefined
  categorySlugs: string[] | null | undefined
  initialProducts: FullProduct[] | null | undefined
}

// ####
// #### Component
// ####

const Products = ({
  categories,
  categorySlugs,
  initialProducts,
}: ProductsInputType) => {
  const productRef = useRef<HTMLDivElement>(null)

  const { selectedSort, setGlobalSort } = useStore(
    state => ({
      selectedSort: state.shop.selectedSort,
      setGlobalSort: state.shop.setGlobalSort,
    }),
    shallow,
  )

  const defaultQuery: GetFilteredProductsPropsType = {
    field: selectedSort.id.field,
    order: selectedSort.id.order,
    categories: categorySlugs ?? [],
    ...defaultPagination,
  }

  const [queryVars, setQueryVars] = useState(defaultQuery)

  const { products, pageData, loading, fetchProducts } = useFilteredProducts({
    initialProducts,
  })

  useEffect(() => {
    fetchProducts(queryVars)
  }, [queryVars, fetchProducts])

  const setPagination = (pagination: PaginationType) => {
    setQueryVars({ ...queryVars, ...pagination })
  }

  const setSelectedCategories = (
    categories: InputMaybe<string> | InputMaybe<string>[],
  ) => {
    setQueryVars({
      ...queryVars,
      ...defaultPagination,
      categories: categorySlugs ?? [],
    })
  }

  const setSelectedSort = (option: SortOptionType) => {
    setQueryVars({
      ...queryVars,
      ...defaultPagination,
      field: option.id.field,
      order: option.id.order,
    })
    setGlobalSort(option)
  }
  return (
    <>
      {" "}
      <div className="px-4 sm:px-6 lg:px-8 text-gray-500 py-6 lg:max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Categories
          <span
            className="ml-4 text-sm hidden md:inline font-normal text-gray-400 normal-case cursor-pointer"
            onClick={() => {
              if (process.browser) {
                productRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Scroll down for Products
          </span>
        </h1>

        <div
          className="text-sm md:hidden font-normal text-gray-400 normal-case cursor-pointer"
          onClick={() => {
            if (process.browser) {
              productRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          Scroll down for Products
        </div>
        <div className="text-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 mt-2">
            {categories &&
              categories.map(category => {
                return <CategoryLink category={category} key={category.id} />
              })}
          </div>
        </div>
      </div>
      <h2
        ref={productRef}
        className="max-w-7xl mx-auto px-8 pb-4 text-2xl font-bold text-gray-900 uppercase"
      >
        Products
      </h2>
      <Sort
        setSelectedSort={setSelectedSort}
        loading={loading}
        categories={categories}
        filter
        productRef={productRef}
        selectedCategories={queryVars.categories}
        setSelectedCategories={setSelectedCategories}
      />
      {products &&
        (queryVars.categories ? queryVars.categories.length > 0 : true) && (
          <>
            <ProductGrid products={products as Product[]} />

            {pageData && (
              <Pagination
                productRef={productRef}
                setPagination={setPagination}
                pageInfo={pageData}
              />
            )}
          </>
        )}
    </>
  )
}

export default Products
