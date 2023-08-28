import { NextResponse } from "next/server"
import getWebhookData from "../utils/getWebhookData"
import productActions from "../products/productActions"
import { WCWH_Product } from "../utils/types"
import getPayloadClient from "~payload/payloadClient"
import { SendMailOptions } from "nodemailer"

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

  const adminEmail: SendMailOptions = {
    to: "michael@ronatec.us",
    subject: `Lanco product changed!`,
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
