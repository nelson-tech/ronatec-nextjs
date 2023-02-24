import { Metadata } from "next/types"

import type {
  GetProductCategoriesSlugsQuery,
  Product,
  RankMathProductTypeSeo,
} from "@api/codegen/graphql"
import getCachedQuery from "@lib/server/getCachedQuery"
import getCategoryBySlug from "@lib/server/getCategoryBySlug"
import getFilteredProducts from "@lib/server/getFilteredProducts"
import { SEO_TITLE } from "@lib/constants"
import parseMetaData from "@lib/utils/parseMetaData"

import ProductCategory from "@components/ProductCategory"

// ####
// #### Types
// ####

type CategoryPageParamsType = { params: { category: string } }

// ####
// #### Component
// ####

const CategoryPage = async ({ params }: CategoryPageParamsType) => {
  const categoryPromise = getCategoryBySlug(params.category)
  const productsPromise = getFilteredProducts({ categories: [params.category] })

  const [category, initialProducts] = await Promise.all([
    categoryPromise,
    productsPromise,
  ])

  return (
    <>
      {category && (
        <ProductCategory
          category={category}
          initialProducts={initialProducts?.nodes as Product[]}
        />
      )}
    </>
  )
}

export default CategoryPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateStaticParams() {
  const { data } = await getCachedQuery<GetProductCategoriesSlugsQuery>(
    "getProductCategoriesSlugs"
  )

  return (
    data?.productCategories?.nodes?.map((category) => ({
      category: category.slug ?? "",
    })) ?? []
  )
}

export async function generateMetadata({
  params,
}: CategoryPageParamsType): Promise<Metadata> {
  const category = await getCategoryBySlug(params.category)

  const seo: RankMathProductTypeSeo = {
    ...category?.seo,
    title: `${category?.name} ${SEO_TITLE}`,
    description: `${category?.description?.slice(0, 155)}...`,
    focusKeywords: [category?.name ?? "ronatec"],
    openGraph: { ...category?.seo?.openGraph },
  }

  const metaData = parseMetaData(seo)

  return metaData
}
