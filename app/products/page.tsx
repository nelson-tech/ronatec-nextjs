import {
  GetProductCategoriesDocument,
  GetProductsByCategoryQueryVariables,
  InputMaybe,
  Product,
  ProductCategory,
} from "@api/codegen/graphql"

import Image from "@components/Image"
import ProductGrid from "@components/ProductGrid"
import Link from "@components/Link"
import Pagination from "@components/Pagination"
import Sort from "@components/Sort"
import useClient from "@api/client"
import Products from "@components/Products"

// ####
// #### Server Calls
// ####

const getCategories = async () => {
  const client = useClient()

  const categoryData = await client.request(GetProductCategoriesDocument)

  const rootCategories =
    categoryData.productCategories?.nodes &&
    (categoryData.productCategories.nodes.filter(productCategory => {
      if (!productCategory?.ancestors) {
        return true
      } else {
        return false
      }
    }) as ProductCategory[])

  const getSlugs = (categories: ProductCategory[]) => {
    return categories
      .map(category => category?.slug)
      .filter(category => {
        if (typeof category === "string") {
          return true
        } else return false
      }) as string[]
  }

  const categorySlugs = rootCategories
    ? getSlugs(rootCategories as ProductCategory[])
    : []

  return { categories: rootCategories, categorySlugs }
}

// ####
// #### Component
// ####

const ProductsPage = async () => {
  const { categories, categorySlugs } = await getCategories()

  return (
    <>
      {categories && categories.length > 0 && (
        <Products categories={categories} categorySlugs={categorySlugs} />
      )}
    </>
  )
}

export default ProductsPage
