import { SHOPIFY_CHECKOUT_URL_COOKIE } from "@ecommerce/const"
import { NextApiRequest, NextApiResponse } from "next"

export default function checkout(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req
  const checkoutURL = cookies[SHOPIFY_CHECKOUT_URL_COOKIE]

  if (checkoutURL) {
    res.redirect(checkoutURL)
  } else {
    // TODO - Redirect to error page with error info
    res.redirect("/")
  }
}
