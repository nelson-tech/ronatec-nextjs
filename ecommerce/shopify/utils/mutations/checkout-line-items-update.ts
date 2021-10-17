import { checkoutDetailFragment } from "../common"

const checkoutLineItemUpdate = `
mutation(
  $checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
  checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
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

export default checkoutLineItemUpdate
