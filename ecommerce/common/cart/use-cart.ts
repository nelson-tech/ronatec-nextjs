import { useCoreAPIProvider } from "@common"
import { APIHooks, SWRHook } from "@common/types/hooks"
import { useHook, useSWRHook } from "@common/utils/use-hook"
import { SHOPIFY_CHECKOUT_ID_COOKIE } from "@ecommerce/const"
import Cookies from "js-cookie"

export type UseCart<H extends SWRHook = SWRHook<any>> = ReturnType<H["useHook"]>

const useCart: UseCart = () => {
  const hook = useHook((hooks: APIHooks) => hooks.cart.useCart)
  const { checkoutCookie } = useCoreAPIProvider()

  const fetcherWrapper: typeof hook.fetcher = context => {
    context.input.checkoutId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE)
    return hook.fetcher(context)
  }

  return useSWRHook({ ...hook, fetcher: fetcherWrapper })()
}

export default useCart
