import { useCoreAPIProvider } from "@common"
import useCart, { UseCart } from "@common/cart/use-cart"
import { Cart } from "@common/types/cart"
import { SWRHook } from "@common/types/hooks"
import { Checkout } from "@ecommerce/schema"
import {
  checkoutToCart,
  createCheckout,
  getCheckoutQuery,
} from "@ecommerce/utils"
import Cookies from "js-cookie"
import { useMemo } from "react"

export type UseCartHookDescriptor = {
  fetcherInput: {
    checkoutId: string
  }
  fetcherOutput: {
    node: Checkout
  }
  data: Cart
}

export const handler: SWRHook<UseCartHookDescriptor> = {
  fetcherOptions: {
    query: getCheckoutQuery,
  },
  fetcher: async ({ fetch, options, input: { checkoutId } }) => {
    let checkout: Checkout

    if (checkoutId) {
      const { data } = await fetch({
        ...options,
        variables: {
          checkoutId,
        },
      })

      checkout = data.node
    } else {
      checkout = await createCheckout(fetch as any)
    }

    const cart = checkoutToCart(checkout)

    return cart
  },
  useHook:
    ({ useData }) =>
    () => {
      const { checkoutCookie } = useCoreAPIProvider()
      const response = useData({
        swrOptions: {
          revalidateOnFocus: false,
        },
      })

      if (response.data?.completedAt) {
        Cookies.remove(checkoutCookie)
      }

      return useMemo(() => {
        return {
          ...response,
          isEmpty: (response.data?.lineItems.length ?? 0) <= 0,
        }
      }, [response])
    },
}

export default useCart as UseCart<typeof handler>
