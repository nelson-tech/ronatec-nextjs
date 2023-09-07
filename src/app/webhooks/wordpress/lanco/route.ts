import { NextResponse } from "next/server"
import getWebhookData from "../utils/getWebhookData"
import productActions from "../products/productActions"
import type { WCWH_Product } from "../utils/types"
import getPayloadClient from "~payload/payloadClient"
import type { Settings } from "~payload-types"
import type { SendMailOptions } from "nodemailer"

const secret = process.env.LANCO_WEBHOOK_SECRET

export const GET = async (req: Request, res: Response) => {
  console.log("Incoming Lanco Product Update Ping", req)

  return NextResponse.json({ ping: "success" })
}

export const POST = async (req: Request, res: Response) => {
  const { isValid, data, resource, event } = await getWebhookData<WCWH_Product>(
    req,
    secret
  )

  const payload = await getPayloadClient()

  const debugEmail = (
    (await payload.findGlobal({ slug: "Settings" })) as Settings
  ).debugEmail

  const adminEmail: SendMailOptions = {
    to: debugEmail || "michael@ronatec.us",
    subject: `Lanco product ${event}: ${data?.name}`,
    text: JSON.stringify(data || "{}"),
  }
  payload.sendEmail(adminEmail)

  let message: string | undefined = ""

  if (isValid && data) {
    switch (resource) {
      case "product":
        message = await productActions({
          data,
          event,
          lanco: true,
        })
        break

      default:
        break
    }
    return NextResponse.json({ signature: "verified", message })
  }

  return NextResponse.json({ signature: "failed", message })
}
