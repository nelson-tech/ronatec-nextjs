import { useCart, useUpdateItem } from "@common/cart"
import { UseUpdateItem } from "@common/cart/use-update-item"
import { Cart } from "@common/types/cart"
import { MutationHook } from "@common/types/hooks"
import { CheckoutLineItemsUpdatePayload } from "@ecommerce/schema"
import { checkoutToCart, getCheckoutId } from "@ecommerce/utils"
import { checkoutLineItemsUpdate } from "@ecommerce/utils/mutations"

export type UpdateItemDescriptor = {
  fetcherInput: {
    id: string
    variantId: string
    quantity: number
  }
  fetcherOutput: {
    checkoutLineItemsUpdate: CheckoutLineItemsUpdatePayload
  }
  data: Cart
}

export const handler: MutationHook<UpdateItemDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemsUpdate,
  },
  fetcher: async ({ input: item, options, fetch }) => {
    const { data } = await fetch({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
        lineItems: [
          {
            id: item.id,
            variantId: item.variantId,
            quantity: item.quantity ?? 1,
          },
        ],
      },
    })

    const cart = checkoutToCart(data.checkoutLineItemsUpdate.checkout)

    return cart
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate: updateLocalCart } = useCart()
      return async input => {
        const response = await fetch(input)

        await updateLocalCart(response, false)

        return response
      }
    },
}

export default useUpdateItem as UseUpdateItem<typeof handler>
