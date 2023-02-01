import Breadcrumbs from "@components/Breadcrumbs"
import CategoryInfoComponent from "@components/Pages/CategoryInfo"
import useCategoryBySlug from "@lib/serverCalls/useCategoryBySlug"
import { ProductCategory } from "@api/codegen/graphql"

// ####
// #### Component
// ####

const CategoryInfoPage = async ({
  params,
}: {
  params: { category: string }
}) => {
  const { category } = await useCategoryBySlug(params.category)

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
