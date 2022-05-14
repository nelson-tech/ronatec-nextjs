import { gql } from "urql"

export const addToCartMutation = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        isEmpty: contents {
          itemCount
          productCount
          edges {
            node {
              extraData {
                key
                value
              }
            }
          }
        }
      }
    }
  }
`

export const clearCart = gql`
  mutation ClearCart($input: EmptyCartInput!) {
    emptyCart(input: $input) {
      clientMutationId
    }
  }
`

export const removeCartItem = gql`
  mutation RemoveCartItem($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      clientMutationId
    }
  }
`
