import { NextResponse } from "next/server"
import getWebhookData from "../utils/getWebhookData"
import type { WCWH_Product } from "../utils/types"
import getPayloadClient from "~payload/payloadClient"
import type { Settings } from "~payload-types"
import type { SendMailOptions } from "nodemailer"
import { processLancoWebhook } from "./processor/lancoProductProcessor"
import { createWebhookLog } from "./processor/loggingService"

const secret = process.env.LANCO_WEBHOOK_SECRET

export const GET = async (req: Request, res: Response) => {
  console.log("Incoming Lanco Product Update Ping", req)

  return NextResponse.json({ ping: "success" })
}

export const POST = async (req: Request, res: Response) => {
  const payload = await getPayloadClient()

  // Get settings
  const settings = (await payload.findGlobal({
    slug: "settings",
  })) as Settings & {
    lanco?: { logLancoWebhooks?: boolean }
  }
  const debugEmail = settings.debugEmail
  const shouldLog = settings.lanco?.logLancoWebhooks ?? false

  // Validate webhook signature and extract data
  const { isValid, data, resource, event } = await getWebhookData<WCWH_Product>(
    req,
    secret
  )

  // If signature is invalid, return early
  if (!isValid) {
    console.error("Invalid webhook signature")
    return NextResponse.json(
      {
        signature: "failed",
        message: "Invalid webhook signature",
      },
      { status: 401 }
    )
  }

  // If no data, return early
  if (!data || !event) {
    console.error("No data or event in webhook")
    return NextResponse.json(
      {
        signature: "verified",
        message: "No data to process",
      },
      { status: 400 }
    )
  }

  let logId: string | undefined
  let result: {
    success: boolean
    message: string
    productId?: string
    error?: string
  }

  try {
    // Create webhook log if logging is enabled
    if (shouldLog) {
      try {
        logId = await createWebhookLog(payload, { rawData: data, type: event })
      } catch (logError) {
        console.error("Failed to create webhook log:", logError)
        // Continue processing even if logging fails
      }
    }

    // Process the webhook based on resource type
    if (resource === "product") {
      result = await processLancoWebhook(payload, data, event, logId)
    } else {
      result = {
        success: false,
        message: `Unsupported resource type: ${resource}`,
      }
    }

    // Send debug email if configured
    if (debugEmail) {
      const emailSubject = result.success
        ? `Lanco ${event}: ${data.name} - SUCCESS`
        : `Lanco ${event}: ${data.name} - ERROR`

      const emailBody = `
Event: ${event}
Product: ${data.name}
WC ID: ${data.id}
SKU: ${data.sku}
Stock Status: ${data.stock_status}
Stock Quantity: ${data.stock_quantity}

Result: ${result.message}
${result.error ? `Error: ${result.error}` : ""}

Raw Data:
${JSON.stringify(data, null, 2)}
      `.trim()

      const adminEmail: SendMailOptions = {
        to: debugEmail,
        subject: emailSubject,
        text: emailBody,
      }

      try {
        await payload.sendEmail(adminEmail)
      } catch (emailError) {
        console.error("Failed to send debug email:", emailError)
        // Don't fail the webhook if email fails
      }
    }

    // Return appropriate response
    if (result.success) {
      return NextResponse.json({
        signature: "verified",
        message: result.message,
        productId: result.productId,
      })
    } else {
      return NextResponse.json(
        {
          signature: "verified",
          message: result.message,
          error: result.error,
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Webhook processing error:", error)

    const errorMessage = error instanceof Error ? error.message : String(error)

    // Send error email if configured
    if (debugEmail) {
      const errorEmail: SendMailOptions = {
        to: debugEmail,
        subject: `Lanco Webhook ERROR: ${data?.name || "Unknown"}`,
        text: `
Critical error processing webhook:
${errorMessage}

Event: ${event}
Product: ${data?.name || "Unknown"}

Raw Data:
${JSON.stringify(data, null, 2)}
        `.trim(),
      }

      try {
        await payload.sendEmail(errorEmail)
      } catch (emailError) {
        console.error("Failed to send error email:", emailError)
      }
    }

    return NextResponse.json(
      {
        signature: "verified",
        message: "Internal error processing webhook",
        error: errorMessage,
      },
      { status: 500 }
    )
  }
}
