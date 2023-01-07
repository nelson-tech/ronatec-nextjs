import { gql } from "urql"

const customerBaseFragment = gql`
  fragment CustomerBase on Customer {
    id
    firstName
    lastName
    displayName
    email
    orderCount
    billing {
      address1
      address2
      city
      company
      country
      email
      firstName
      lastName
      phone
      postcode
      state
    }
    date
    shipping {
      address1
      address2
      city
      company
      country
      email
      firstName
      lastName
      phone
      postcode
      state
    }
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
