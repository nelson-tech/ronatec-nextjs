import { Metadata } from "next/types"

import { SEO_TITLE } from "@utils/constants"
import parseMetaData from "@utils/parseMetaData"
import getCategoryBySlug from "./used.category.load"
import getPayloadClient from "~payload/payloadClient"
import type { Meta } from "~payload-types"
import ShopLayout from "../../products/ShopLayout"

// ####
// #### Types
// ####

type CategoryPageParamsType = { params: { category: string } }

// ####
// #### Component
// ####

const CategoryPage = async ({ params }: CategoryPageParamsType) => {
  const { category, childCategories, productsData } = await getCategoryBySlug(
    params.category
  )

  return (
    <ShopLayout
      category={category}
      productsData={productsData}
      subCategories={childCategories}
      used
    />
  )
}

export default CategoryPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateStaticParams() {
  const client = await getPayloadClient()
  const data = await client.find({
    collection: "categories",
    where: {
      and: [
        {
          and: [
            { productCount: { greater_than: 0 } },
            { usedProductCount: { greater_than: 0 } },
          ],
        },
        { _status: { equals: "published" } },
      ],
    },
    limit: 999,
  })

  return (
    data.docs.map((category) => ({
      category: category.slug ?? "",
    })) ?? []
  )
}

export async function generateMetadata({
  params,
}: CategoryPageParamsType): Promise<Metadata> {
  const { category } = await getCategoryBySlug(params.category)

  const seo: Meta = {
    title: `${category?.title} ${SEO_TITLE}`,
    description: `${category?.description?.slice(0, 155)}...`,
    // focusKeywords: [category?.name ?? "ronatec"],
    // openGraph: { ...category?.seo?.openGraph },
  }

  const metaData = parseMetaData(seo)

  return metaData
}
