import type { Metadata } from "next"

import { GetProductsSlugsQuery } from "@api/codegen/graphql"
import type { RankMathProductTypeSeo } from "@api/codegen/graphql"
import getCachedQuery from "@lib/server/getCachedQuery"
import getProductBySlug from "@lib/server/getProductBySlug"
import getCategoryBySlug from "@lib/server/getCategoryBySlug"
import parseMetaData from "@lib/utils/parseMetaData"

import Link from "@components/Link"
import ProductBySku from "@components/Pages/ProductBySku"

// ####
// #### Variables
// ####

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

type ProductPageParamsType = {
  params: { category: string; slug: string }
}

// ####
// #### Component
// ####

const ProductPage = async ({ params }: ProductPageParamsType) => {
  const productPromise = getProductBySlug(params.slug)
  const categoryPromise = getCategoryBySlug(params.category)

  const [product, category] = await Promise.all([
    productPromise,
    categoryPromise,
  ])

  return (
    <div>
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
              className="mt-8 py-4 px-6 rounded bg-accent hover:bg-highlight text-white transition-colors"
            >
              {messages.productMissing.buttonText}
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateStaticParams() {
  const { data } = await getCachedQuery<GetProductsSlugsQuery>("getHomeData")

  return (
    data?.products?.nodes?.map((product) => ({
      slug: product.slug ?? "",
      category: product.productCategories?.nodes[0]?.slug ?? "",
    })) ?? []
  )
}

export async function generateMetadata({
  params,
}: ProductPageParamsType): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)

  const metaData = parseMetaData(product?.seo as RankMathProductTypeSeo)

  return metaData
}
