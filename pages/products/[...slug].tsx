import { getGeneralPageData } from "@api/queries/pages"
import { getProductCategories } from "@api/queries/pages/products"
import { getProductDataFromSlug } from "@api/queries/pages/products"
import {
  ProductCategoriesReturnType,
  ProductReturnType,
} from "@api/queries/types"
import { normalize } from "@api/utils"
import { DefaultProduct } from "@components"
import { addApolloState, initializeApollo, menuItemsVar } from "@lib/apollo"
import { parseNewLines } from "@lib/utils"
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"

const SKUProduct = ({
  product,
  menuItems,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  menuItems && menuItemsVar(menuItems)

  const router = useRouter()

  if (product) {
    return <DefaultProduct product={product} />
  }
  if (typeof window !== "undefined") {
    router.push("/products")
  }
  return <>Category</>
}

export default SKUProduct

interface IParams extends ParsedUrlQuery {
  slug: string[]
  sku: string
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { slug, sku } = context.params as IParams
  const skuId = slug[slug.length - 1]

  const client = initializeApollo({})

  const { data, loading, error }: ProductReturnType = await client.query({
    query: getProductDataFromSlug,
    variables: {
      id: skuId,
    },
    errorPolicy: "all",
  })

  const product = data && data.product ? data.product : null

  let categories = slug.slice(0, slug.length - 1)

  const {
    data: { menu },
    loading: menuLoading,
    error: menuError,
  } = await client.query({
    query: getGeneralPageData,
  })

  const menuItems = normalize.menu(menu)

  const staticProps = {
    props: { menuItems, product, categories },
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
  }: ProductCategoriesReturnType = await client.query({
    query: getProductCategories,
  })
  type Path = {
    params: IParams
  }
  const paths = products
    .map(product => {
      if (product.slug) {
        let slugs = []

        if (product.productCategories?.nodes) {
          product.productCategories.nodes.map(category => {
            if (category?.ancestors?.nodes) {
              category.ancestors.nodes.map(parent => {
                parent?.slug && slugs.push(parent.slug)
              })
            }
            category?.slug && slugs.push(category.slug)
          })
        }

        slugs.push(product.slug)

        return { params: { slug: slugs, sku: product.sku || "" } }
      }
    })
    .filter((path): path is Path => !!path)

  return {
    paths,
    fallback: true,
  }
}
