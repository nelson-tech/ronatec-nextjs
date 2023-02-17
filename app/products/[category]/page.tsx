import getClient from "@api/client"
import {
  GetProductCategoriesSlugsDocument,
  Product,
  ProductCategory as ProductCategoryType,
  RankMathProductTypeSeo,
} from "@api/codegen/graphql"

import ProductCategory from "@components/Products/Category"
import getCategoryBySlug from "@lib/server/getCategoryBySlug"
import getFilteredProducts from "@lib/server/getFilteredProducts"
import parseMetaData from "@lib/utils/parseMetaData"

// ####
// #### Component
// ####

const CategoryPage = async ({ params }: { params: { category: string } }) => {
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
    data?.productCategories?.nodes?.map(category => ({
      category: category.slug ?? "",
    })) ?? []
  )
}

// @ts-ignore
export async function generateMetadata({ params }: ProductPageParamsType) {
  const category = await getCategoryBySlug(params.slug)

  const metaData = parseMetaData(
    category?.seo as RankMathProductTypeSeo,
    category?.name ? category.name : undefined,
  )

  return metaData
}
