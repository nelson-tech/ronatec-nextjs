import { imageFragment } from "."

export const productMinBaseFragment = `
id
name
slug
type
`

export const productBaseFragment = `
${productMinBaseFragment}
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

export const productCategoryFragment = `
name
slug
id
count
description
product_category {
  acf {
    description
  }
}
`

export const featuredProductsFragment = ``
