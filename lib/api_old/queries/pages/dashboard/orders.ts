import { gql } from "urql"

const getUserOrdersQuery = gql`
  query GetUserOrdersData {
    orders {
      nodes {
        ...OrderProductBase
      }
    }
  }
`

const getUserOrderQuery = gql`
  query GetUserOrderData($id: ID) {
    order(id: $id, idType: DATABASE_ID) {
      ...OrderProductBase
    }
  }
`
