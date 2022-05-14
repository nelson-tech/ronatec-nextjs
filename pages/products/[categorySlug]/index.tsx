import { useEffect, useRef, useState } from "react"
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import { ParsedUrlQuery } from "querystring"

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
  OrderEnum,
  Product,
  ProductCategory,
  ProductsOrderByEnum,
  useGetProductsByCategoryQuery,
} from "@api/gql/types"
import { sortOptions } from "@lib/store/slices/ui"

import Layout from "@components/ui/Layout"
import Breadcrumbs from "@components/Breadcrumbs"
import PageTitle from "@components/PageTitle"
import Summary from "@components/Category/Summary"
import ProductGrid from "@components/Category/ProductGrid"
import useStore from "@lib/hooks/useStore"

// ####
// #### Dynamic Imports
// ####

const clientOpts = {}

// const Sort = dynamic(() => import("@components/Sort"), clientOpts)

// ####
// #### Component
// ####

const CategoryPage = ({
  category,
  products: initialProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const selectedSort = useStore(state => state.ui.selectedSort)

  const defaultFilteredCategories = category?.slug ? [category.slug] : []

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

        {category && products ? (
          <>
            <Breadcrumbs category={category} />
            <Summary category={category} productRef={productRef} />

            <ProductGrid
              products={products}
              productRef={productRef}
              loading={productsFetching}
              categories={[category]}
              filteredCategories={filteredCategories}
              setFilteredCategories={setFilteredCategories}
            />
          </>
        ) : (
          <>
            <div>No category found.</div>
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

  const { data: productsData, error: productsError } = await client
    .query<GetProductsByCategoryQuery>(GetProductsByCategoryDocument, {
      field: sortOptions[0].id.field,
      order: sortOptions[0].id.order,
      categories: [categorySlug],
    })
    .toPromise()

  productsError && console.warn("Error fetching products data.", productsError)

  const staticProps = {
    props: {
      category:
        (categoryData?.productCategory as ProductCategory | null | undefined) ||
        null,
      products:
        (productsData?.products?.nodes as Product[] | null | undefined) || null,
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
