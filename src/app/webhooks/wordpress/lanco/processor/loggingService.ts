import type { Payload } from "payload"
import type { WCWH_Event, WCWH_Product } from "../../utils/types"

export interface WebhookLogData {
  rawData: WCWH_Product
  type: WCWH_Event
  processingStatus: "pending" | "success" | "error"
  processingLog?: string
  errorMessage?: string
  productId?: string
}

/**
 * Creates a new webhook log entry
 * Should be called immediately when webhook is received to ensure logging happens
 */
export async function createWebhookLog(
  payload: Payload,
  data: Pick<WebhookLogData, "rawData" | "type">
): Promise<string> {
  try {
    const webhookLog = await payload.create({
      collection: "lancoWebhooks",
      data: {
        rawData: data.rawData,
        type: data.type,
        processingStatus: "pending",
        processingLog: `Webhook received at ${new Date().toISOString()}`,
      },
    })

    return webhookLog.id
  } catch (error) {
    // Even if logging fails, we don't want to break the webhook
    console.error("Failed to create webhook log:", error)
    throw error
  }
}

/**
 * Updates an existing webhook log with processing results
 */
export async function updateWebhookLog(
  payload: Payload,
  logId: string,
  updates: Partial<
    Pick<
      WebhookLogData,
      "processingStatus" | "processingLog" | "errorMessage" | "productId"
    >
  >
): Promise<void> {
  try {
    await payload.update({
      collection: "lancoWebhooks",
      id: logId,
      data: {
        ...(updates.processingStatus && {
          processingStatus: updates.processingStatus,
        }),
        ...(updates.processingLog && { processingLog: updates.processingLog }),
        ...(updates.errorMessage && { errorMessage: updates.errorMessage }),
        ...(updates.productId && { product: updates.productId }),
      },
    })
  } catch (error) {
    console.error("Failed to update webhook log:", error)
    // Don't throw - we don't want to fail the webhook if logging fails
  }
}

/**
 * Appends a message to the processing log
 */
export async function appendToLog(
  payload: Payload,
  logId: string,
  message: string
): Promise<void> {
  try {
    const existingLog = await payload.findByID({
      collection: "lancoWebhooks",
      id: logId,
    })

    const timestamp = new Date().toISOString()
    const newLogEntry = `\n[${timestamp}] ${message}`
    const updatedLog = (existingLog.processingLog || "") + newLogEntry

    await payload.update({
      collection: "lancoWebhooks",
      id: logId,
      data: {
        processingLog: updatedLog,
      },
    })
  } catch (error) {
    console.error("Failed to append to log:", error)
  }
}

/**
 * Marks a webhook log as successful with final details
 */
export async function markLogSuccess(
  payload: Payload,
  logId: string,
  message: string,
  productId: string
): Promise<void> {
  try {
    const existingLog = await payload.findByID({
      collection: "lancoWebhooks",
      id: logId,
    })

    const timestamp = new Date().toISOString()
    const finalLog = `${
      existingLog.processingLog || ""
    }\n[${timestamp}] SUCCESS: ${message}`

    await payload.update({
      collection: "lancoWebhooks",
      id: logId,
      data: {
        processingStatus: "success",
        processingLog: finalLog,
        product: productId,
      },
    })
  } catch (error) {
    console.error("Failed to mark log as success:", error)
  }
}

/**
 * Marks a webhook log as failed with error details
 */
export async function markLogError(
  payload: Payload,
  logId: string,
  error: Error | string,
  productId?: string
): Promise<void> {
  try {
    const existingLog = await payload.findByID({
      collection: "lancoWebhooks",
      id: logId,
    })

    const timestamp = new Date().toISOString()
    const errorMessage = error instanceof Error ? error.message : error
    const errorStack = error instanceof Error ? error.stack : ""
    const finalLog = `${
      existingLog.processingLog || ""
    }\n[${timestamp}] ERROR: ${errorMessage}${
      errorStack ? `\nStack: ${errorStack}` : ""
    }`

    await payload.update({
      collection: "lancoWebhooks",
      id: logId,
      data: {
        processingStatus: "error",
        processingLog: finalLog,
        errorMessage,
        ...(productId && { product: productId }),
      },
    })
  } catch (logError) {
    console.error("Failed to mark log as error:", logError)
  }
}

/**
 * Complete logging wrapper that handles creation and updates
 * Use this for guaranteed logging even on catastrophic failures
 */
export async function withLogging<T>(
  payload: Payload,
  rawData: WCWH_Product,
  type: WCWH_Event,
  operation: (logId: string) => Promise<T>
): Promise<T> {
  let logId: string | null = null

  try {
    // Create initial log entry
    logId = await createWebhookLog(payload, { rawData, type })

    // Execute the operation
    const result = await operation(logId)

    return result
  } catch (error) {
    // Ensure error is logged even if operation fails
    if (logId) {
      await markLogError(payload, logId, error as Error)
    } else {
      // If we couldn't even create a log, try one more time with the error
      try {
        const emergencyLogId = await createWebhookLog(payload, {
          rawData,
          type,
        })
        await markLogError(payload, emergencyLogId, error as Error)
      } catch (emergencyError) {
        console.error("Complete logging failure:", emergencyError)
      }
    }
    throw error
  }
}
