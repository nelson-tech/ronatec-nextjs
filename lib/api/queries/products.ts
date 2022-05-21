import { gql } from "urql"

const getProductsWithCategories = gql`
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

const getProductsByCategories = gql`
  query GetProductsByCategory(
    $field: ProductsOrderByEnum!
    $order: OrderEnum!
    $categories: [String]!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    products(
      where: {
        orderby: { field: $field, order: $order }
        categoryIn: $categories
      }
      first: $first
      last: $last
      after: $after
      before: $before
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
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

const getProductCategories = gql`
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

const getProductDataFromSlug = gql`
  query GetProductDataFromSlug($id: ID!) {
    product(id: $id, idType: SLUG) {
      ...VariableProductFragment
      ...SimpleProductFragment
    }
  }
`

const getCategorySlugs = gql`
  query GetCategorySlugs {
    productCategories(first: 200) {
      nodes {
        slug
      }
    }
  }
`

const getCategoryFromSlug = gql`
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
