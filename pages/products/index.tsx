import { useCallback, useState } from "react"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import dynamic from "next/dynamic"
import { useApolloClient } from "@apollo/client"

import { addApolloState, initializeApollo } from "@lib/apollo"
import { useMainMenu, useMobileDetect } from "@lib/hooks"
import { normalizeMenu } from "@api/utils/normalize/menu"
import { getGeneralPageData } from "@api/queries/pages"
import {
  getProductCategories,
  getProductsByCategories,
} from "@api/queries/pages/products"
import { Product, ProductCategory } from "@api/gql/types"
import { CategoriesReturnType, ProductsReturnType } from "@api/queries/types"
import { sortOptions, SortOptionType } from "@components/Sort/Sort"

import LoadingDots from "@components/ui/LoadingDots"
import ProductCard from "@components/ProductCard"
import Sort from "@components/Sort"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

// const ProductCard = dynamic(() => import("@components/ProductCard"), importOpts)
// const Sort = dynamic(() => import("@components/Sort"), importOpts)

// ####
// #### Component
// ####

const Products = ({
  menuItems,
  categories,
  products: initialProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)

  const apolloClient = useApolloClient()

  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState(initialProducts)
  const [selectedSort, setSelectedSort] = useState<SortOptionType>(
    sortOptions[0],
  )
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filteredCategories, setFilteredCategories] = useState<string[]>([
    (categories && categories[0].slug) || "",
  ])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const { isMobile } = useMobileDetect()

  const fetchProducts = useCallback(
    async (option: SortOptionType, categories: string[]) => {
      if (filteredCategories.length != 0) {
        const { field, order } = option.id

        const { data, error, loading } = await apolloClient.query({
          query: getProductsByCategories,
          variables: { field, order, categories },
          errorPolicy: "all",
        })

        if (data && data.products) {
          data.products?.nodes && setProducts(data.products.nodes)
        }

        if (error) {
          console.log("ERROR", error)
          // category.products &&
          //   category.products.nodes &&
          //   setProducts(category.products.nodes)
          // TODO - Add alert on front-end
        }
      }
    },
    [filteredCategories, apolloClient, setProducts],
  )

  const handleSort = async (option: SortOptionType) => {
    setLoading(true)

    if (selectedSort.name !== option.name) {
      setSelectedSort(option)

      await fetchProducts(option, filteredCategories)
    }

    setLoading(false)
  }

  return (
    <div>
      <main className="max-w-7xl mx-auto">
        <div className="relative px-4 sm:px-6 lg:px-8 flex items-baseline justify-between pt-6 pb-6 border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Products
          </h1>
        </div>

        <Sort
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedSort={selectedSort}
          handleSort={handleSort}
          withFilter={true}
          category={categories[0]}
          filteredCategories={filteredCategories}
          setFilteredCategories={setFilteredCategories}
        />

        <div className="pt-6 pb-24 px-4 sm:px-6 lg:px-8">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          {/* Filters */}

          {/* Product grid */}
          {loading ? (
            <div className="flex items-center justify-center mx-auto w-full flex-col space-y-8">
              <div className="font-bold">Fetching products...</div>
              <div className="w-16 h-16">
                <LoadingDots />
              </div>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 gap-y-4 gap-x-2 md:gap-x-4 md:gap-y-10 md:grid-cols-3 lg:gap-x-4 lg:grid-cols-4"
                  : "px-4"
              }
            >
              {products &&
                products.map(baseProduct => {
                  const product = baseProduct as Product & { price?: string }
                  if (product) {
                    return (
                      <ProductCard
                        product={product}
                        category_slug={
                          (product.productCategories?.nodes &&
                            product.productCategories.nodes[0]?.slug) ||
                          ""
                        }
                        viewMode={viewMode}
                        key={product.id}
                      />
                    )
                  }
                })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Products

// ####
// #### External Props
// ####

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = initializeApollo({})

  const {
    data: { productCategories },
  }: CategoriesReturnType = await client.query({
    query: getProductCategories,
    errorPolicy: "all",
  })

  let rootCategories: ProductCategory[] =
    productCategories && productCategories.nodes
      ? productCategories.nodes.filter(productCategory => {
          if (!productCategory.ancestors) {
            return true
          } else {
            return false
          }
        })
      : []

  const field = "MENU_ORDER"
  const order = "ASC"

  const {
    data: { products },
    error,
    loading,
  }: ProductsReturnType = await client.query({
    query: getProductsByCategories,
    variables: { field, order, rootCategories },
    errorPolicy: "all",
  })

  const {
    data: { menu },
    loading: menuLoading,
    error: menuError,
  } = await client.query({
    query: getGeneralPageData,
  })

  const menuItems = normalizeMenu(menu)

  const staticProps = {
    props: {
      menuItems,
      categories: productCategories.nodes,
      products: products.nodes,
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  addApolloState(client, staticProps)

  return staticProps
}
