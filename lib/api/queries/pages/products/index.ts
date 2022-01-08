import { gql } from "@apollo/client"
import { variableProductFragment } from "@api/queries/fragments"

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
      }
    }
  }
`

export const getProductCategories = gql`
  query GetProductCategoriesQuery {
    products {
      nodes {
        slug
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
  }
}
`
