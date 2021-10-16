import { APIFetcher } from "@common/types/api"
import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CHECKOUT_URL_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
} from "@ecommerce/const"
import { Checkout, CheckoutCreatePayload, Maybe } from "@ecommerce/schema"
import Cookies from "js-cookie"
import { checkoutCreate } from "./mutations"

const createCheckout = async (
  fetch: APIFetcher<{ checkoutCreate: CheckoutCreatePayload }>,
): Promise<Maybe<Checkout | undefined>> => {
  const { data } = await fetch({
    query: checkoutCreate,
  })

  const { checkout } = data.checkoutCreate
  const checkoutId = checkout?.id

  if (checkoutId) {
    const options = {
      expires: SHOPIFY_COOKIE_EXPIRE,
    }
    Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId, options)
    Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout?.webUrl, options)
  }

  return checkout
}

export default createCheckout
