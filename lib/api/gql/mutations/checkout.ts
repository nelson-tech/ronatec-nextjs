import { gql } from "urql"

const checkoutMutation = gql`
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      customer {
        ...CustomerBase
      }
      order {
        ...OrderProductBase
      }
      result
    }
  }
`
