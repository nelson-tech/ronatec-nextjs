import { gql } from "urql"

export const getProductsWithCategories = gql`
  query GetProductsWithCategories {
    products(first: 200) {
      nodes {
        slug
        productCategories {
          nodes {
            ...ProductCategoryBase
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

export const getProductsByCategories = gql`
  query GetProductsByCategory(
    $field: ProductsOrderByEnum!
    $order: OrderEnum!
    $categories: [String]
  ) {
    products(
      where: {
        orderby: { field: $field, order: $order }
        categoryIn: $categories
      }
    ) {
      nodes {
        ...ProductMinBase
        image {
          ...ImageBase
        }
        productCategories {
          nodes {
            id
            slug
            name
          }
        }
        ...ProductPriceBase
        shortDescription
      }
    }
  }
`

export const getProductCategories = gql`
  query GetProductCategories {
    productCategories(where: { hideEmpty: true }, first: 99) {
      nodes {
        ...ProductCategoryBase
        ancestors {
          nodes {
            ...ProductCategoryBase
          }
        }
        children(where: { hideEmpty: true }, first: 99) {
          nodes {
            ...ProductCategoryBase
            children(where: { hideEmpty: true }, first: 99) {
              nodes {
                ...ProductCategoryBase
              }
            }
          }
        }
      }
    }
  }
`

export const getProductDataFromSlug = gql`
  query GetProductDataFromSlug($id: ID!) {
    product(id: $id, idType: SLUG) {
      ...VariableProductFragment
      ...SimpleProductFragment
    }
  }
`

export const getCategorySlugs = gql`
  query GetCategorySlugs {
    productCategories(first: 200) {
      nodes {
        slug
      }
    }
  }
`

export const getCategoryFromSlug = gql`
  query GetCategoryFromSlug($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      ...ProductCategoryBase
      ancestors {
        nodes {
          id
          databaseId
          name
          slug
        }
      }
      children(where: { hideEmpty: false }) {
        nodes {
          ...ProductCategoryBase
          products {
            nodes {
              ...ProductMinBase
            }
          }
          children(where: { hideEmpty: true }) {
            nodes {
              ...ProductCategoryBase
              products {
                nodes {
                  ...ProductMinBase
                }
              }
            }
          }
        }
      }
      products {
        nodes {
          ...ProductMinBase
          image {
            ...ImageBase
          }
          ...ProductPriceBase
          shortDescription
        }
      }
    }
  }
`
