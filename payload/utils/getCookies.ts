import type { Payload } from "payload"
import cookie from "cookie"
import jwtDecode from "jwt-decode"

import type { PayloadRequest } from "payload/types"
import { AUTH_TOKEN_KEY, CART_TOKEN_KEY } from "@utils/constants"
import { USER_JWT_DATA } from "@lib/types/auth"

const getCookies = (req: PayloadRequest) => {
  const payload: Payload = req.payload

  payload.authenticate

  const cookies = cookie.parse(req.headers["cookie"])

  const guestCartId = cookies[CART_TOKEN_KEY]

  const auth = cookies[AUTH_TOKEN_KEY]
    ? jwtDecode<USER_JWT_DATA>(cookies[AUTH_TOKEN_KEY])
    : null

  return { guestCartId, auth }
}

export default getCookies
