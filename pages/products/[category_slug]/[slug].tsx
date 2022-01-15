import { getGeneralPageData } from "@api/queries/pages"
import {
  getProductDataFromSlug,
  getProductsWithCategories,
} from "@api/queries/pages/products"
import { ProductsReturnType, ProductReturnType } from "@api/queries/types"
import { normalize } from "@api/utils"
import { DefaultProduct } from "@components"
import { addApolloState, initializeApollo, menuItemsVar } from "@lib/apollo"
import { parseNewLines } from "@lib/utils"
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
// import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"

const SKUProduct = ({
  product,
  menuItems,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  menuItems && menuItemsVar(menuItems)

  // const router = useRouter()

  if (product) {
    return <DefaultProduct product={product} />
  }
  // if (typeof window !== "undefined") {
  //   router.push("/products")
  // }
  return <>Category</>
}

export default SKUProduct

interface IParams extends ParsedUrlQuery {
  slug: string
  category_slug: string
}

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

  const product = data && data.product ? data.product : null

  const {
    data: { menu },
    loading: menuLoading,
    error: menuError,
  } = await client.query({
    query: getGeneralPageData,
  })

  const menuItems = normalize.menu(menu)

  const staticProps = {
    props: { menuItems, product, category: category_slug },
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
