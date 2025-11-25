import { NextResponse } from "next/server"
import getPayloadClient from "~payload/payloadClient"

/**
 * DELETE /api/delete-lanco-products
 *
 * Deletes all products where lanco=true
 * Use with caution - this is irreversible!
 *
 * Query Parameters:
 * - confirm: Must be set to "yes" to proceed with deletion
 * - dryRun: Set to "true" to see what would be deleted without actually deleting
 */
export async function DELETE(req: Request) {
  //   try {
  //     const { searchParams } = new URL(req.url)
  //     const confirm = searchParams.get("confirm")
  //     const dryRun = searchParams.get("dryRun") === "true"

  //     // Safety check - require confirmation
  //     if (confirm !== "yes" && !dryRun) {
  //       return NextResponse.json(
  //         {
  //           error: "Confirmation required",
  //           message:
  //             "To delete all Lanco products, add query parameter: ?confirm=yes",
  //           hint: "Or use ?dryRun=true to see what would be deleted",
  //         },
  //         { status: 400 }
  //       )
  //     }

  //     const payload = await getPayloadClient()

  //     // Find all Lanco products
  //     console.log("🔍 Finding all Lanco products...")
  //     const lancoProducts = await payload.find({
  //       collection: "products",
  //       where: {
  //         lanco: {
  //           equals: true,
  //         },
  //       },
  //       limit: 10000, // High limit to get all products
  //     })

  //     const productCount = lancoProducts.docs.length
  //     console.log(`📊 Found ${productCount} Lanco products`)

  //     if (productCount === 0) {
  //       return NextResponse.json({
  //         success: true,
  //         message: "No Lanco products found to delete",
  //         count: 0,
  //         products: [],
  //       })
  //     }

  //     // If dry run, just return what would be deleted
  //     if (dryRun) {
  //       const productList = lancoProducts.docs.map((product) => ({
  //         id: product.id,
  //         title: product.title,
  //         sku: product.sku,
  //         wc_id: product.wc?.wc_id,
  //       }))

  //       return NextResponse.json({
  //         success: true,
  //         dryRun: true,
  //         message: `Would delete ${productCount} Lanco products`,
  //         count: productCount,
  //         products: productList,
  //         hint: "To actually delete these products, use: ?confirm=yes",
  //       })
  //     }

  //     // Actually delete the products
  //     console.log(`🗑️  Deleting ${productCount} Lanco products...`)
  //     const deletedIds: string[] = []
  //     const errors: Array<{ id: string; title: string; error: string }> = []

  //     for (const product of lancoProducts.docs) {
  //       try {
  //         await payload.delete({
  //           collection: "products",
  //           id: product.id,
  //         })
  //         deletedIds.push(product.id)
  //         console.log(`✅ Deleted: ${product.title} (${product.id})`)
  //       } catch (error) {
  //         const errorMsg =
  //           error instanceof Error ? error.message : "Unknown error"
  //         errors.push({
  //           id: product.id,
  //           title: product.title || "Unknown",
  //           error: errorMsg,
  //         })
  //         console.error(`❌ Failed to delete ${product.title}:`, errorMsg)
  //       }
  //     }

  //     console.log(
  //       `✅ Deletion complete: ${deletedIds.length} deleted, ${errors.length} errors`
  //     )

  //     return NextResponse.json({
  //       success: true,
  //       message: `Successfully deleted ${deletedIds.length} Lanco products`,
  //       count: deletedIds.length,
  //       deletedIds,
  //       errors: errors.length > 0 ? errors : undefined,
  //       summary: {
  //         total: productCount,
  //         deleted: deletedIds.length,
  //         failed: errors.length,
  //       },
  //     })
  //   } catch (error) {
  //     console.error("💥 Error deleting Lanco products:", error)
  return NextResponse.json(
    {
      success: false,
      error: "Failed to delete Lanco products",
      // details: error instanceof Error ? error.message : "Unknown error",
    },
    { status: 500 }
  )
  //   }
}
