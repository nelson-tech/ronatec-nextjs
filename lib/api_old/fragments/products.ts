import { gql } from "urql"

const productMinBaseFragmentGQL = gql`
  fragment ProductMinBase on Product {
    id
    databaseId
    name
    slug
    type
  }
`

const priceFragment = gql`
  fragment ProductPriceBase on VariableProduct {
    price
    salePrice
    onSale
  }
`

const productBaseFragment = gql`
  fragment ProductBase on Product {
    ...ProductMinBase
    metaData(keysIn: "_product_addons") {
      key
      value
    }
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
    image {
      ...ImageBase
    }
    galleryImages {
      nodes {
        ...ImageBase
      }
    }
  }
`

const simpleProductFragment = gql`
  fragment SimpleProductFragment on SimpleProduct {
    ... on SimpleProduct {
      ...ProductBase
      price
      salePrice
      onSale
    }
  }
`

const variationAttributeBaseFragmentGQL = gql`
  fragment VariationAttributeBase on VariationAttribute {
    id
    attributeId
    name
    label
  }
`
const ProductAttributeBaseFragmentGQL = gql`
  fragment ProductAttributeBase on ProductAttribute {
    id
    attributeId
    name
    label
  }
`

const variationBaseFragment = gql`
  fragment ProductVariationBase on ProductVariation {
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
    image {
      ...ImageBase
    }
    attributes {
      nodes {
        ...VariationAttributeBase
      }
    }
  }
`

const variableProductFragment = gql`
  fragment VariableProductFragment on VariableProduct {
    ... on VariableProduct {
      ...ProductBase
      price
      salePrice
      onSale
      variations {
        nodes {
          ...ProductVariationBase
        }
      }
      attributes {
        nodes {
          ...ProductAttributeBase
        }
      }
    }
  }
`

const productCategoryGQL = gql`
  fragment ProductCategoryBase on ProductCategory {
    name
    slug
    id
    count
    description
    image {
      ...ImageBase
    }
    product_category {
      acf {
        description
      }
    }
  }
`

const cartBaseFragment = gql`
  fragment CartBase on Cart {
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
            ...VariationAttributeBase
            value
          }
        }
        key
        product {
          node {
            ...ProductMinBase
            image {
              ...ImageBase
            }
            productCategories {
              nodes {
                slug
              }
            }
          }
        }
      }
    }
  }
`
