import { SEO_TITLE } from "@utils/constants"
import ShopLayout from "./ShopLayout"
import getShopData from "./products.load"

// ####
// #### Component
// ####

const ProductsPage = async () => {
  const { categories, productsData } = await getShopData()

  return <ShopLayout subCategories={categories} productsData={productsData} />
}

export default ProductsPage

export const revalidate = 60 // revalidate this page every 60 seconds

export const metadata = {
  title: `Products ${SEO_TITLE}`,
  description: "Browse our products!",
  keywords: ["Products", "Shop", "Ronatec", "Metal Finishing"],
}
