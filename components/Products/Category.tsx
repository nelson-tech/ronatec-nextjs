"use client"

import { useEffect, useRef, useState } from "react"
import { shallow } from "zustand/shallow"

import type {
  InputMaybe,
  Product,
  ProductCategory,
  ProductCategory as ProductCategoryType,
} from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"
import { defaultPagination, PaginationType } from "@lib/pagination"
import useFilteredProducts from "@lib/hooks/useFilteredProducts"
import { SortOptionType } from "@lib/store/slices/shop"

import Breadcrumbs from "@components/Breadcrumbs"
import CategorySummary from "@components/CategorySummary"
import Sort from "@components/Sort"
import ProductGrid from "@components/ProductGrid"
import Pagination from "@components/Pagination"
import { GetFilteredProductsPropsType } from "@lib/server/getFilteredProducts"

// ####
// #### Types
// ####

type ProductCategoryPropsType = {
  category: ProductCategory | null | undefined
  initialProducts: Product[] | null | undefined
}

// ####
// #### Component
// ####

const ProductCategory = ({
  category,
  initialProducts,
}: ProductCategoryPropsType) => {
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
    categories: [category?.slug ?? ""],
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

  const setSelectedCategories = (categories: string[]) => {
    setQueryVars({ ...queryVars, ...defaultPagination, categories })
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
      <Breadcrumbs category={category} />
      <CategorySummary category={category} productRef={productRef} />
      <Sort
        setSelectedSort={setSelectedSort}
        loading={loading}
        categories={category ? [category] : []}
        productRef={productRef}
        selectedCategories={queryVars.categories}
        setSelectedCategories={setSelectedCategories}
      />

      {products &&
      (queryVars.categories ? queryVars.categories.length > 0 : true) ? (
        <>
          <ProductGrid products={products} />

          {pageData && (
            <Pagination
              productRef={productRef}
              setPagination={setPagination}
              pageInfo={pageData}
            />
          )}
        </>
      ) : (
        <>
          <div className="max-w-7xl p-8 mx-auto">No category found.</div>
        </>
      )}
    </>
  )
}

export default ProductCategory
