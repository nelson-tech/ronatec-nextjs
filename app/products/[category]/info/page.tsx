import { ParsedUrlQuery } from "querystring"

import Breadcrumbs from "@components/Breadcrumbs"
import CategoryInfoComponent from "@components/Pages/CategoryInfo"
import getCategoryBySlug from "@api/server/getCategoryBySlug"
import { ProductCategory } from "@api/codegen/graphql"

// ####
// #### Component
// ####

const CategoryInfoPage = async ({
  params,
}: {
  params: { category: string }
}) => {
  const { category } = await getCategoryBySlug(params.category)

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
