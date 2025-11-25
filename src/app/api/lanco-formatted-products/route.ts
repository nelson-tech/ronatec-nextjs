import { NextRequest, NextResponse } from "next/server"
import { improvedProductFormatter } from "../../webhooks/wordpress/utils/improvedProductFormatter"

/**
 * GET /api/lanco-formatted-products
 *
 * Imports products from CSV, formats them for Payload schema, and returns as JSON
 *
 * Query Parameters:
 * - filePath: Optional custom CSV file path
 * - generateMeta: Whether to generate SEO metadata (default: true)
 * - limit: Optional limit on number of products to return (default: 10)
 * - page: Page number for pagination (1-indexed, works with limit)
 * - offset: Offset for pagination (0-indexed, alternative to page)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Extract query parameters
    const filePath = searchParams.get("filePath") || undefined
    const generateMeta = searchParams.get("generateMeta") !== "false" // default true
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page")!)
      : undefined
    const offset = searchParams.get("offset")
      ? parseInt(searchParams.get("offset")!)
      : undefined

    console.log("🚀 Starting Lanco product formatting...")
    console.log("Parameters:", { filePath, generateMeta, limit, page, offset })

    // Call the improved product formatter
    const result = await improvedProductFormatter({
      filePath,
      lanco: true, // Always true for Lanco endpoint
      generateMeta,
      limit,
      page,
      offset,
    })

    if (!result.success) {
      console.error("❌ Product formatting failed:", result.error)
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to format products",
          count: 0,
          totalCount: 0,
          products: [],
        },
        { status: 500 }
      )
    }

    const products = result.products

    // Calculate pagination metadata
    const actualLimit = limit || 10
    const currentPage =
      page || (offset !== undefined ? Math.floor(offset / actualLimit) + 1 : 1)
    const totalPages = Math.ceil(result.totalCount / actualLimit)
    const hasNextPage = currentPage < totalPages
    const hasPrevPage = currentPage > 1
    const actualOffset =
      offset !== undefined ? offset : (currentPage - 1) * actualLimit

    console.log(`✅ Successfully formatted ${products.length} products`)

    // Return successful response with pagination metadata
    return NextResponse.json({
      success: true,
      count: products.length,
      totalCount: result.totalCount,
      products,
      pagination: {
        page: currentPage,
        limit: actualLimit,
        offset: actualOffset,
        totalPages,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? currentPage + 1 : null,
        prevPage: hasPrevPage ? currentPage - 1 : null,
      },
      ...(result.error ? { warnings: result.error } : {}),
      meta: {
        timestamp: new Date().toISOString(),
        parameters: {
          filePath: filePath || "default",
          generateMeta,
          limit: actualLimit,
          page: currentPage,
          offset: actualOffset,
          lanco: true,
        },
      },
    })
  } catch (error) {
    console.error(
      "💥 Unexpected error in lanco-formatted-products endpoint:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error occurred while formatting products",
        details: error instanceof Error ? error.message : "Unknown error",
        count: 0,
        totalCount: 0,
        products: [],
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/lanco-formatted-products
 *
 * Same as GET but allows for more complex configuration via request body
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))

    const {
      filePath,
      generateMeta = true,
      limit,
      page,
      offset,
      ...otherOptions
    } = body

    console.log("🚀 Starting Lanco product formatting (POST)...")
    console.log("Body parameters:", {
      filePath,
      generateMeta,
      limit,
      page,
      offset,
      otherOptions,
    })

    // Call the improved product formatter
    const result = await improvedProductFormatter({
      filePath,
      lanco: true, // Always true for Lanco endpoint
      generateMeta,
      limit,
      page,
      offset,
      ...otherOptions,
    })

    if (!result.success) {
      console.error("❌ Product formatting failed:", result.error)
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to format products",
          count: 0,
          totalCount: 0,
          products: [],
        },
        { status: 500 }
      )
    }

    const products = result.products

    // Calculate pagination metadata
    const actualLimit = limit || 10
    const currentPage =
      page || (offset !== undefined ? Math.floor(offset / actualLimit) + 1 : 1)
    const totalPages = Math.ceil(result.totalCount / actualLimit)
    const hasNextPage = currentPage < totalPages
    const hasPrevPage = currentPage > 1
    const actualOffset =
      offset !== undefined ? offset : (currentPage - 1) * actualLimit

    console.log(`✅ Successfully formatted ${products.length} products`)

    // Return successful response with pagination metadata
    return NextResponse.json({
      success: true,
      count: products.length,
      totalCount: result.totalCount,
      products,
      pagination: {
        page: currentPage,
        limit: actualLimit,
        offset: actualOffset,
        totalPages,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? currentPage + 1 : null,
        prevPage: hasPrevPage ? currentPage - 1 : null,
      },
      ...(result.error ? { warnings: result.error } : {}),
      meta: {
        timestamp: new Date().toISOString(),
        parameters: {
          filePath: filePath || "default",
          generateMeta,
          limit: actualLimit,
          page: currentPage,
          offset: actualOffset,
          lanco: true,
          ...otherOptions,
        },
      },
    })
  } catch (error) {
    console.error(
      "💥 Unexpected error in lanco-formatted-products endpoint (POST):",
      error
    )

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error occurred while formatting products",
        details: error instanceof Error ? error.message : "Unknown error",
        count: 0,
        totalCount: 0,
        products: [],
      },
      { status: 500 }
    )
  }
}
