import { NextRequest, NextResponse } from "next/server"
import getPayloadClient from "~payload/payloadClient"
import type { Product } from "~payload-types"
import type { PaginatedDocs } from "payload/dist/database/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dateParam = searchParams.get("date")
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "10", 10)

    if (!dateParam) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      )
    }

    // Validate and parse the date
    const targetDate = new Date(dateParam)
    if (isNaN(targetDate.getTime())) {
      return NextResponse.json(
        {
          error:
            "Invalid date format. Please use ISO 8601 format (e.g., 2024-01-01T00:00:00.000Z)",
        },
        { status: 400 }
      )
    }

    const payload = await getPayloadClient()

    // Query products where lanco equals true and updatedAt is prior to the given date
    const result: PaginatedDocs<Product> = await payload.find({
      collection: "products",
      where: {
        and: [
          { lanco: { equals: true } },
          { updatedAt: { greater_than: targetDate.toISOString() } },
        ],
      },
      page,
      limit,
      sort: "-updatedAt", // Sort by most recently updated first
    })

    return NextResponse.json({
      success: true,
      data: {
        docs: result.docs,
        totalDocs: result.totalDocs,
        limit: result.limit,
        totalPages: result.totalPages,
        page: result.page,
        pagingCounter: result.pagingCounter,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
      },
    })
  } catch (error) {
    console.error("Error fetching lanco products:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
