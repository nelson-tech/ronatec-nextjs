import { NextRequest, NextResponse } from "next/server"
import getPayloadClient from "~payload/payloadClient"
import { promises as fs } from "fs"
import path from "path"

// Force Node.js runtime (required for fs module)
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

console.log("✅ Import endpoint module loaded successfully")

const DEFAULT_CSV_PATH =
  "/Users/revnelson/Documents/coding/javascript/ronatec/website/src/app/api/import-lanco-exports/wc-product-export-24-11-2025-1764009993018.csv"

/**
 * POST /api/import-lanco-csv
 *
 * Imports products from a WooCommerce CSV export file
 * Uses the new dataMapper for consistent product formatting
 *
 * Body Parameters:
 * - csvPath: Optional path to CSV file (defaults to latest Lanco export)
 * - limit: Maximum number of products to import (optional)
 * - offset: Number of products to skip (optional)
 * - updateExisting: Whether to update existing products (default: true)
 */
export async function POST(request: NextRequest) {
  console.log("🎯 POST Import endpoint hit! Starting processing...")

  // Add timeout wrapper to prevent hanging
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timeout after 30s")), 30000)
  })

  //   try {
  //     console.log("📥 Parsing request body...")
  //     const body = (await Promise.race([
  //       request.json().catch((e) => {
  //         console.error("Failed to parse request body:", e)
  //         return {}
  //       }),
  //       timeoutPromise,
  //     ])) as any

  //     const {
  //       csvPath = DEFAULT_CSV_PATH,
  //       limit,
  //       offset = 0,
  //       updateExisting = true,
  //     } = body

  //     console.log("🚀 Starting Lanco CSV import...")
  //     console.log("Parameters:", { csvPath, limit, offset, updateExisting })

  //     // Quick test mode
  //     if (body.testMode === true) {
  //       console.log("🧪 Test mode - returning early")
  //       return NextResponse.json({
  //         success: true,
  //         testMode: true,
  //         message: "POST handler works",
  //       })
  //     }

  //     // Read CSV file
  //     console.log(`📄 Reading CSV from: ${csvPath}`)
  //     let csvContent: string
  //     try {
  //       const startRead = Date.now()
  //       csvContent = await fs.readFile(csvPath, "utf-8")
  //       const readTime = Date.now() - startRead
  //       console.log(`✅ CSV read: ${csvContent.length} bytes in ${readTime}ms`)
  //     } catch (readError) {
  //       console.error("❌ Failed to read CSV file:", readError)
  //       throw new Error(
  //         `Failed to read CSV file: ${
  //           readError instanceof Error ? readError.message : "Unknown error"
  //         }`
  //       )
  //     }

  //     // Parse CSV
  //     console.log("🔍 Parsing CSV (importing parser)...")
  //     const { parseCSV } = await import("./csvParser")
  //     console.log("✅ Parser imported")
  //     const { products: allProducts, errors: parseErrors } = parseCSV(csvContent)
  //     console.log(`✅ Parsed ${allProducts.length} products`)

  //     if (parseErrors.length > 0) {
  //       console.warn(
  //         `⚠️  ${parseErrors.length} rows had parsing errors:`,
  //         parseErrors.slice(0, 5)
  //       )
  //     }

  //     // Apply offset and limit
  //     const products = allProducts.slice(
  //       offset,
  //       limit ? offset + limit : undefined
  //     )
  //     console.log(
  //       `📊 Processing ${products.length} products (offset: ${offset}, limit: ${
  //         limit || "none"
  //       })`
  //     )

  //     const payload = await getPayloadClient()

  //     // Process each product
  //     const results = {
  //       created: [] as string[],
  //       updated: [] as string[],
  //       skipped: [] as Array<{ sku: string; reason: string }>,
  //       errors: [] as Array<{ sku: string; error: string }>,
  //     }

  //     for (let i = 0; i < products.length; i++) {
  //       const wcProduct = products[i]
  //       const progress = `[${i + 1}/${products.length}]`

  //       try {
  //         console.log(
  //           `${progress} Processing: ${wcProduct.name} (${wcProduct.sku})`
  //         )

  //         // Check if product exists
  //         const existingProduct = await payload.find({
  //           collection: "products",
  //           where: {
  //             and: [
  //               {
  //                 "wc.wc_id": {
  //                   equals: wcProduct.id,
  //                 },
  //               },
  //               {
  //                 lanco: {
  //                   equals: true,
  //                 },
  //               },
  //             ],
  //           },
  //           limit: 1,
  //         })

  //         const existing = existingProduct.docs[0]

  //         if (existing && !updateExisting) {
  //           console.log(`  ⏭️  Skipping existing product: ${wcProduct.name}`)
  //           results.skipped.push({
  //             sku: wcProduct.sku,
  //             reason: "Already exists (updateExisting=false)",
  //           })
  //           continue
  //         }

  //         // Map product data using the new dataMapper
  //         const { mapWooCommerceToPayload } = await import(
  //           "../../webhooks/wordpress/lanco/processor/dataMapper"
  //         )
  //         const mappedData = await mapWooCommerceToPayload({
  //           wcData: wcProduct,
  //           existingProduct: existing || null,
  //           event: existing ? "updated" : "created",
  //         })

  //         if (existing) {
  //           // Update existing product
  //           await payload.update({
  //             collection: "products",
  //             id: existing.id,
  //             data: mappedData,
  //           })
  //           console.log(`  ✅ Updated: ${wcProduct.name}`)
  //           results.updated.push(existing.id)
  //         } else {
  //           // Create new product
  //           const newProduct = await payload.create({
  //             collection: "products",
  //             data: mappedData,
  //           })
  //           console.log(`  ✅ Created: ${wcProduct.name}`)
  //           results.created.push(newProduct.id)
  //         }
  //       } catch (error) {
  //         const errorMsg =
  //           error instanceof Error ? error.message : "Unknown error"
  //         console.error(`  ❌ Error processing ${wcProduct.sku}:`, errorMsg)
  //         results.errors.push({
  //           sku: wcProduct.sku,
  //           error: errorMsg,
  //         })
  //       }
  //     }

  //     const totalProcessed = results.created.length + results.updated.length
  //     console.log("🎉 Import complete!")
  //     console.log(`  Created: ${results.created.length}`)
  //     console.log(`  Updated: ${results.updated.length}`)
  //     console.log(`  Skipped: ${results.skipped.length}`)
  //     console.log(`  Errors: ${results.errors.length}`)

  //     return NextResponse.json({
  //       success: true,
  //       summary: {
  //         total: products.length,
  //         created: results.created.length,
  //         updated: results.updated.length,
  //         skipped: results.skipped.length,
  //         errors: results.errors.length,
  //       },
  //       results,
  //       parseErrors:
  //         parseErrors.length > 0 ? parseErrors.slice(0, 10) : undefined,
  //       meta: {
  //         csvPath,
  //         totalInCSV: allProducts.length,
  //         offset,
  //         limit: limit || allProducts.length,
  //       },
  //     })
  //   } catch (error) {
  //     console.error("💥 Import failed:", error)
  return NextResponse.json(
    {
      success: false,
      error: "Import failed",
      // details: error instanceof Error ? error.message : "Unknown error",
    },
    { status: 500 }
  )
  //   }
}

/**
 * GET /api/import-lanco-csv
 *
 * Health check and info endpoint
 */
export async function GET(request: NextRequest) {
  console.log("🎯 GET endpoint hit!")

  try {
    const { searchParams } = new URL(request.url)

    // If test parameter, just return status
    if (searchParams.get("test") === "true") {
      return NextResponse.json({
        status: "ok",
        message: "Import endpoint is accessible",
        defaultCsvPath: DEFAULT_CSV_PATH,
        runtime: "nodejs",
      })
    }

    const body = {
      csvPath: searchParams.get("csvPath") || undefined,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit")!, 10)
        : undefined,
      offset: searchParams.get("offset")
        ? parseInt(searchParams.get("offset")!, 10)
        : 0,
      updateExisting: searchParams.get("updateExisting") !== "false",
    }

    console.log("Forwarding GET to POST with body:", body)

    // Convert to POST request
    const response = await POST(
      new NextRequest(request.url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
    )

    return response
  } catch (error) {
    console.error("GET error:", error)
    return NextResponse.json(
      {
        error: "GET handler failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
