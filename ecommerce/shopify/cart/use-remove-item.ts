import { useCart, useRemoveItem } from "@common/cart"
import { UseRemoveItem } from "@common/cart/use-remove-item"
import { Cart } from "@common/types/cart"
import { MutationHook } from "@common/types/hooks"
import { CheckoutLineItemsRemovePayload } from "@ecommerce/schema"
import { checkoutToCart, getCheckoutId } from "@ecommerce/utils"
import { checkoutLineItemsRemove } from "@ecommerce/utils/mutations"

export type RemoveItemDescriptor = {
  fetcherInput: {
    id: string
  }
  fetcherOutput: {
    checkoutLineItemsRemove: CheckoutLineItemsRemovePayload
  }
  data: Cart
}

export const handler: MutationHook<RemoveItemDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemsRemove,
  },
  fetcher: async ({ input: { id }, options, fetch }) => {
    const { data } = await fetch({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
        lineItemIds: [id],
      },
    })

    const cart = checkoutToCart(data.checkoutLineItemsRemove.checkout)

    return cart
  },
  useHook:
    ({ fetch }: any) =>
    () => {
      const { mutate: updateLocalCart } = useCart()

      return async input => {
        const data = await fetch(input)
        updateLocalCart(data, false)

        return data
      }
    },
}

export default useRemoveItem as UseRemoveItem<typeof handler>
