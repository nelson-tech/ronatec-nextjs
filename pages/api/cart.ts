import { NextApiRequest, NextApiResponse } from "next/types"

import type { Cart } from "@api/codegen/graphql"
import { EP_Cart_Input_Type, EP_Cart_Response_Type } from "@lib/types/cart"
import checkAuthAPI from "@lib/utils/checkAuthAPI"
import { API_URL, CART_TOKEN_EXPIRATION, CART_TOKEN_KEY } from "@lib/constants"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EP_Cart_Response_Type>,
) {
  const data: EP_Cart_Input_Type =
    typeof req.body === "string" ? JSON.parse(req.body) : req.body

  const cookies = req.cookies

  const authData = await checkAuthAPI({ cookies })

  const body: EP_Cart_Response_Type = { cart: null }

  let newCookies: string[] = []

  authData.newCookies.length > 0 &&
    (newCookies = newCookies.concat(authData.newCookies))

  const headers: { [key: string]: string } = {
    "content-type": "application/json",
  }

  authData.tokens.auth &&
    (headers["authorization"] = `Bearer ${authData.tokens.auth}`)
  authData.tokens.cart &&
    (headers["woocommerce-session"] = `Session ${authData.tokens.cart}`)

  const fetchCart = async () => {
    const cartResponse = await fetch(API_URL ?? "", {
      method: "POST",
      headers,
      body: JSON.stringify({}),
    })

    const incomingCartToken = cartResponse.headers.get("woocommerce-session")

    incomingCartToken != authData.tokens.cart &&
      newCookies.push(
        `${CART_TOKEN_KEY}=${incomingCartToken}; HttpOnly; Path=/; SameSite=None; Secure; expires=${new Date(
          Date.now() + CART_TOKEN_EXPIRATION,
        ).toUTCString()}`,
      )

    const cartData = await cartResponse.json()

    console.log("CartData", cartData)

    body.cart = cartData?.cart as Cart
  }

  switch (data.action) {
    case "CHECK":
      await fetchCart()
      break

    default:
      break
  }

  return res.setHeader("set-cookie", newCookies).status(200).json(body)
}
