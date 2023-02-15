import type {
  GetProductCategoriesSlugsQuery,
  Product,
  ProductCategory as ProductCategoryType,
  RankMathProductTypeSeo,
} from "@api/codegen/graphql"

import ProductCategory from "@components/Products/Category"
import getCachedQuery from "@lib/server/getCachedQuery"
import getCategoryBySlug from "@lib/server/getCategoryBySlug"
import parseMetaData from "@lib/utils/parseMetaData"
import getProductsByCategory from "@lib/server/getProductsByCategory"

// ####
// #### Component
// ####

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const categoryPromise = getCategoryBySlug(params.category)
  const productsPromise = getProductsByCategory(params.category)

  const [category, initialProducts] = await Promise.all([
    categoryPromise,
    productsPromise,
  ])

  return (
    <>
      {category && (
        <ProductCategory
          category={category as ProductCategoryType}
          initialProducts={initialProducts as Product[]}
        />
      )}
    </>
  )
}

export default CategoryPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateStaticParams() {
  const { data } = await getCachedQuery<GetProductCategoriesSlugsQuery>(
    "getProductCategoriesSlugs",
  )

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
