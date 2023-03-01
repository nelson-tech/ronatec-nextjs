import getCategories from "@lib/server/getCategories"
import getFilteredProducts from "@lib/server/getFilteredProducts"
import type { FullProduct } from "@lib/types/products"

import ProductCategory from "@components/ProductCategory"

// ####
// #### Component
// ####

const ProductsPage = async () => {
  const data = await getCategories()

  const categories = data?.categories
  const categorySlugs = data?.categorySlugs
  const initialProducts = categorySlugs
    ? await getFilteredProducts({
        categories: categorySlugs,
      })
    : { nodes: [] }

  return (
    <>
      {categories && categories.length > 0 && (
        <ProductCategory
          isCategories
          categories={categories}
          categorySlugs={categorySlugs}
          initialProducts={
            initialProducts?.nodes as FullProduct[] | null | undefined
          }
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
