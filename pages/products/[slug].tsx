import { Layout } from "@components/common"
import { getCommerceConfig } from "@ecommerce/api/config"
import { getAllProductPaths, getProduct } from "@ecommerce/product"
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"

// Get slugs
export const getStaticPaths: GetStaticPaths = async () => {
  const config = getCommerceConfig()
  const { products } = await getAllProductPaths(config)
  return {
    paths: products.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

// Get product data
export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string; name: string }>) => {
  const config = getCommerceConfig()
  const { product } = await getProduct({
    config,
    variables: { slug: params?.slug },
  })

  return {
    props: {
      product,
    },
  }
}

export default function ProductDetail({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>{JSON.stringify(product, null, 2)}</div>
}

ProductDetail.Layout = Layout
