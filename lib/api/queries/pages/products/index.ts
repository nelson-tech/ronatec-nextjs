import { gql } from "@apollo/client"
import {
  imageFragment,
  productCategoryFragment,
  productMinBaseFragment,
  productBaseFragment,
  productPriceFragment,
  variableProductFragment,
} from "@api/queries/fragments"
import { simpleProductFragment } from "@api/queries/fragments/products"

export const getProducts = gql`
  query GetProductCategoriesQuery {
    products {
      nodes {
        slug
        name
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
      }
    }
  }
`

export const getProductsWithCategories = gql`
  query GetProductCategoriesQuery {
    products {
      nodes {
        slug
        productCategories {
          nodes {
            ${productCategoryFragment}
            ancestors {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`

export const getCategoryFromSlug = gql`
  query GetCategoryFromSlugQuery($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      ${productCategoryFragment}
      ancestors {
        nodes {
          id
          databaseId
          name
          slug
        }
      }
      children(where: {hideEmpty: false}) {
        nodes {
          ${productCategoryFragment}
          products {
            nodes {
              ${productMinBaseFragment}
            }
          }
          children(where: {hideEmpty: true}) {
            nodes {
              ${productCategoryFragment}
              products {
                nodes {
                  ${productMinBaseFragment}
                }
              }
            }
          }
        }
      }
      products {
        nodes {
          ${productMinBaseFragment}
          ${imageFragment}
          ${productPriceFragment}
          shortDescription
        }
      }
    }
  }
`

export const getProductsByCategory = gql`
query GetProductsByCategory($field: ProductsOrderByEnum!, $order: OrderEnum!, $category: String) {
  products(where: {orderby: {field: $field, order: $order}, category: $category}) {
    nodes {
      ${productMinBaseFragment}
      ${imageFragment}
      ${productPriceFragment}
      shortDescription
    }
  }
}
`

export const getProductsByCategories = gql`
query GetProductsByCategory($field: ProductsOrderByEnum!, $order: OrderEnum!, $categories: [String]) {
  products(where: {orderby: {field: $field, order: $order}, categoryIn: $categories}) {
    nodes {
      ${productMinBaseFragment}
      ${imageFragment}
      productCategories {
        nodes {
          slug
          name
        }
      }
      ${productPriceFragment}
    }
  }
}
`

export const getProductCategories = gql`
  query GetProductCategoriesQuery {
    productCategories(where: { childless: true, hideEmpty: true }, first: 99) {
      nodes {
        ${productCategoryFragment}
        ancestors {
          nodes {
            ${productCategoryFragment}
          }
        }
      }
    }
  }
`

export const getCategorySlugs = gql`
  query GetCategorySlugsQuery {
    productCategories {
      nodes {
        slug
      }
    }
  }
`

export const getProductDataFromSKU = gql`
query GetProductDataFromSKU($id: ID!) {
  product(id: $id, idType: SKU) {
    ${variableProductFragment}
  }
}
`

export const getProductDataFromSlug = gql`
query GetProductDataFromSlug($id: ID!) {
  product(id: $id, idType: SLUG) {
    ${variableProductFragment}
    ${simpleProductFragment}
  }
}
`
