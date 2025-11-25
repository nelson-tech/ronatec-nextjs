import { NextRequest, NextResponse } from "next/server"
import { getPayloadClient } from "../../../payload/payloadClient"

/**
 * GET /api/import-lanco-exports
 *
 * Iteratively calls /api/lanco-formatted-products endpoint with pagination
 * to process all products 50 at a time and creates them in the database
 *
 * Query Parameters:
 * - filePath: Optional custom CSV file path to pass to lanco-formatted-products
 * - generateMeta: Whether to generate SEO metadata (default: true)
 * - pageLimit: Number of products to process per page (default: 50)
 * - totalLimit: Maximum total number of products to process (optional)
 * - pageOffset: Page number to start from (default: 1, allows resuming imports)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get("filePath") || undefined
    const generateMeta = searchParams.get("generateMeta") !== "false"
    const pageLimit = parseInt(searchParams.get("pageLimit") || "50", 10)
    const pageOffset = parseInt(searchParams.get("pageOffset") || "1", 10)
    const totalLimit = searchParams.get("totalLimit")
      ? parseInt(searchParams.get("totalLimit")!, 10)
      : undefined

    console.log("🚀 Starting iterative Lanco exports import...")
    console.log("Parameters:", {
      filePath,
      generateMeta,
      pageLimit,
      pageOffset,
      totalLimit,
    })

    let totalProcessed = 0
    let currentPage = pageOffset
    let hasNextPage = true
    const baseUrl = "http://localhost:8140"
    const createdProductIds: string[] = []

    const results: Array<{
      page: number
      count: number
      success: boolean
      error?: string
      formattedCount?: number
      createdCount?: number
      creationErrors?: string[]
      productIds?: string[]
    }> = []

    // Iterate through all pages
    while (
      hasNextPage &&
      (totalLimit === undefined || totalProcessed < totalLimit)
    ) {
      try {
        // Calculate how many products to request for this page
        const currentPageLimit =
          totalLimit !== undefined
            ? Math.min(pageLimit, totalLimit - totalProcessed)
            : pageLimit

        console.log(
          `📄 Processing page ${currentPage} (limit: ${currentPageLimit})...`
        )

        // Build URL for the lanco-formatted-products endpoint
        const url = new URL(`${baseUrl}/api/lanco-formatted-products`)
        url.searchParams.set("page", currentPage.toString())
        url.searchParams.set("limit", currentPageLimit.toString())
        url.searchParams.set("generateMeta", generateMeta.toString())
        if (filePath) {
          url.searchParams.set("filePath", filePath)
        }

        // Make the API call
        const response = await fetch(url.toString(), {
          method: "GET",
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(
            `API call failed with status ${response.status}: ${
              errorData.error || "Unknown error"
            }`
          )
        }

        const data = await response.json()

        if (!data.success) {
          console.error(`❌ Page ${currentPage} failed:`, data.error)
          results.push({
            page: currentPage,
            count: 0,
            success: false,
            error: data.error,
          })
          break
        }

        const formattedProducts = data.products || []
        let createdCount = 0
        let creationErrors: string[] = []
        const pageProductIds: string[] = []

        // Get Payload client
        const payload = await getPayloadClient()

        // Create each product in the database
        for (const productData of formattedProducts) {
          try {
            console.log(`📝 Processing product: ${productData.title}`)

            // Check if product with same wc_id and lanco=true exists
            let productId = ""
            let isUpdate = false

            if (productData.wc_id) {
              const existingProducts = await payload.find({
                collection: "products",
                where: {
                  and: [
                    {
                      wc_id: {
                        equals: productData.wc_id,
                      },
                    },
                    {
                      lanco: {
                        equals: true,
                      },
                    },
                  ],
                },
              })

              // If product exists, update it
              if (existingProducts.docs.length > 0) {
                const existingProduct = existingProducts.docs[0]
                productId = existingProduct.id as string

                console.log(
                  `🔄 Updating existing product: ${productData.title} (ID: ${productId})`
                )

                await payload.update({
                  collection: "products",
                  id: productId,
                  data: {
                    ...productData,
                    lanco: true,
                    _status: "published",
                  },
                })

                isUpdate = true
                console.log(
                  `✅ Updated product: ${productData.title} (ID: ${productId})`
                )
              }
            }

            // If no existing product found, create a new one
            if (!isUpdate) {
              const createdProduct = await payload.create({
                collection: "products",
                data: {
                  ...productData,
                  lanco: true, // Mark as Lanco product
                  _status: "published",
                },
              })

              productId = createdProduct.id as string
              console.log(
                `✅ Created product: ${productData.title} (ID: ${productId})`
              )
            }

            pageProductIds.push(productId)
            createdProductIds.push(productId)
            createdCount++
          } catch (error) {
            const errorMsg = `Failed to create product "${
              productData.title
            }": ${error instanceof Error ? error.message : "Unknown error"}`
            console.error(`❌ ${errorMsg}`)
            creationErrors.push(errorMsg)
          }
        }

        const pageCount = formattedProducts.length
        totalProcessed += createdCount

        results.push({
          page: currentPage,
          count: createdCount,
          success: true,
          formattedCount: pageCount,
          createdCount,
          creationErrors:
            creationErrors.length > 0 ? creationErrors : undefined,
          productIds: pageProductIds,
        })

        console.log(
          `✅ Page ${currentPage} processed: ${createdCount}/${pageCount} products created (Total: ${totalProcessed})`
        )

        // Check if there are more pages
        hasNextPage = data.pagination?.hasNextPage || false
        currentPage++

        if (pageCount === 0) {
          // If we got 0 products, we've reached the end
          hasNextPage = false
        }
      } catch (error) {
        console.error(`💥 Error processing page ${currentPage}:`, error)
        results.push({
          page: currentPage,
          count: 0,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        })
        break
      }
    }

    const successfulPages = results.filter((r) => r.success).length
    const failedPages = results.filter((r) => !r.success).length
    const nextPageOffset = currentPage // This will be the next page to process

    console.log(`🎉 Import completed!`)
    console.log(`📊 Total products created: ${totalProcessed}`)
    console.log(`📄 Pages processed: ${successfulPages}/${results.length}`)
    console.log(`🔄 Resume from page offset: ${nextPageOffset}`)

    return NextResponse.json({
      success: true,
      totalProcessed,
      pagesProcessed: successfulPages,
      totalPages: results.length,
      failedPages,
      results,
      createdProductIds,
      nextPageOffset,
      summary: {
        totalProductsCreated: totalProcessed,
        pagesSuccessful: successfulPages,
        pagesFailed: failedPages,
        pageSize: pageLimit,
        startedFromPage: pageOffset,
        nextPageToProcess: nextPageOffset,
      },
      meta: {
        timestamp: new Date().toISOString(),
        parameters: {
          filePath: filePath || "default",
          generateMeta,
          pageSize: pageLimit,
          pageOffset,
          totalLimit,
        },
      },
    })
  } catch (error) {
    console.error(
      "💥 Unexpected error in import-lanco-exports endpoint:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error occurred during import",
        details: error instanceof Error ? error.message : "Unknown error",
        totalProcessed: 0,
        createdProductIds: [],
        nextPageOffset: 1,
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/import-lanco-exports
 *
 * Same as GET but allows for more complex configuration via request body
 * Creates products in the database for each formatted product
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const {
      filePath,
      generateMeta = true,
      pageSize = 50,
      pageOffset = 1,
      ...otherOptions
    } = body

    console.log("🚀 Starting iterative Lanco exports import (POST)...")
    console.log("Body parameters:", {
      filePath,
      generateMeta,
      pageSize,
      pageOffset,
      otherOptions,
    })

    let totalProcessed = 0
    let currentPage = pageOffset
    let hasNextPage = true
    const baseUrl = new URL(request.url).origin
    const createdProductIds: string[] = []

    const results: Array<{
      page: number
      count: number
      success: boolean
      error?: string
      formattedCount?: number
      createdCount?: number
      creationErrors?: string[]
      productIds?: string[]
    }> = []

    // Iterate through all pages
    while (hasNextPage) {
      try {
        console.log(`📄 Processing page ${currentPage} (limit: ${pageSize})...`)

        // Make POST request to lanco-formatted-products endpoint
        const response = await fetch(
          `${baseUrl}/api/lanco-formatted-products`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              page: currentPage,
              limit: pageSize,
              filePath,
              generateMeta,
              ...otherOptions,
            }),
          }
        )

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(
            `API call failed with status ${response.status}: ${
              errorData.error || "Unknown error"
            }`
          )
        }

        const data = await response.json()

        if (!data.success) {
          console.error(`❌ Page ${currentPage} failed:`, data.error)
          results.push({
            page: currentPage,
            count: 0,
            success: false,
            error: data.error,
          })
          break
        }

        const formattedProducts = data.products || []
        let createdCount = 0
        let creationErrors: string[] = []
        const pageProductIds: string[] = []

        // Get Payload client
        const payload = await getPayloadClient()

        // Create each product in the database
        for (const productData of formattedProducts) {
          try {
            console.log(`📝 Processing product: ${productData.title}`)

            // Check if product with same wc_id and lanco=true exists
            let productId = ""
            let isUpdate = false

            if (productData.wc_id) {
              const existingProducts = await payload.find({
                collection: "products",
                where: {
                  and: [
                    {
                      wc_id: {
                        equals: productData.wc_id,
                      },
                    },
                    {
                      lanco: {
                        equals: true,
                      },
                    },
                  ],
                },
              })

              // If product exists, update it
              if (existingProducts.docs.length > 0) {
                const existingProduct = existingProducts.docs[0]
                productId = existingProduct.id as string

                console.log(
                  `🔄 Updating existing product: ${productData.title} (ID: ${productId})`
                )

                await payload.update({
                  collection: "products",
                  id: productId,
                  data: {
                    ...productData,
                    lanco: true,
                    _status: "published",
                  },
                })

                isUpdate = true
                console.log(
                  `✅ Updated product: ${productData.title} (ID: ${productId})`
                )
              }
            }

            // If no existing product found, create a new one
            if (!isUpdate) {
              const createdProduct = await payload.create({
                collection: "products",
                data: {
                  ...productData,
                  lanco: true, // Mark as Lanco product
                  _status: "published",
                },
              })

              productId = createdProduct.id as string
              console.log(
                `✅ Created product: ${productData.title} (ID: ${productId})`
              )
            }

            pageProductIds.push(productId)
            createdProductIds.push(productId)
            createdCount++
          } catch (error) {
            const errorMsg = `Failed to create product "${
              productData.title
            }": ${error instanceof Error ? error.message : "Unknown error"}`
            console.error(`❌ ${errorMsg}`)
            creationErrors.push(errorMsg)
          }
        }

        const pageCount = formattedProducts.length
        totalProcessed += createdCount

        results.push({
          page: currentPage,
          count: createdCount,
          success: true,
          formattedCount: pageCount,
          createdCount,
          creationErrors:
            creationErrors.length > 0 ? creationErrors : undefined,
          productIds: pageProductIds,
        })

        console.log(
          `✅ Page ${currentPage} processed: ${createdCount}/${pageCount} products created (Total: ${totalProcessed})`
        )

        // Check if there are more pages
        hasNextPage = data.pagination?.hasNextPage || false
        currentPage++

        if (pageCount === 0) {
          // If we got 0 products, we've reached the end
          hasNextPage = false
        }
      } catch (error) {
        console.error(`💥 Error processing page ${currentPage}:`, error)
        results.push({
          page: currentPage,
          count: 0,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        })
        break
      }
    }

    const successfulPages = results.filter((r) => r.success).length
    const failedPages = results.filter((r) => !r.success).length
    const nextPageOffset = currentPage // This will be the next page to process

    console.log(`🎉 Import completed!`)
    console.log(`📊 Total products created: ${totalProcessed}`)
    console.log(`📄 Pages processed: ${successfulPages}/${results.length}`)
    console.log(`🔄 Resume from page offset: ${nextPageOffset}`)

    return NextResponse.json({
      success: true,
      totalProcessed,
      pagesProcessed: successfulPages,
      totalPages: results.length,
      failedPages,
      results,
      createdProductIds,
      nextPageOffset,
      summary: {
        totalProductsCreated: totalProcessed,
        pagesSuccessful: successfulPages,
        pagesFailed: failedPages,
        pageSize,
        startedFromPage: pageOffset,
        nextPageToProcess: nextPageOffset,
      },
      meta: {
        timestamp: new Date().toISOString(),
        parameters: {
          filePath: filePath || "default",
          generateMeta,
          pageSize,
          pageOffset,
          ...otherOptions,
        },
      },
    })
  } catch (error) {
    console.error(
      "💥 Unexpected error in import-lanco-exports endpoint (POST):",
      error
    )

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error occurred during import",
        details: error instanceof Error ? error.message : "Unknown error",
        totalProcessed: 0,
        createdProductIds: [],
        nextPageOffset: 1,
      },
      { status: 500 }
    )
  }
}
