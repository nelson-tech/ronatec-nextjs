import type { Payload } from "payload"
import type { WCWH_Event, WCWH_Product } from "../../utils/types"
import type { Product } from "~payload-types"
import { mapWooCommerceToPayload } from "./dataMapper"
import { appendToLog, markLogSuccess, markLogError } from "./loggingService"
import findMatchingDocument from "../../utils/findMatchingDocument"

export interface ProcessorResult {
  success: boolean
  message: string
  productId?: string
  error?: string
}

/**
 * Main processor for Lanco product webhooks
 * Handles create, update, restore, and delete events
 */
export async function processLancoWebhook(
  payload: Payload,
  wcData: WCWH_Product,
  event: WCWH_Event,
  logId?: string
): Promise<ProcessorResult> {
  try {
    // Log the start of processing
    if (logId) {
      await appendToLog(
        payload,
        logId,
        `Processing ${event} event for product: ${wcData.name} (WC ID: ${wcData.id})`
      )
    }

    // Handle delete event separately
    if (event === "deleted") {
      return await handleDeleteEvent(payload, wcData, logId)
    }

    // For create, update, and restore events
    return await handleUpsertEvent(payload, wcData, event, logId)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)

    if (logId) {
      await markLogError(payload, logId, error as Error)
    }

    return {
      success: false,
      message: `Failed to process ${event} event`,
      error: errorMessage,
    }
  }
}

/**
 * Handles delete events
 */
async function handleDeleteEvent(
  payload: Payload,
  wcData: WCWH_Product,
  logId?: string
): Promise<ProcessorResult> {
  // Find existing product by WooCommerce ID AND lanco flag
  // CRITICAL: Must also check lanco:true to avoid deleting non-Lanco products!
  const existingProduct = await findMatchingDocument({
    collection: "products",
    where: {
      and: [{ "wc.wc_id": { equals: wcData.id } }, { lanco: { equals: true } }],
    },
    payload,
  })

  if (logId) {
    await appendToLog(
      payload,
      logId,
      existingProduct
        ? `Found existing product: ${existingProduct.id}`
        : "No existing product found to delete"
    )
  }

  if (!existingProduct?.id) {
    const message = "Product not found - nothing to delete"
    if (logId) {
      await markLogSuccess(payload, logId, message, "")
    }
    return {
      success: true,
      message,
    }
  }

  // Delete the product
  await payload.delete({
    collection: "products",
    id: existingProduct.id,
  })

  const message = `Product deleted: ${existingProduct.title}`
  if (logId) {
    await markLogSuccess(payload, logId, message, existingProduct.id)
  }

  return {
    success: true,
    message,
    productId: existingProduct.id,
  }
}

/**
 * Handles create, update, and restore events (upsert logic)
 */
async function handleUpsertEvent(
  payload: Payload,
  wcData: WCWH_Product,
  event: WCWH_Event,
  logId?: string
): Promise<ProcessorResult> {
  // Check stock status
  const isInStock =
    wcData.stock_status === "instock" &&
    (!wcData.manage_stock || (wcData.stock_quantity ?? 0) > 0)

  if (logId) {
    await appendToLog(
      payload,
      logId,
      `Stock status: ${wcData.stock_status}, Manage stock: ${wcData.manage_stock}, Quantity: ${wcData.stock_quantity}, In stock: ${isInStock}`
    )
  }

  // Find existing product by WooCommerce ID AND lanco flag
  // CRITICAL: Must also check lanco:true to avoid updating non-Lanco products!
  const existingProduct = await findMatchingDocument({
    collection: "products",
    where: {
      and: [{ "wc.wc_id": { equals: wcData.id } }, { lanco: { equals: true } }],
    },
    payload,
  })

  if (logId) {
    await appendToLog(
      payload,
      logId,
      existingProduct
        ? `Found existing product: ${existingProduct.id} - Will UPDATE`
        : "No existing product found - Will CREATE"
    )
  }

  // Map WooCommerce data to Payload format
  const mappedData = await mapWooCommerceToPayload({
    wcData,
    existingProduct,
    event,
  })

  if (logId) {
    await appendToLog(
      payload,
      logId,
      `Mapped product data - Status will be: ${mappedData._status}, Stock: ${
        mappedData.stock ?? "N/A"
      }`
    )
  }

  let productId: string
  let message: string

  if (existingProduct) {
    // Update existing product
    const updatedProduct = await payload.update({
      collection: "products",
      id: existingProduct.id,
      data: mappedData,
    })

    productId = updatedProduct.id
    message = `Product updated: ${mappedData.title} (${
      mappedData._status === "draft"
        ? "OUT OF STOCK - Set to DRAFT"
        : "IN STOCK - Set to PUBLISHED"
    })`

    if (logId) {
      await appendToLog(payload, logId, message)
    }
  } else {
    // Create new product
    const newProduct = await payload.create({
      collection: "products",
      data: mappedData,
    })

    productId = newProduct.id
    message = `Product created: ${mappedData.title} (${
      mappedData._status === "draft"
        ? "OUT OF STOCK - Created as DRAFT"
        : "IN STOCK - Created as PUBLISHED"
    })`

    if (logId) {
      await appendToLog(payload, logId, message)
    }
  }

  // Mark log as successful
  if (logId) {
    await markLogSuccess(payload, logId, message, productId)
  }

  return {
    success: true,
    message,
    productId,
  }
}
