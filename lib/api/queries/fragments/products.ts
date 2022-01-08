import { imageFragment } from "."

export const productBaseFragment = `
name
type
slug
metaData(keysIn: "_product_addons") {
  key
  value
}
price
salePrice
onSale
dateOnSaleFrom
dateOnSaleTo
description
shortDescription
productCategories {
  nodes {
    name
    slug 
    ancestors {
      nodes {
        name
        slug
      }
    }
  }
}
${imageFragment}
`

export const variationBaseFragment = `
sku
description
price
salePrice
onSale
dateOnSaleFrom
dateOnSaleTo
${imageFragment}
`

export const variationsFragment = `
variations {
  nodes {
    ${variationBaseFragment}
  }
}`

export const variableProductFragment = `
... on VariableProduct {
  ${productBaseFragment}
  ${variationsFragment}
}
`

export const featuredProductsFragment = ``
