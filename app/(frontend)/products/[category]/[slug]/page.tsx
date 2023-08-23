import type { Metadata } from "next"

import parseMetaData from "@utils/parseMetaData"
import getProductBySlug from "./products.category.slug.loader"
import getPayloadClient from "~payload/payloadClient"
import type { Category } from "payload/generated-types"

import Link from "@components/Link"

import Breadcrumbs from "../../Breadcrumbs"
import ProductDetails from "./ProductDetails"
import { SEO_TITLE } from "@utils/constants"

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
  const { product, breadcrumbs } = await getProductBySlug(params.slug)
  return (
    <div>
      {product ? (
        <>
          {breadcrumbs && (
            <Breadcrumbs breadcrumbs={breadcrumbs} product={product} />
          )}
          <ProductDetails product={product} />
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
  const client = await getPayloadClient()
  const productsData = await client.find({
    collection: "products",
    sort: "purchased",
    limit: 100,
  })

  return (
    productsData.docs.map((product) => ({
      slug: product?.slug ?? "",
      category:
        typeof product?.categories?.at(0) === "object"
          ? (product?.categories?.at(0) as Category).slug ?? ""
          : "",
    })) ?? []
  )
}

export async function generateMetadata({
  params,
}: ProductPageParamsType): Promise<Metadata> {
  const { product } = await getProductBySlug(params.slug)

  const metaData = parseMetaData(product?.meta)

  !metaData.title &&
    (metaData.title = `${product?.title ?? "Product Details"} ${SEO_TITLE}`)

  return metaData
}
