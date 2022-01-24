import { imageFragment } from "."
import { imageBaseFragment } from "./common"

export const productMinBaseFragment = `
id
databaseId
name
slug
type
`

const priceFragment = `
price
salePrice
onSale
`

export const productBaseFragment = `
${productMinBaseFragment}
metaData(keysIn: "_product_addons") {
  key
  value
}
${priceFragment}
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
galleryImages {
  nodes {
    ${imageBaseFragment}
  }
}
`

export const productPriceFragment = `
... on SimpleProduct {
  ${priceFragment}
}
... on VariableProduct {
  ${priceFragment}
}
`

export const simpleProductFragment = `
... on SimpleProduct {
  ${productBaseFragment}
}
`

export const attributeBaseFragment = `
id
attributeId
name
label
`

export const attributesFragment = `
attributes {
  nodes {
    ${attributeBaseFragment}
  }
}
`

export const variationBaseFragment = `
sku
id
databaseId
description
name
price
salePrice
onSale
dateOnSaleFrom
dateOnSaleTo
${imageFragment}
${attributesFragment}
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
  ${attributesFragment}
}
`

export const productCategoryFragment = `
name
slug
id
count
description
${imageFragment}
product_category {
  acf {
    description
  }
}
`

export const featuredProductsFragment = ``

export const cartBaseFragment = `
contentsTotal
isEmpty
subtotal
total
contents {
  itemCount
  productCount
  nodes {
    quantity
    subtotal
    total
    variation {
      attributes {
        ${attributeBaseFragment}
        value
      }
    }
    key
    product {
      node {
        ${productMinBaseFragment}
        ${imageFragment}
        productCategories {
          nodes {
            slug
          }
        }
      }
     
    }
  }
}
`
