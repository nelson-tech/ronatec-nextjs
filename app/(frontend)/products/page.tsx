import CategoryLayout from "./Categories"
import getShopData from "./products.load"

// ####
// #### Component
// ####

const ProductsPage = async () => {
  const { categories, productsData } = await getShopData()

  return (
    <CategoryLayout
      categories={categories}
      productsData={productsData}
      isCategories={true}
    />
  )
}

export default ProductsPage

export const revalidate = 60 // revalidate this page every 60 seconds

export const metadata = {
  title: "Products",
  description: "Browse our products!",
  keywords: ["Products", "Shop", "Ronatec", "Metal Finishing"],
}
