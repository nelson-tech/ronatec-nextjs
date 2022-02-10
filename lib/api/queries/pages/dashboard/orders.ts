import { variableProductFragment } from "@api/queries/fragments"
import { simpleProductFragment } from "@api/queries/fragments/products"
import { gql } from "@apollo/client"

export const getUserOrders = gql`
  query GetUserOrdersQuery {
    orders {
      nodes {
        date
        orderNumber
        total
        status
        lineItems {
          nodes {
            quantity
            total
            product {
              ${simpleProductFragment}
              ${variableProductFragment}
            }
          }
        }
      }
    }
  }
`

export const getUserOrder = gql`
  query GetUserOrdersQuery($id: ID) {
    order(id: $id, idType: DATABASE_ID) {
      date
      orderNumber
      total
      status
      lineItems {
        nodes {
          quantity
          total
          product {
            ${simpleProductFragment}
            ${variableProductFragment}
          }
        }
      }
    }
  }
`
