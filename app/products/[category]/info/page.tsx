import { ProductCategory, RankMathProductTypeSeo } from "@api/codegen/graphql"
import getCategoryBySlug from "@lib/server/getCategoryBySlug"
import parseMetaData from "@lib/utils/parseMetaData"

import Breadcrumbs from "@components/Breadcrumbs"
import CategoryInfoComponent from "@components/Pages/CategoryInfo"

// ####
// #### Types
// ####

type CategoryInfoPageParamsType = {
  params: { category: string }
}

// ####
// #### Component
// ####

const CategoryInfoPage = async ({ params }: CategoryInfoPageParamsType) => {
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

export async function generateMetadata({ params }: CategoryInfoPageParamsType) {
  const category = await getCategoryBySlug(params.category)

  const metaData = parseMetaData(
    category?.seo as RankMathProductTypeSeo,
    category?.name ? `${category.name} Info` : undefined
  )

  return metaData
}
