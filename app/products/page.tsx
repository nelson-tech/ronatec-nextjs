import { Product } from "@api/codegen/graphql"

import Products from "@components/Products"
import getCategories from "@lib/server/getCategories"
import getFilteredProducts from "@lib/server/getFilteredProducts"

// ####
// #### Component
// ####

const ProductsPage = async () => {
  const { categories, categorySlugs } = await getCategories()
  const initialProducts = await getFilteredProducts({
    categories: categorySlugs,
  })

  return (
    <>
      {categories && categories.length > 0 && (
        <Products
          categories={categories}
          categorySlugs={categorySlugs}
          initialProducts={initialProducts?.nodes as Product[]}
        />
      )}
    </>
  )
}

export default ProductsPage

export const revalidate = 60 // revalidate this page every 60 seconds

export const metadata = {
  title: "Products",
  description: "Browse our products!",
  keywords: ["Products", "Shop", "Ronatec", "Metal Finishing"],
}
