import { useCallback, useEffect, useRef, useState } from "react"
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import dynamic from "next/dynamic"
import { useApolloClient } from "@apollo/client"
import { ParsedUrlQuery } from "querystring"
import smoothscroll from "smoothscroll-polyfill"

import { Product } from "@api/gql/types"
import { getGeneralPageData } from "@api/queries/pages"
import {
  getCategoryFromSlug,
  getCategorySlugs,
  getProductsByCategories,
} from "@api/queries/pages/products"
import { CategoriesReturnType, CategoryReturnType } from "@api/queries/types"
import { normalizeMenu } from "@api/utils/normalize/menu"
import { addApolloState, initializeApollo } from "@lib/apollo"
import { useMainMenu } from "@lib/hooks"
import { sortOptions, SortOptionType } from "@components/Sort/Sort"

import LoadingDots from "@components/ui/LoadingDots"
import Breadcrumbs from "@components/Breadcrumbs"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

// const Breadcrumbs = dynamic(() => import("@components/Breadcrumbs"), importOpts)
const Image = dynamic(() => import("@components/Image"), importOpts)
const ProductCard = dynamic(() => import("@components/ProductCard"), importOpts)
const Sort = dynamic(() => import("@components/Sort"), importOpts)
const MenuLink = dynamic(() => import("@components/ui/MenuLink"), importOpts)

// ####
// #### Component
// ####

const CategoryPage = ({
  category,
  menuItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)

  const apolloClient = useApolloClient()

  const [products, setProducts] = useState(
    category && category.products ? category.products.nodes : undefined,
  )
  const [loading, setLoading] = useState(false)
  const [selectedSort, setSelectedSort] = useState<SortOptionType>(
    sortOptions[0],
  )
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentCategory, setCurrentCategory] = useState(
    category && category.slug ? category.slug : "",
  )
  const [initComplete, setInitComplete] = useState(false)
  const [filteredCategories, setFilteredCategories] = useState<string[]>([
    currentCategory,
  ])

  const productRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentCategory !== category.slug) {
      setProducts(category.products?.nodes)
      category.slug && setCurrentCategory(category.slug)
    }
    return () => {
      // setProducts(null)
      // setCurrentCategory("")
    }
  }, [category, products, currentCategory])

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
          category.products &&
            category.products.nodes &&
            setProducts(category.products.nodes)
          // TODO - Add alert on front-end
        }
      }
    },
    [filteredCategories, apolloClient, setProducts, category],
  )

  useEffect(() => {
    // if (filteredCategories.length === 0 && currentCategory !== "") {
    //   setFilteredCategories([currentCategory])
    //   console.log("FILLLL", filteredCategories)
    // }
    if (filteredCategories.length === 0) {
      setProducts(null)
    }
    if (initComplete) {
      fetchProducts(selectedSort, filteredCategories)
    } else {
      setInitComplete(true)
    }
  }, [
    filteredCategories,
    currentCategory,
    fetchProducts,
    initComplete,
    selectedSort,
  ])

  const handleSort = async (option: SortOptionType) => {
    setLoading(true)

    if (selectedSort.name !== option.name) {
      setSelectedSort(option)

      await fetchProducts(option, filteredCategories)
    }

    setLoading(false)
  }

  if (category) {
    return (
      <>
        <Breadcrumbs category={category} />
        <div className="pt-16 pb-8 px-8 mx-auto lg:max-w-7xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            {category.name}
          </h1>
          <p className="mt-4 text-base text-gray-500">{category.description}</p>
          <p className="pt-2">
            <MenuLink
              href={`/products/${category.slug}/info`}
              title="Learn more"
              className="text-gray-400 hover:text-green-main text-sm"
            >
              Learn more...
            </MenuLink>
          </p>
        </div>

        {/* Sub-categories */}

        {category.children?.nodes && category.children.nodes.length > 0 && (
          <div className="px-8 text-gray-500 pb-8 mx-auto lg:max-w-7xl">
            <h2 className="font-bold text-2xl text-gray-900 uppercase">
              Sub-Categories{" "}
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
            </h2>

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
                {category.children.nodes.map(subCategory => {
                  if (subCategory) {
                    return (
                      <div
                        key={subCategory?.id}
                        className="m-4 hover:shadow rounded"
                      >
                        <MenuLink
                          href={`/products/${subCategory?.slug}`}
                          title={subCategory?.name || ""}
                        >
                          <div className="">
                            {subCategory.image && subCategory.image.sourceUrl && (
                              <div className="w-32 mx-auto h-32 pt-2">
                                <Image
                                  src={subCategory.image.sourceUrl}
                                  alt={subCategory.image.altText || ""}
                                  height={
                                    subCategory.image.mediaDetails?.height
                                  }
                                  width={subCategory.image.mediaDetails?.width}
                                  objectFit="cover"
                                  layout="responsive"
                                />
                              </div>
                            )}
                            <div className="text-center align-bottom py-2">
                              {subCategory?.name}
                            </div>
                          </div>
                        </MenuLink>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        )}

        <h2 className="px-8 pb-4 text-2xl font-bold text-gray-900 uppercase">
          Products
        </h2>

        {/* Filters */}

        <Sort
          viewMode={viewMode}
          setViewMode={setViewMode}
          handleSort={handleSort}
          selectedSort={selectedSort}
          withFilter
          category={category}
          filteredCategories={filteredCategories}
          setFilteredCategories={setFilteredCategories}
        />

        {loading ? (
          <div className="pt-12 pb-24 mx-auto lg:max-w-7xl">
            <div className="flex items-center flex-col space-y-8">
              <div className="font-bold">Fetching products...</div>
              <div className="w-16 h-16">
                <LoadingDots />
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={productRef}
            className="pt-6 pb-24 px-8 mx-auto lg:max-w-7xl"
          >
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
                {products &&
                  products.map(baseProduct => {
                    const product = baseProduct as Product & { price?: string }
                    if (product) {
                      return (
                        <ProductCard
                          product={product}
                          category_slug={category.slug || ""}
                          viewMode={viewMode}
                          key={product.id}
                        />
                      )
                    }
                  })}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
  return <div>No category found.</div>
}

export default CategoryPage

interface IParams extends ParsedUrlQuery {
  category_slug: string
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { category_slug } = context.params as IParams

  const client = initializeApollo({})

  const {
    data: { productCategory: category },
    loading,
    error,
  }: CategoryReturnType = await client.query({
    query: getCategoryFromSlug,
    variables: {
      id: category_slug,
    },
    errorPolicy: "all",
  })

  const {
    data: { menu },
  } = await client.query({
    query: getGeneralPageData,
  })

  const menuItems = normalizeMenu(menu)

  const staticProps = {
    props: { menuItems, category },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  addApolloState(client, staticProps)

  return staticProps
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo({})

  const {
    data: { productCategories },
  }: CategoriesReturnType = await client.query({ query: getCategorySlugs })
  type Path = {
    params: IParams
  }
  let paths: Path[] = []
  productCategories &&
    productCategories.nodes &&
    productCategories.nodes.map(category => {
      paths.push({ params: { category_slug: category.slug! } })
    })

  return {
    paths,
    fallback: true,
  }
}
