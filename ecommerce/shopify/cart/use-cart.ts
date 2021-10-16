import useCart from "@common/cart/use-cart"
import { createCheckout } from "@ecommerce/utils"

export const handler = {
  fetchOptions: {
    query: ` query { hello }`,
  },
  fetcher: async ({ fetch, options, input: { checkoutId } }: any) => {
    let checkout

    if (checkoutId) {
      const { data } = await fetch({ ...options })

      checkout = data.node
    } else {
      checkout = await createCheckout(fetch)
    }

    return checkout
  },
  useHook: ({ useData }: any) => {
    const data = useData()
    return {
      data,
    }
  },
}

export default useCart
