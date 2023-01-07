import { gql } from "urql"

const addToCartMutation = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        isEmpty
        contents {
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

const clearCart = gql`
  mutation ClearCart($input: EmptyCartInput!) {
    emptyCart(input: $input) {
      clientMutationId
      cart {
        ...CartBase
      }
    }
  }
`

const removeCartItem = gql`
  mutation RemoveCartItem($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      clientMutationId
      cart {
        ...CartBase
      }
    }
  }
`

const updateCartItemQuantity = gql`
  mutation UpdateCartItemQuantity($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      cart {
        ...CartBase
      }
    }
  }
`
