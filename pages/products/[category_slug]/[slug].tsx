import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import dynamic from "next/dynamic"
import { ParsedUrlQuery } from "querystring"

import { addApolloState, initializeApollo } from "@lib/apollo"
import { useMainMenu } from "@lib/hooks"
import { AttributeType, FullProduct } from "@lib/types"
import { normalizeMenu } from "@api/utils/normalize/menu"
import { getGeneralPageData } from "@api/queries/pages"
import {
  getCategoryFromSlug,
  getProductDataFromSlug,
  getProductsWithCategories,
} from "@api/queries/pages/products"
import { ProductVariation } from "@api/gql/types"
import {
  ProductsReturnType,
  ProductReturnType,
  CategoryReturnType,
} from "@api/queries/types"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const Breadcrumbs = dynamic(() => import("@components/Breadcrumbs"), importOpts)
const DefaultProduct = dynamic(() => import("@components/Products"), importOpts)

// ####
// #### Types
// ####

interface IParams extends ParsedUrlQuery {
  slug: string
  category_slug: string
}

// ####
// #### Component
// ####

const SKUProduct = ({
  product,
  attributes,
  menuItems,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)

  if (product) {
    return (
      <div>
        <Breadcrumbs category={category} product />
        <DefaultProduct product={product} attributes={attributes} />
      </div>
    )
  }

  return <>Category</>
}

export default SKUProduct

// ####
// #### External Props
// ####

export async function getStaticProps(context: GetStaticPropsContext) {
  const { slug, category_slug } = context.params as IParams

  const client = initializeApollo({})

  const { data, loading, error }: ProductReturnType = await client.query({
    query: getProductDataFromSlug,
    variables: {
      id: slug,
    },
    errorPolicy: "all",
  })

  const product = data && data.product ? (data.product as FullProduct) : null

  const {
    data: { productCategory: category },
  }: CategoryReturnType = await client.query({
    query: getCategoryFromSlug,
    variables: {
      id: category_slug,
    },
    errorPolicy: "all",
  })

  const {
    data: { menu },
    loading: menuLoading,
    error: menuError,
  } = await client.query({
    query: getGeneralPageData,
  })

  const menuItems = normalizeMenu(menu)

  const getAttributes = (product: FullProduct) => {
    let allAttributes: AttributeType[] = []

    product.variations?.nodes &&
      product.variations.nodes.map(variation => {
        if (variation) {
          const { attributes } = variation as ProductVariation
          attributes?.nodes &&
            attributes.nodes.map(attribute => {
              if (attribute && attribute.name) {
                if (!allAttributes.some(a => a.name === attribute.label)) {
                  allAttributes.push({
                    name: attribute.label,
                    variations: [variation],
                    id: attribute.id,
                  })
                } else {
                  const attIndex = allAttributes.findIndex(
                    a => a.name === attribute.label,
                  )
                  allAttributes[attIndex].variations.push(variation)
                }
              }
            })
        }
      })

    return allAttributes
  }

  const attributes = product ? getAttributes(product) : null

  const staticProps = {
    props: { menuItems, product, attributes, category },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  addApolloState(client, staticProps)

  return staticProps
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo({})
  const {
    data: {
      products: { nodes: products },
    },
    loading,
    error,
  }: ProductsReturnType = await client.query({
    query: getProductsWithCategories,
  })
  type Path = {
    params: IParams
  }
  const paths: Path[] = []

  products.map(product => {
    if (product.slug) {
      if (product.productCategories?.nodes) {
        product.productCategories.nodes.map(category => {
          if (category && category.slug) {
            const path = {
              params: { slug: product.slug!, category_slug: category.slug },
            }
            paths.push(path)
          }
        })
      }
    }
  })

  return {
    paths,
    fallback: true,
  }
}
