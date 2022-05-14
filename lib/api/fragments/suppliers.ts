import { gql } from "urql"

const featuredSupplierFragment = gql`
  fragment FeaturedSupplierFragment on Page_PageHome_Acf {
    featuredSupplier {
      ... on Supplier {
        title
        slug
        id
        databaseId
        supplier {
          url
          text
          image {
            ...ImageBase
          }
        }
      }
    }
  }
`
