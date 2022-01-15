import { imageFragment } from "."

export const productMinBaseFragment = `
id
databaseId
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

const priceFragment = `
price
salePrice
onSale
`

export const productPriceFragment = `
... on SimpleProduct {
  ${priceFragment}
}
... on VariableProduct {
  ${priceFragment}
}
`

export const attributeBaseFragment = `
id
attributeId
name
label
value
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
