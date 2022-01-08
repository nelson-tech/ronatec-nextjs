import { Product } from "@api/gql/types"

export const getProductLink = (product: Product) => {
  let categories: string[] = []

  if (product.productCategories?.nodes) {
    product.productCategories.nodes.map(category => {
      if (category?.ancestors?.nodes) {
        category.ancestors.nodes.map(parent => {
          parent?.slug && categories.push(parent.slug)
        })
      }
      category?.slug && categories.push(category.slug)
    })
  }
  const linkUrl: string = `products/${categories.join("/")}/${product.slug}`

  return linkUrl
}
