import { AUTH_TOKEN_KEY, CART_TOKEN_KEY } from "@utils/constants"
import { USER_JWT_DATA } from "@lib/types/auth"
import jwtDecode from "jwt-decode"
import { cookies } from "next/headers"

const getCookieData = () => {
  const cookieStore = cookies()
  const authCookie = cookieStore.get(AUTH_TOKEN_KEY)
  const cartCookie = cookieStore.get(CART_TOKEN_KEY)

  const authData: USER_JWT_DATA | undefined = authCookie?.value
    ? jwtDecode(authCookie.value)
    : undefined

  return { auth: authData, cart: cartCookie?.value }
}

export default getCookieData
