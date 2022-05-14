import useStore from "@lib/hooks/useStore"
import { Product, ProductCategory } from "@api/gql/types"

import ProductCard from "@components/ProductCard"
import Sort from "@components/Sort"
import { RefObject } from "react"

// ####
// #### Types
// ####

type PropsType = {
  loading: boolean
  products: Product[]
  categories: ProductCategory[]
  filteredCategories: string[]
  productRef: RefObject<HTMLDivElement>
  setFilteredCategories: (f: string[]) => void
  withFilter?: boolean
}

// ####
// #### Component
// ####

const ProductGrid = ({
  loading,
  products,
  productRef,
  categories,
  filteredCategories,
  setFilteredCategories,
  withFilter,
}: PropsType) => {
  const viewMode = useStore(state => state.ui.viewMode)

  return (
    <>
      <Sort
        loading={loading}
        withFilter={withFilter ?? filteredCategories.length > 1}
        categories={categories}
        filteredCategories={filteredCategories}
        setFilteredCategories={setFilteredCategories}
      />
      <div className="pt-6 pb-24 px-8 mx-auto lg:max-w-7xl" ref={productRef}>
        <div className="">
          <h2 id="product-heading" className="sr-only">
            Products
          </h2>

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 gap-y-4 gap-x-2 md:gap-x-4 md:gap-y-10 md:grid-cols-3 lg:gap-x-4 lg:grid-cols-4"
                : "px-4"
            }
          >
            {filteredCategories.length > 0 &&
              products &&
              products.map(baseProduct => {
                const product = baseProduct as Product & {
                  price?: string
                }
                if (product) {
                  return <ProductCard product={product} key={product.id} />
                }
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductGrid
