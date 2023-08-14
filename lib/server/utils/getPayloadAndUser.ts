import getCookieData from "@server/utils/getCookieData"
import getPayloadClient from "~payload/payloadClient"

const getPayloadAndUser = async () => {
  const payload = await getPayloadClient()

  const { auth, cart: cartFromCookie } = getCookieData()

  const user = auth?.id
    ? await payload.findByID({ collection: "users", id: auth?.id })
    : null

  return { payload, user, cartFromCookie }
}

export default getPayloadAndUser
