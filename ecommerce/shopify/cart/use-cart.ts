import useCart from "@common/cart/use-cart"
import {
  checkoutToCart,
  createCheckout,
  getCheckoutQuery,
} from "@ecommerce/utils"
import { useMemo } from "react"

export const handler = {
  fetchOptions: {
    query: getCheckoutQuery,
  },
  fetcher: async ({ fetch, options, input: { checkoutId } }: any) => {
    let checkout

    if (checkoutId) {
      const { data } = await fetch({
        ...options,
        variables: {
          checkoutId,
        },
      })

      checkout = data.node
    } else {
      checkout = await createCheckout(fetch)
    }

    const cart = checkoutToCart(checkout)

    return cart
  },
  useHook: ({ useData }: any) => {
    const data = useData({
      swrOptions: {
        revalidateOnFocus: false,
      },
    })

    return useMemo(() => {
      return data
    }, [data])
  },
}

export default useCart
