import { AUTH_TOKEN_KEY, CART_TOKEN_KEY } from "@utils/constants"
import { USER_JWT_DATA } from "@lib/types/auth"
import getFormattedCookie from "@utils/getFormattedCookie"
import jwtDecode from "jwt-decode"
import { NextApiHandler } from "next"
// import { cookies } from "next/headers"
import { Cart } from "payload/generated-types"
import getPayloadClient from "~payload/payloadClient"

export type CreateCartResponseData = {
  cart?: Cart
  error?: string
}

const handler: NextApiHandler<CreateCartResponseData> = async (req, res) => {
  const cartData = req.body

  const client = await getPayloadClient()

  const auth = req.cookies[AUTH_TOKEN_KEY]
    ? jwtDecode<USER_JWT_DATA>(req.cookies[AUTH_TOKEN_KEY] as string)
    : null

  console.log("Auth", auth)

  try {
    const data = await client.create({
      collection: "carts",
      data: { ...cartData, user: auth?.id },
      overrideAccess: !!auth?.id,
      user: auth?.id,
    })

    if (!auth?.id) {
      const cookieString = getFormattedCookie(CART_TOKEN_KEY, data.id, {
        domain: process.env.COOKIE_DOMAIN,
        path: "/",
        sameSite: "lax",
        httpOnly: true,
        secure: false,
        maxAge: 604_800 * 4, // 4 weeks
      })

      res.setHeader("Set-Cookie", cookieString)
    }

    res.status(200).json({ cart: data })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Error creating new cart." })
  }
}

export default handler
