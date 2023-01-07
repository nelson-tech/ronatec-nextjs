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
} from "@api/codegen/graphql"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"
import ProductBySku from "@components/Pages/ProductBySku"
import Link from "@components/Link"

const messages = {
  seo: { title: "Product", description: "No product found." },
  productMissing: {
    title: "No product found.",
    buttonText: "Visit our shop",
  },
}

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

const SKUProduct = ({
  product,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Layout>
        <PageTitle
          title={product?.name || messages.seo.title}
          description={product?.shortDescription || messages.seo.description}
          banner={false}
        />
        {product && category ? (
          <>
            <ProductBySku product={product} category={category} />
          </>
        ) : (
          <>
            <div className="h-screen -mt-20 justify-center items-center flex flex-col mx-auto text-lg lg:text-xl text-blue-dark">
              <div>{messages.productMissing.title}</div>

              <Link
                href="/products"
                title={messages.productMissing.buttonText}
                className="mt-8 py-4 px-6 rounded-md bg-blue-main hover:bg-green-main text-white transition"
              >
                {messages.productMissing.buttonText}
              </Link>
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

  productError && console.warn(productError)

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
