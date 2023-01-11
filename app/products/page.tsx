import { Product } from "@api/codegen/graphql"
import getCategories from "@api/server/getCategories"
import Products from "@components/Products"

// ####
// #### Component
// ####

const ProductsPage = async () => {
  const { categories, categorySlugs, initialProducts } = await getCategories()

  return (
    <>
      {categories && categories.length > 0 && (
        <Products
          categories={categories}
          categorySlugs={categorySlugs}
          initialProducts={initialProducts as Product[]}
        />
      )}
    </>
  )
}

export default ProductsPage
