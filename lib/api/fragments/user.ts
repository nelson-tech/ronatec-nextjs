import { gql } from "urql"

export const userAuthBaseFragment = gql`
  fragment userAuth on User {
    id
    databaseId
    jwtAuthToken
    jwtRefreshToken
    firstName
    lastName
    username
    email
  }
`

const orderProductBase = gql`
  fragment OrderProductBase on Order {
    date
    orderNumber
    total
    status
    lineItems {
      nodes {
        quantity
        total
        product {
          node {
            ...SimpleProductFragment
            ...VariableProductFragment
          }
        }
      }
    }
  }
`
