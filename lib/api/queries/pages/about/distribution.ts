import { gql } from "urql"

export const getDistributionDataQuery = gql`
  query GetDistributionData {
    suppliers(first: 99) {
      nodes {
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
