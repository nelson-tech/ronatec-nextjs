import { NextResponse } from "next/server"
import getWebhookData from "../utils/getWebhookData"
import productActions from "./productActions"
import { WCWH_Product } from "../utils/types"

export const GET = async (req: Request, res: Response) => {
  console.log("Incoming Wordpress Product Ping", req)

  return NextResponse.json({ ping: "success" })
}

export const POST = async (req: Request, res: Response) => {
  const { isValid, data, resource, event } = await getWebhookData(req)

  let message: string | undefined = ""

  if (isValid) {
    switch (resource) {
      case "product":
        message = await productActions({ data: data as WCWH_Product, event })
        break

      default:
        break
    }
    return NextResponse.json({ signature: "verified", message })
  }

  return NextResponse.json({ signature: "failed", message })
}
