import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import { ParsedUrlQuery } from "querystring"

import { FullProduct } from "@lib/types"
import withUrql from "@api/urql/hoc"
import urql from "@api/urql/serverClient"
import {
  GetCategoryFromSlugDocument,
  GetCategoryFromSlugQuery,
  GetProductDataFromSlugDocument,
  GetProductDataFromSlugQuery,
  GetProductsWithCategoriesDocument,
  GetProductsWithCategoriesQuery,
  ProductCategory,
} from "@api/gql/types"

import Layout from "@components/ui/Layout"
import LoadingSpinner from "@components/ui/LoadingSpinner"
import PageTitle from "@components/PageTitle"
import ProductBySku from "@components/Pages/ProductBySku"

// ####
// #### Types
// ####

interface IParams extends ParsedUrlQuery {
  slug: string
  categorySlug: string
}

// ####
// #### Component
// ####

// TODO - Change loading message for error message or redirect

const SKUProduct = ({
  product,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Layout>
        <PageTitle
          title={product?.name || "Product"}
          description={
            product?.shortDescription || "Shopping page for a product."
          }
          banner={false}
        />
        {product && category ? (
          <>
            <ProductBySku product={product} category={category} />
          </>
        ) : (
          <>
            <div className="h-screen -mt-20 justify-center items-center flex flex-col mx-auto text-lg lg:text-xl text-blue-dark">
              <div>Loading Product Information...</div>

              <LoadingSpinner size={8} color="#37b679" className="mt-4" />
            </div>
          </>
        )}
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(SKUProduct)

// ####
// #### Data Fetching
// ####

export async function getStaticProps(context: GetStaticPropsContext) {
  const { slug, categorySlug } = context.params as IParams

  const { client, ssrCache } = urql()

  const { data: productData, error: productError } = await client
    .query<GetProductDataFromSlugQuery>(GetProductDataFromSlugDocument, {
      id: slug,
    })
    .toPromise()

  // TODO - Account for errors or non-existant products

  const { data: categoryData, error: categoryError } = await client
    .query<GetCategoryFromSlugQuery>(GetCategoryFromSlugDocument, {
      id: categorySlug,
    })
    .toPromise()

  const staticProps = {
    props: {
      product: (productData?.product as FullProduct | null | undefined) || null,
      category:
        (categoryData?.productCategory as ProductCategory | null | undefined) ||
        null,
      urqlState: ssrCache.extractData(),
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  return staticProps
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { client } = urql()

  const { data, error } = await client
    .query<GetProductsWithCategoriesQuery>(GetProductsWithCategoriesDocument)
    .toPromise()

  type Path = {
    params: IParams
  }

  const paths: Path[] = []

  data?.products?.nodes &&
    data.products.nodes.map(product => {
      if (product?.productCategories?.nodes) {
        product.productCategories.nodes.map(category => {
          if (product?.slug && category?.slug) {
            const path = {
              params: { slug: product.slug, categorySlug: category.slug },
            }
            paths.push(path)
          }
        })
      }
    })

  return {
    paths,
    fallback: false,
  }
}
