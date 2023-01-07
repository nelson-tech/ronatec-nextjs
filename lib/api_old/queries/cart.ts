import { gql } from "urql"

const getCart = gql`
  query GetCart {
    cart {
      ...CartBase
    }
  }
`
