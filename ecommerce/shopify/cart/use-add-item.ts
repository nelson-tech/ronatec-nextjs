import { useAddItem } from "@common/cart"
import { MutationHook } from "@common/types/hooks"
import { getCheckoutId } from "@ecommerce/utils"
import { checkoutLineItemsAdd } from "@ecommerce/utils/mutations"

export default useAddItem

export const handler: MutationHook = {
  fetcherOptions: {
    query: checkoutLineItemsAdd,
  },
  fetcher: async ({ fetch, options, input }) => {
    const variables = {
      checkoutId: getCheckoutId(),
      lineItems: [{ variantId: input.variantId, quantity: 1 }],
    }

    debugger

    const response = await fetch({
      ...options,
      variables,
    })
    return response
  },
  useHook: ({ fetch }) => {
    return async (input: any) => {
      const response = await fetch(input)

      return { output: response }
    }
  },
}
