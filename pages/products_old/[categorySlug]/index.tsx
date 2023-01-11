import { useRef, useState } from "react"
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import { shallow } from "zustand/shallow"
import { ParsedUrlQuery } from "querystring"

import useStore from "@lib/hooks/useStore"
import { SortOptionType } from "@lib/store/slices/shop"
import { defaultPagination, PaginationType } from "@lib/pagination"
import urql from "@api/urql/serverClient"
import withUrql from "@api/urql/hoc"
import {
  GetCategoryFromSlugDocument,
  GetCategoryFromSlugQuery,
  GetCategoryFromSlugQueryVariables,
  GetCategorySlugsDocument,
  GetCategorySlugsQuery,
  GetProductsByCategoryDocument,
  GetProductsByCategoryQuery,
  GetProductsByCategoryQueryVariables,
  InputMaybe,
  OrderEnum,
  Product,
  ProductCategory,
  ProductsOrderByEnum,
  useGetProductsByCategoryQuery,
} from "@api/codegen/graphql"

import Layout from "@components/ui/Layout"
import Breadcrumbs from "@components/Breadcrumbs"
import PageTitle from "@components/PageTitle"
import CategorySummary from "@components/CategorySummary"
import ProductGrid from "@components/ProductGrid"
import Sort from "@components/Sort"
import Pagination from "@components/Pagination"

// ####
// #### Component
// ####

const CategoryPage = ({
  category,
  categorySlug,
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
    categories: [categorySlug],
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
          title={category?.name || "Category"}
          description={
            category?.description || "List of products for a given category."
          }
          banner={false}
        />

        {category && (
          <>
            <Breadcrumbs category={category} />
            <CategorySummary category={category} productRef={productRef} />
            <Sort
              setSelectedSort={setSelectedSort}
              loading={productsFetching}
              categories={[category]}
              filter
              productRef={productRef}
              selectedCategories={queryVars.categories}
              setSelectedCategories={setSelectedCategories}
            />
          </>
        )}

        {productsData?.products?.nodes &&
        (queryVars.categories ? queryVars.categories.length > 0 : true) ? (
          <>
            <ProductGrid products={productsData.products.nodes as Product[]} />

            {productsData?.products?.pageInfo && (
              <Pagination
                productRef={productRef}
                setPagination={setPagination}
                pageInfo={productsData.products.pageInfo}
              />
            )}
          </>
        ) : (
          <>
            <div className="max-w-7xl p-8 mx-auto">No category found.</div>
          </>
        )}
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(CategoryPage)

interface IParams extends ParsedUrlQuery {
  categorySlug: string
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { categorySlug } = context.params as IParams

  const { client, ssrCache } = urql()

  const { data: categoryData, error: categoryError } = await client
    .query<GetCategoryFromSlugQuery, GetCategoryFromSlugQueryVariables>(
      GetCategoryFromSlugDocument,
      {
        id: categorySlug,
      },
    )
    .toPromise()

  categoryError && console.warn("Error fetching category data.", categoryError)

  await client
    .query<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>(
      GetProductsByCategoryDocument,
      {
        field: ProductsOrderByEnum.MenuOrder,
        order: OrderEnum.Asc,
        categories: [categorySlug],
        ...defaultPagination,
      },
    )
    .toPromise()

  const staticProps = {
    props: {
      category:
        (categoryData?.productCategory as ProductCategory | null | undefined) ||
        null,
      categorySlug,
      urqlState: ssrCache.extractData(),
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  return staticProps
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { client } = urql()

  const { data } = await client
    .query<GetCategorySlugsQuery>(GetCategorySlugsDocument)
    .toPromise()
  type Path = {
    params: IParams
  }
  let paths: Path[] = []
  data?.productCategories?.nodes &&
    data.productCategories.nodes.map(category => {
      category?.slug && paths.push({ params: { categorySlug: category.slug } })
    })

  return {
    paths,
    fallback: true,
  }
}
