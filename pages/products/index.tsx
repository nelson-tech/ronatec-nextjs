import { useRef, useState } from "react"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import shallow from "zustand/shallow"

import useStore from "@lib/hooks/useStore"
import {
  OrderEnum,
  ProductsOrderByEnum,
  SortOptionType,
} from "@lib/store/slices/shop"
import { defaultPagination, PaginationType } from "@lib/pagination"
import urql from "@api/urql/serverClient"
import withUrql from "@api/urql/hoc"
import {
  GetProductCategoriesDocument,
  GetProductCategoriesQuery,
  GetProductsByCategoryDocument,
  GetProductsByCategoryQuery,
  GetProductsByCategoryQueryVariables,
  InputMaybe,
  Product,
  ProductCategory,
  useGetProductsByCategoryQuery,
} from "@api/gql/types"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"
import Image from "@components/Image"
import ProductGrid from "@components/ProductGrid"
import Link from "@components/Link"
import Pagination from "@components/Pagination"
import Sort from "@components/Sort"

// ####
// #### Component
// ####

const Products = ({
  categories,
  categorySlugs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const productRef = useRef<HTMLDivElement>(null)

  const { selectedSort, setGlobalSort } = useStore(
    state => ({
      selectedSort: state.shop.selectedSort,
      setGlobalSort: state.shop.setGlobalSort,
    }),
    shallow,
  )

  const defaultQuery: GetProductsByCategoryQueryVariables = {
    field: selectedSort.id.field,
    order: selectedSort.id.order,
    categories: categorySlugs,
    ...defaultPagination,
  }

  const [queryVars, setQueryVars] = useState(defaultQuery)

  // Products Query
  const [
    { data: productsData, error: productsError, fetching: productsFetching },
  ] = useGetProductsByCategoryQuery({
    variables: queryVars,
  })

  const setPagination = (pagination: PaginationType) => {
    setQueryVars({ ...queryVars, ...pagination })
  }

  const setSelectedCategories = (
    categories: InputMaybe<string> | InputMaybe<string>[],
  ) => {
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

  productsError && console.warn("ERROR", productsError)

  return (
    <>
      <Layout>
        <PageTitle
          title="Products"
          description="Main shopping page."
          banner={false}
        />

        {categories && categories.length > 0 && (
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

        {categories && (
          <Sort
            setSelectedSort={setSelectedSort}
            loading={productsFetching}
            categories={categories}
            filter
            productRef={productRef}
            selectedCategories={queryVars.categories}
            setSelectedCategories={setSelectedCategories}
          />
        )}

        {productsData?.products?.nodes &&
          (queryVars.categories ? queryVars.categories.length > 0 : true) && (
            <>
              <ProductGrid
                products={productsData.products.nodes as Product[]}
              />

              {productsData?.products?.pageInfo && (
                <Pagination
                  productRef={productRef}
                  setPagination={setPagination}
                  pageInfo={productsData.products.pageInfo}
                />
              )}
            </>
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

  const getSlugs = (categories: ProductCategory[]) => {
    return categories
      .map(category => category?.slug)
      .filter(category => {
        if (typeof category === "string") {
          return true
        } else return false
      }) as string[]
  }

  const categorySlugs = rootCategories
    ? getSlugs(rootCategories as ProductCategory[])
    : []

  await client
    .query<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>(
      GetProductsByCategoryDocument,
      {
        field: ProductsOrderByEnum.MenuOrder,
        order: OrderEnum.Asc,
        categories: categorySlugs,
        ...defaultPagination,
      },
    )
    .toPromise()

  const staticProps = {
    props: {
      categories:
        (rootCategories as ProductCategory[] | null | undefined) || null,
      categorySlugs,
      urqlState: ssrCache.extractData(),
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  return staticProps
}
