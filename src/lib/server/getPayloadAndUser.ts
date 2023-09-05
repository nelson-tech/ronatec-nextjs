import getCookieData from "@server/getCookieData"
import getPayloadClient from "~payload/payloadClient"

const getPayloadAndUser = async () => {
  const payload = await getPayloadClient()

  const { auth, cart: cartFromCookie } = getCookieData()

  const user = auth?.id
    ? await payload
        .findByID({ collection: "users", id: auth?.id })
        .catch((e) => {
          console.warn("User from cookie not found")
          return null
        })
    : null

  return { payload, user, cartFromCookie }
}

export default getPayloadAndUser
