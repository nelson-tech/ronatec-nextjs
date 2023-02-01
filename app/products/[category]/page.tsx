import type {
  Product,
  ProductCategory as ProductCategoryType,
} from "@api/codegen/graphql"

import useCategoryBySlug from "@lib/serverCalls/useCategoryBySlug"
import ProductCategory from "@components/Products/Category"

// ####
// #### Component
// ####

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const { category, initialProducts } = await useCategoryBySlug(params.category)

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
