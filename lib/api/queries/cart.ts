import { gql } from "urql"

export const getCart = gql`
  query GetCart {
    cart {
      ...CartBase
    }
  }
`
