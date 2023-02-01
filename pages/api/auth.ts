// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import {
  AUTH_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_TOKEN_KEY,
  CART_TOKEN_KEY,
} from "@lib/constants"
import checkAuthAPI from "@lib/utils/checkAuthAPI"
import { EP_Auth_Input_Type, EP_Auth_Response_Type } from "@lib/types/auth"
import { decodeToken } from "@lib/utils/decodeJwt"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EP_Auth_Response_Type>,
) {
  const data: EP_Auth_Input_Type =
    typeof req.body === "string" && req.body.length > 0
      ? JSON.parse(req.body)
      : req.body

  let { tokens } = data

  const cookies = req.cookies

  const authData = await checkAuthAPI({ cookies, tokens })

  let body: EP_Auth_Response_Type = {
    ...authData,
    needsRefresh: null,
  }

  let newCookies: string[] = []

  authData.newCookies.length > 0 &&
    (newCookies = newCookies.concat(authData.newCookies))

  const removeAuthCookies = () => {
    newCookies.push(
      `${AUTH_TOKEN_KEY}=deleted; Path=/; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      `${REFRESH_TOKEN_KEY}=deleted; Path=/; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      `${USER_TOKEN_KEY}=deleted; Path=/; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    )
  }

  switch (data.action) {
    case "LOGOUT":
      // Expire auth cookies
      removeAuthCookies()

      break

    case "SET":
      // Set new cookies from client call

      if (tokens) {
        if (tokens.remove) {
          removeAuthCookies()
        } else {
          // Auth Token
          tokens.auth &&
            newCookies.push(
              `${AUTH_TOKEN_KEY}=${
                tokens.auth
              }; HttpOnly; Path=/; SameSite=None; Secure; expires=${new Date(
                decodeToken(tokens.auth).exp * 1000,
              ).toUTCString()}`,
            )

          // Refresh Token
          tokens.refresh &&
            newCookies.push(
              `${REFRESH_TOKEN_KEY}=${
                tokens.refresh
              }; HttpOnly; Path=/; SameSite=None; Secure; expires=${new Date(
                decodeToken(tokens.refresh).exp * 1000,
              ).toUTCString()}`,
            )

          // Cart Session
          tokens.cart &&
            tokens.cart !== authData.tokens.cart &&
            newCookies.push(
              `${CART_TOKEN_KEY}=${
                tokens.cart
              }; HttpOnly; Path=/; SameSite=None; Secure; expires=${new Date(
                decodeToken(tokens.cart).exp * 1000,
              ).toUTCString()}`,
            )
        }
      }

      break

    default:
      // Just checking

      break
  }

  return res.setHeader("set-cookie", newCookies).status(200).json(body)
}
