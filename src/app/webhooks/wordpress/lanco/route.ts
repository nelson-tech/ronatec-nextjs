import { NextResponse } from "next/server"
import getWebhookData from "../utils/getWebhookData"
import productActions from "../products/productActions"
import { WCWH_Product } from "../utils/types"

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
