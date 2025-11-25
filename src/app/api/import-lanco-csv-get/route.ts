import { NextRequest, NextResponse } from "next/server"
import getPayloadClient from "~payload/payloadClient"
import { promises as fs } from "fs"

// Force Node.js runtime (required for fs module)
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const DEFAULT_CSV_PATH =
  "/Users/revnelson/Documents/coding/javascript/ronatec/website/src/app/api/import-lanco-exports/wc-product-export-24-11-2025-1764009993018.csv"

/**
 * GET /api/import-lanco-csv-get
 *
 * Import endpoint using GET (works around POST timeout issue)
 */
export async function GET(request: NextRequest) {
  console.log("🎯 Import GET endpoint hit!")

  try {
    const { searchParams } = new URL(request.url)

    const csvPath = searchParams.get("csvPath") || DEFAULT_CSV_PATH
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!, 10)
      : undefined
    const offset = parseInt(searchParams.get("offset") || "0", 10)
    const updateExisting = searchParams.get("updateExisting") !== "false"

    console.log("🚀 Starting Lanco CSV import...")
    console.log("Parameters:", { csvPath, limit, offset, updateExisting })

    // Read CSV file
    console.log(`📄 Reading CSV from: ${csvPath}`)
    const startRead = Date.now()
    const csvContent = await fs.readFile(csvPath, "utf-8")
    const readTime = Date.now() - startRead
    console.log(`✅ CSV read: ${csvContent.length} bytes in ${readTime}ms`)

    // Parse CSV
    console.log("🔍 Parsing CSV...")
    const startParse = Date.now()
    const { parseCSV } = await import("../import-lanco-csv/csvParser")
    const { products: allProducts, errors: parseErrors } = parseCSV(csvContent)
    const parseTime = Date.now() - startParse
    console.log(`✅ Parsed ${allProducts.length} products in ${parseTime}ms`)

    if (parseErrors.length > 0) {
      console.warn(`⚠️  ${parseErrors.length} rows had parsing errors`)
    }

    // Apply offset and limit
    const products = allProducts.slice(
      offset,
      limit ? offset + limit : undefined
    )
    console.log(`📊 Processing ${products.length} products`)

    const payload = await getPayloadClient()

    // Process each product
    const results = {
      created: [] as string[],
      updated: [] as string[],
      skipped: [] as Array<{ sku: string; reason: string }>,
      errors: [] as Array<{ sku: string; error: string }>,
    }

    for (let i = 0; i < products.length; i++) {
      const wcProduct = products[i]
      const progress = `[${i + 1}/${products.length}]`

      try {
        console.log(`${progress} Processing: ${wcProduct.name}`)

        // Check if product exists
        const existingProduct = await payload.find({
          collection: "products",
          where: {
            and: [
              { "wc.wc_id": { equals: wcProduct.id } },
              { lanco: { equals: true } },
            ],
          },
          limit: 1,
        })

        const existing = existingProduct.docs[0]

        if (existing && !updateExisting) {
          console.log(`  ⏭️  Skipping: ${wcProduct.name}`)
          results.skipped.push({
            sku: wcProduct.sku,
            reason: "Already exists",
          })
          continue
        }

        // Map product data
        const { mapWooCommerceToPayload } = await import(
          "../../webhooks/wordpress/lanco/processor/dataMapper"
        )
        const mappedData = await mapWooCommerceToPayload({
          wcData: wcProduct,
          existingProduct: existing || null,
          event: existing ? "updated" : "created",
        })

        if (existing) {
          await payload.update({
            collection: "products",
            id: existing.id,
            data: mappedData,
          })
          console.log(`  ✅ Updated: ${wcProduct.name}`)
          results.updated.push(existing.id)
        } else {
          const newProduct = await payload.create({
            collection: "products",
            data: mappedData,
          })
          console.log(`  ✅ Created: ${wcProduct.name}`)
          results.created.push(newProduct.id)
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown"
        console.error(`  ❌ Error: ${wcProduct.sku}:`, errorMsg)
        results.errors.push({ sku: wcProduct.sku, error: errorMsg })
      }
    }

    console.log("🎉 Import complete!")
    console.log(`  Created: ${results.created.length}`)
    console.log(`  Updated: ${results.updated.length}`)
    console.log(`  Errors: ${results.errors.length}`)

    return NextResponse.json({
      success: true,
      summary: {
        total: products.length,
        created: results.created.length,
        updated: results.updated.length,
        skipped: results.skipped.length,
        errors: results.errors.length,
      },
      results,
      meta: {
        csvPath,
        totalInCSV: allProducts.length,
        offset,
        limit: limit || allProducts.length,
      },
    })
  } catch (error) {
    console.error("💥 Import failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Import failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
