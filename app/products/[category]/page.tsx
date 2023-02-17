import { Metadata } from "next/types"

import getClient from "@api/client"
import { GetProductCategoriesSlugsDocument } from "@api/codegen/graphql"
import type {
  Product,
  ProductCategory as ProductCategoryType,
  RankMathProductTypeSeo,
} from "@api/codegen/graphql"
import getCategoryBySlug from "@lib/server/getCategoryBySlug"
import getFilteredProducts from "@lib/server/getFilteredProducts"
import parseMetaData from "@lib/utils/parseMetaData"

import ProductCategory from "@components/Products/Category"

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
          category={category as ProductCategoryType}
          initialProducts={initialProducts?.nodes as Product[]}
        />
      )}
    </>
  )
}

export default CategoryPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateStaticParams() {
  const client = getClient()

  const data = await client.request(GetProductCategoriesSlugsDocument)

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

  const metaData = parseMetaData(category?.seo as RankMathProductTypeSeo)

  return metaData
}
