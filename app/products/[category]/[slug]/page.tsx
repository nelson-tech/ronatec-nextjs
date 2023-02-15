import {
  GetProductsSlugsQuery,
  RankMathProductTypeSeo,
} from "@api/codegen/graphql"
import getProductBySlug from "@lib/server/getProductBySlug"
import getCategoryBySlug from "@lib/server/getCategoryBySlug"
import getCachedQuery from "@lib/server/getCachedQuery"
import parseMetaData from "@lib/utils/parseMetaData"

import Link from "@components/Link"
import ProductBySku from "@components/Pages/ProductBySku"

const messages = {
  seo: { title: "Product", description: "No product found." },
  productMissing: {
    title: "No product found.",
    buttonText: "Visit our shop",
  },
}

// ####
// #### Component
// ####

const ProductPage = async ({
  params,
}: {
  params: { category: string; slug: string }
}) => {
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
              className="mt-8 py-4 px-6 rounded-md bg-blue-main hover:bg-green-main text-white transition"
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
  const { data } = await getCachedQuery<GetProductsSlugsQuery>(
    "getProductsSlugs",
  )

  return (
    data?.products?.nodes?.map(product => ({
      slug: product.slug ?? "",
      category: product.productCategories?.nodes[0]?.slug ?? "",
    })) ?? []
  )
}

// @ts-ignore
export async function generateMetadata({ params }: ProductPageParamsType) {
  const product = await getProductBySlug(params.slug)

  const metaData = parseMetaData(
    product?.seo as RankMathProductTypeSeo,
    product?.title ? product.title : undefined,
  )

  return metaData
}
