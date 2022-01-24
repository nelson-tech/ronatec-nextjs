import { useCallback, useEffect, useState } from "react"
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import Link from "next/link"
import { useApolloClient } from "@apollo/client"
import { ParsedUrlQuery } from "querystring"

import { Maybe, Product } from "@api/gql/types"
import { getGeneralPageData } from "@api/queries/pages"
import {
  getCategoryFromSlug,
  getCategorySlugs,
  getProductsByCategories,
} from "@api/queries/pages/products"
import { CategoriesReturnType, CategoryReturnType } from "@api/queries/types"
import { normalize } from "@api/utils"
import { addApolloState, initializeApollo } from "@lib/apollo"

import { Breadcrumbs, ProductCard, Sort } from "@components"
import { LoadingDots, MenuLink } from "@components/ui"
import { useMainMenu } from "@lib/hooks"
import { sortOptions, SortOptionType } from "@components/Sort/Sort"

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
          // setProducts(category.products?.nodes)
          // TODO - Add alert on front-end
        }
      }
    },
    [filteredCategories, apolloClient, setProducts, category],
  )

  useEffect(() => {
    if (filteredCategories.length === 0 && currentCategory !== "") {
      setFilteredCategories([currentCategory])
      console.log("FILLLL", filteredCategories)
    }
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
            <Link href={`/products/${category.slug}/info`} passHref>
              <a
                title="Learn more"
                className="text-gray-400 hover:text-green-main text-sm"
              >
                Learn more...
              </a>
            </Link>
          </p>
        </div>

        {/* Sub-categories */}

        {category.children?.nodes && category.children.nodes.length > 0 && (
          <div className="px-8 text-gray-500 pb-8 mx-auto lg:max-w-7xl">
            <h2 className="font-bold text-gray-900">Sub-Categories:</h2>
            <div className="text-sm pl-4">
              <ul>
                {category.children.nodes.map(subCategory => {
                  return (
                    <li key={subCategory?.id}>
                      <MenuLink href={`/products/${subCategory?.slug}`}>
                        {subCategory?.name}
                      </MenuLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}

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
          <div className="pt-6 pb-24 mx-auto lg:max-w-7xl">
            <section aria-labelledby="product-heading" className="">
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 gap-y-4 gap-x-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 lg:grid-cols-3"
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
            </section>
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

  const menuItems = normalize.menu(menu)

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
