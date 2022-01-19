import { useEffect, useState } from "react"
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
  getProductsByCategory,
} from "@api/queries/pages/products"
import { CategoriesReturnType, CategoryReturnType } from "@api/queries/types"
import { normalize } from "@api/utils"
import { addApolloState, initializeApollo } from "@lib/apollo"

import { Breadcrumbs, ProductCard, Sort } from "@components"
import { LoadingDots } from "@components/ui"
import { useMainMenu } from "@lib/hooks"

const CategoryPage = ({
  category,
  menuItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)

  const apolloClient = useApolloClient()

  const [products, setProducts] = useState<Maybe<Product>[] | null | undefined>(
    null,
  )
  const [loading, setLoading] = useState(false)
  const [selectedSort, setSelectedSort] = useState("Default")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentCategory, setCurrentCategory] = useState("")

  useEffect(() => {
    if (currentCategory !== category.slug) {
      setProducts(category.products?.nodes)
      setCurrentCategory(category.slug!)
    }
    return () => {
      // setProducts(null)
      // setCurrentCategory("")
    }
  }, [category, products, currentCategory])

  const handleSort = async (option: {
    name: string
    id: { field: string; order: string }
  }) => {
    setLoading(true)

    if (selectedSort !== option.name) {
      setSelectedSort(option.name)

      const { field, order } = option.id

      const { data, error, loading } = await apolloClient.query({
        query: getProductsByCategory,
        variables: { field, order, category: category.slug },
        errorPolicy: "all",
      })
      console.log(data)
      if (data) {
        data.products?.nodes && setProducts(data.products.nodes)
      }

      if (error) {
        console.log("ERROR", error)
        setProducts(category.products?.nodes)
        // TODO - Add alert on front-end
      }
    }

    setLoading(false)
  }

  if (category) {
    return (
      <>
        <Breadcrumbs category={category} />
        <div className="pt-16 pb-8 px-8">
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

        {/* Filters */}

        <Sort
          viewMode={viewMode}
          setViewMode={setViewMode}
          handleSort={handleSort}
          selectedSort={selectedSort}
        />

        {loading ? (
          <div className="pt-12 pb-24">
            <div className="flex items-center flex-col space-y-8">
              <div className="font-bold">Fetching products...</div>
              <div className="w-16 h-16">
                <LoadingDots />
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3 px-4">
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
