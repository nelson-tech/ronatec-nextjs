import { ProductCategory, RankMathProductTypeSeo } from "@api/codegen/graphql"
import getCategoryBySlug from "@lib/server/getCategoryBySlug"

import Breadcrumbs from "@components/Breadcrumbs"
import CategoryInfoComponent from "@components/Pages/CategoryInfo"
import parseMetaData from "@lib/utils/parseMetaData"

// ####
// #### Component
// ####

const CategoryInfoPage = async ({
  params,
}: {
  params: { category: string }
}) => {
  const category = await getCategoryBySlug(params.category)

  const content = category?.product_category?.acf?.description

  return (
    <>
      {category ? (
        <>
          <Breadcrumbs category={category as ProductCategory} info />
          <CategoryInfoComponent content={content} />
        </>
      ) : (
        <>
          <div className=" mx-auto lg:max-w-7xl">No category found.</div>
        </>
      )}
    </>
  )
}

export default CategoryInfoPage

export const revalidate = 60 // revalidate this page every 60 seconds

// @ts-ignore
export async function generateMetadata({ params }: ProductPageParamsType) {
  const category = await getCategoryBySlug(params.slug)

  const metaData = parseMetaData(
    category?.seo as RankMathProductTypeSeo,
    category?.name ? `${category.name} Info` : undefined,
  )

  return metaData
}
