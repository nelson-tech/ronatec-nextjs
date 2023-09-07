import getPayloadClient from "~payload/payloadClient"
import type { SendMailOptions } from "nodemailer"

import { WCWH_Event, WCWH_Product } from "../../utils/types"
import deleteProduct from "./deleteProduct"
import { updateProduct } from "./updateProduct"
import type { Settings } from "~payload-types"

type ProductActionsArgs<T> = {
  data: WCWH_Product
  event: WCWH_Event
  lanco?: boolean
}

const productActions = async <T>({
  data,
  event,
  lanco,
}: ProductActionsArgs<T>) => {
  const payload = await getPayloadClient()
  const debugEmail = (
    (await payload.findGlobal({ slug: "Settings" })) as Settings
  ).debugEmail

  if (debugEmail) {
    const adminEmail: SendMailOptions = {
      to: debugEmail,
      subject: `Lanco product ${event}: ${data.name}`,
      text: JSON.stringify(data || "{}"),
    }
    payload.sendEmail(adminEmail)
  }

  let message: string | undefined
  switch (event) {
    case "created":
      message = await updateProduct(data, lanco)
      break
    case "updated":
      message = await updateProduct(data, lanco)
      break
    case "deleted":
      message = await deleteProduct(data)
      break
    case "restored":
      message = await updateProduct(data, lanco)
      break

    default:
      break
  }

  return message
}

export default productActions
