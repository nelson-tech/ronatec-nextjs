import { useCoreAPIProvider } from "@common"
import { APIHooks } from "@common/types/hooks"
import { useHook, useSWRHook } from "@common/utils/use-hook"
import { SHOPIFY_CHECKOUT_ID_COOKIE } from "@ecommerce/const"
import Cookies from "js-cookie"

const useCart = () => {
  const hook = useHook((hooks: APIHooks) => hooks.cart.useCart)
  const { checkoutCookie } = useCoreAPIProvider()

  const fetcherWrapper: typeof hook.fetcher = context => {
    context.input.checkoutId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE)
    return hook.fetcher(context)
  }

  return useSWRHook({ ...hook, fetcher: fetcherWrapper })
}

export default useCart
