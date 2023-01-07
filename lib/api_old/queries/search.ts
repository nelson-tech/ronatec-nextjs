import { gql } from "urql"

const searchQuery = gql`
  query QuickSearch($search: String) {
    products(where: { search: $search }) {
      nodes {
        id
        slug
        name
        productCategories {
          nodes {
            slug
          }
        }
      }
    }
  }
`
