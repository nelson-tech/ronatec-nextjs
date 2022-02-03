import { Fragment, useCallback, useState } from "react"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import Link from "next/link"
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Tab,
  Transition,
} from "@headlessui/react"
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline"
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid"
import classNames from "classnames"

import { addApolloState, initializeApollo } from "@lib/apollo"
import { useMainMenu, useMobileDetect } from "@lib/hooks"
import { normalize } from "@api/utils"
import { getProductLink } from "@api/utils/products"
import { getGeneralPageData } from "@api/queries/pages"
import {
  getProductCategories,
  getProducts,
  getProductsByCategories,
} from "@api/queries/pages/products"
import { Product, ProductCategory } from "@api/gql/types"
import { CategoriesReturnType, ProductsReturnType } from "@api/queries/types"

import { Image, ProductCard, SignIn, Sort } from "@components"
import { sortOptions, SortOptionType } from "@components/Sort/Sort"
import { useApolloClient } from "@apollo/client"
import { LoadingDots } from "@components/ui"

// const sortOptions = [
//   { name: "Most Popular", href: "#", current: true },
//   { name: "Best Rating", href: "#", current: false },
//   { name: "Newest", href: "#", current: false },
//   { name: "Price: Low to High", href: "#", current: false },
//   { name: "Price: High to Low", href: "#", current: false },
// ]
// const subCategories = [
//   { name: "Totes", href: "#" },
//   { name: "Backpacks", href: "#" },
//   { name: "Travel Bags", href: "#" },
//   { name: "Hip Bags", href: "#" },
//   { name: "Laptop Sleeves", href: "#" },
// ]
// const filters = [
//   {
//     id: "color",
//     name: "Color",
//     options: [
//       { value: "white", label: "White", checked: false },
//       { value: "beige", label: "Beige", checked: false },
//       { value: "blue", label: "Blue", checked: true },
//       { value: "brown", label: "Brown", checked: false },
//       { value: "green", label: "Green", checked: false },
//       { value: "purple", label: "Purple", checked: false },
//     ],
//   },
//   {
//     id: "category",
//     name: "Category",
//     options: [
//       { value: "new-arrivals", label: "New Arrivals", checked: false },
//       { value: "sale", label: "Sale", checked: false },
//       { value: "travel", label: "Travel", checked: true },
//       { value: "organization", label: "Organization", checked: false },
//       { value: "accessories", label: "Accessories", checked: false },
//     ],
//   },
//   {
//     id: "size",
//     name: "Size",
//     options: [
//       { value: "2l", label: "2L", checked: false },
//       { value: "6l", label: "6L", checked: false },
//       { value: "12l", label: "12L", checked: false },
//       { value: "18l", label: "18L", checked: false },
//       { value: "20l", label: "20L", checked: false },
//       { value: "40l", label: "40L", checked: true },
//     ],
//   },
// ]

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

        <section
          aria-labelledby="products-heading"
          className="pt-6 pb-24 px-4 sm:px-6 lg:px-8"
        >
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          {/* Filters */}
          {/* <form className="hidden lg:block w-64">
              <h3 className="sr-only">Categories</h3>

              <Disclosure as="div" className="border-b border-gray-200 py-6">
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          Category
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4">
                        {categories &&
                          categories.map((category, optionIdx) => {
                            return (
                              <div
                                key={category.id}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${category.id}-${optionIdx}`}
                                  name={`${category.id}[]`}
                                  defaultValue={category.slug || ""}
                                  type="checkbox"
                                  defaultChecked={true}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${category.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {category.name}
                                </label>
                              </div>
                            )
                          })}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </form> */}

          {/* Product grid */}
          {loading ? (
            <div className="flex items-center justify-center mx-auto w-full flex-col space-y-8">
              <div className="font-bold">Fetching products...</div>
              <div className="w-16 h-16">
                <LoadingDots />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
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
        </section>
      </main>
    </div>
  )
}

export default Products

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

  console.log("ERR", error)

  const {
    data: { menu },
    loading: menuLoading,
    error: menuError,
  } = await client.query({
    query: getGeneralPageData,
  })

  const menuItems = normalize.menu(menu)

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
