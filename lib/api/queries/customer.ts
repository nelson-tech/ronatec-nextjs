import { gql } from "urql"

const getCustomerDataQuery = gql`
  query GetCustomerData {
    customer {
      ...CustomerBase
    }
  }
`
