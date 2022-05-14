import { useEffect, useRef, useState } from "react"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import dynamic from "next/dist/shared/lib/dynamic"

import urql from "@api/urql/serverClient"
import withUrql from "@api/urql/hoc"
import {
  GetProductCategoriesDocument,
  GetProductCategoriesQuery,
  GetProductsByCategoryDocument,
  GetProductsByCategoryQuery,
  GetProductsByCategoryQueryVariables,
  OrderEnum,
  Product,
  ProductCategory,
  ProductsOrderByEnum,
  useGetProductsByCategoryQuery,
} from "@api/gql/types"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"
import { sortOptions, SortOptionType } from "@lib/store/slices/ui"
import useStore from "@lib/hooks/useStore"
import shallow from "zustand/shallow"
import Image from "@components/Image"
import ProductGrid from "@components/Category/ProductGrid"
import Link from "@components/Link"

// TODO - Add pagination

// ####
// #### Dynamic Imports
// ####

const clientOpts = { ssr: false }

const ProductCard = dynamic(() => import("@components/ProductCard"), clientOpts)
const Sort = dynamic(() => import("@components/Sort"), clientOpts)

// ####
// #### Component
// ####

const Products = ({
  categories,
  products: initialProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { selectedSort, setSelectedSort, viewMode } = useStore(
    state => ({
      selectedSort: state.ui.selectedSort,
      setSelectedSort: state.ui.setSelectedSort,
      viewMode: state.ui.viewMode,
    }),
    shallow,
  )

  const defaultFilteredCategories = categories
    ? (categories
        .map(category => {
          let filteredCategories = [category.slug]

          category?.children?.nodes &&
            category.children.nodes.map(child => {
              let childCategories = [child?.slug]

              child?.children?.nodes &&
                child.children.nodes.map(grandchild => {
                  childCategories.push(grandchild?.slug)
                })

              filteredCategories = filteredCategories.concat(childCategories)
            })

          return filteredCategories.flat().filter(a => !!a)
        })
        .flat() as string[])
    : []

  const [pause, setPause] = useState(true)
  const [products, setProducts] = useState(initialProducts)
  const [filteredCategories, setFilteredCategories] = useState<string[]>(
    defaultFilteredCategories,
  )

  const productRef = useRef<HTMLDivElement>(null)

  // Products Query
  const [
    { data: productsData, error: productsError, fetching: productsFetching },
  ] = useGetProductsByCategoryQuery({
    variables: {
      field: selectedSort.id.field as ProductsOrderByEnum,
      order: selectedSort.id.order as OrderEnum,
      categories: filteredCategories,
    },
    pause,
  })

  // Unpause if selectedSort changes from default
  useEffect(() => {
    if (selectedSort.name !== sortOptions[0].name) {
      setPause(false)
    }
  }, [selectedSort, setPause])

  // Unpause if filteredCategories changes from default
  useEffect(() => {
    if (filteredCategories.length !== defaultFilteredCategories.length) {
      setPause(false)
    }
  }, [filteredCategories, setPause, defaultFilteredCategories.length])

  // Update products if new products fetched
  useEffect(() => {
    if (productsData?.products?.nodes) {
      setProducts(productsData.products.nodes as Product[])
    }
  }, [productsData?.products?.nodes, setProducts])

  const handleSort = async (option: SortOptionType) => {
    setSelectedSort(option)
  }

  return (
    <>
      <Layout>
        <PageTitle
          title="Products"
          description="Main shopping page."
          banner={false}
        />

        {/* <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8 flex items-baseline justify-between pt-6 pb-6 border-gray-200">
          <div className="flex items-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Products
            </h1>
          </div>
        </div> */}

        {categories && categories.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 text-gray-500 py-6 lg:max-w-7xl">
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
                    return (
                      <div
                        key={category.id}
                        className="m-4 pt-2 hover:shadow rounded"
                      >
                        <Link
                          href={`/products/${category.slug}`}
                          title={category.name || ""}
                        >
                          {category.image && category.image.sourceUrl && (
                            <div className="w-32 mx-auto aspect-video overflow-hidden rounded">
                              <Image
                                src={category.image.sourceUrl}
                                alt={category.name || ""}
                                height={category.image.mediaDetails?.height}
                                width={category.image.mediaDetails?.width}
                                objectFit="cover"
                                layout="responsive"
                                sizes="25vw"
                              />
                            </div>
                          )}
                          <div className="text-center align-bottom py-2">
                            {category.name}
                          </div>
                        </Link>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        )}

        <h2
          ref={productRef}
          className="max-w-7xl mx-auto px-8 pb-4 text-2xl font-bold text-gray-900 uppercase"
        >
          Products
        </h2>

        {categories && products && (
          <ProductGrid
            loading={productsFetching}
            categories={categories}
            products={products}
            filteredCategories={filteredCategories}
            setFilteredCategories={setFilteredCategories}
            productRef={productRef}
            withFilter
          />
        )}
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(Products)

// ####
// #### External Props
// ####

export async function getStaticProps(context: GetStaticPropsContext) {
  const { client, ssrCache } = urql()

  const { data: productCatData } = await client
    .query<GetProductCategoriesQuery>(GetProductCategoriesDocument)
    .toPromise()

  const rootCategories =
    productCatData?.productCategories?.nodes &&
    productCatData.productCategories.nodes.filter(productCategory => {
      if (!productCategory?.ancestors) {
        return true
      } else {
        return false
      }
    })

  const categorySlugs = rootCategories
    ? rootCategories
        .map(category => category?.slug)
        .filter(category => {
          if (typeof category === "string") {
            return true
          } else return false
        })
    : []

  const field = "MENU_ORDER" as ProductsOrderByEnum
  const order = "ASC" as OrderEnum

  const { data: productData } = await client
    .query<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>(
      GetProductsByCategoryDocument,
      { field, order, categories: categorySlugs as string[] },
    )
    .toPromise()

  const staticProps = {
    props: {
      categories:
        (rootCategories as ProductCategory[] | null | undefined) || null,
      products:
        (productData?.products?.nodes as Product[] | null | undefined) || null,
      urqlState: ssrCache.extractData(),
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  return staticProps
}
