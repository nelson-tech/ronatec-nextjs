"use client"

import { useEffect, useRef, useState } from "react"
import { shallow } from "zustand/shallow"

import type { Product, ProductCategory } from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"
import type { GetFilteredProductsPropsType } from "@lib/server/getFilteredProducts"
import { defaultPagination, PaginationType } from "@lib/pagination"
import type { FullProduct } from "@lib/types/products"
import useFilteredProducts from "@lib/hooks/useFilteredProducts"
import { SortOptionType } from "@lib/store/slices/shop"

import Breadcrumbs from "@components/Breadcrumbs"
import CategorySummary from "@components/CategorySummary"
import Sort from "@components/Sort"
import ProductGrid from "@components/ProductGrid"
import Pagination from "@components/Pagination"

// ####
// #### Types
// ####

type CategoryPropsType = {
  category: ProductCategory | null | undefined
  initialProducts: FullProduct[] | null | undefined
}

type CategoriesPropsType = {
  categories: ProductCategory[] | null | undefined
  categorySlugs: string[] | null | undefined
  initialProducts: FullProduct[] | null | undefined
}

type ProductsPropsType = (CategoryPropsType | CategoriesPropsType) & {
  isCategories?: boolean | undefined
}

// ####
// #### Component
// ####

const Products = ({
  initialProducts,
  isCategories,
  ...props
}: ProductsPropsType) => {
  const productRef = useRef<HTMLDivElement>(null)

  const { selectedSort, setGlobalSort } = useStore(
    (state) => ({
      selectedSort: state.shop.selectedSort,
      setGlobalSort: state.shop.setGlobalSort,
    }),
    shallow
  )

  const defaultQuery: GetFilteredProductsPropsType = {
    field: selectedSort.id.field,
    order: selectedSort.id.order,
    categories: isCategories
      ? (props as CategoriesPropsType).categorySlugs ?? []
      : [(props as CategoryPropsType).category?.slug ?? ""],
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
      {!isCategories && (
        <Breadcrumbs category={(props as CategoryPropsType).category} />
      )}
      <CategorySummary
        category={
          isCategories
            ? ({
                name: "Categories",
                children: { nodes: (props as CategoriesPropsType).categories },
              } as ProductCategory)
            : (props as CategoryPropsType).category
        }
        main={isCategories}
        productRef={productRef}
      />
      <Sort
        setSelectedSort={setSelectedSort}
        loading={loading}
        productRef={productRef}
        selectedCategories={queryVars.categories}
      />
      {products &&
        (queryVars.categories ? queryVars.categories.length > 0 : true) && (
          <div className="products">
            <ProductGrid products={products as Product[]} />

            {pageData && (
              <Pagination
                productRef={productRef}
                setPagination={setPagination}
                pageInfo={pageData}
              />
            )}
          </div>
        )}
    </>
  )
}

export default Products
