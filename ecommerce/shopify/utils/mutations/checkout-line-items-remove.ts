import { checkoutDetailFragment } from "../common"

const checkoutLineItemsRemove = `
mutation(
  $checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
      checkoutUserErrors {
      field
      message
    }
    checkout {
      ${checkoutDetailFragment}
    }
  }
}
`

export default checkoutLineItemsRemove
