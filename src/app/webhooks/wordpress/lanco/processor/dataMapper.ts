import he from "he"
import probe from "probe-image-size"
import type {
  Product,
  ProductAttributes,
  WCImages,
  WCImageProbe,
} from "~payload-types"
import type { WCWH_Product } from "../../utils/types"
import type { UpdateProduct } from "@lib/types/product"
import findMatchingWCIds from "../../utils/findMatchingWCIds"
import getPayloadClient from "~payload/payloadClient"

export type MappedProductData = UpdateProduct

export interface MapProductOptions {
  wcData: WCWH_Product
  existingProduct?: Product | null
  event: "created" | "updated" | "deleted" | "restored"
}

/**
 * Maps WooCommerce webhook product data to PayloadCMS product format
 * Pure function with no side effects except for async lookups
 */
export async function mapWooCommerceToPayload({
  wcData,
  existingProduct,
  event,
}: MapProductOptions): Promise<MappedProductData> {
  // Determine stock status using both stock_quantity and stock_status
  // CRITICAL: Only products with stock > 0 can be published
  const stockQuantity = wcData.stock_quantity ?? 0
  const isInStock =
    wcData.stock_status === "instock" &&
    stockQuantity > 0 &&
    (!wcData.manage_stock || stockQuantity > 0)

  // Set product status: published ONLY if in stock with quantity > 0
  // Otherwise set to draft (hidden from customers)
  const productStatus = isInStock ? "published" : "draft"

  console.log(
    `[${wcData.sku}] Stock: ${stockQuantity}, Status: ${wcData.stock_status}, Result: ${productStatus}`
  )

  // Map prices (WooCommerce uses string, Payload uses cents as number)
  const regularPrice = wcData.regular_price
    ? Number.parseFloat(wcData.regular_price) * 100
    : undefined

  const salePrice = wcData.sale_price
    ? Number.parseFloat(wcData.sale_price) * 100
    : undefined

  // Map attributes
  const incomingAttributes: ProductAttributes = wcData.attributes
    .map((attribute) => {
      if (attribute.options.length > 0) {
        return {
          label: attribute.name,
          value: he.decode(attribute.options.at(0) || ""),
        }
      }
      return null
    })
    .filter((attr): attr is NonNullable<typeof attr> => attr !== null)

  // Merge with existing attributes (keep attributes not in incoming data)
  const attKeys = new Set(incomingAttributes.map((att) => att.label))
  const attributes: ProductAttributes = [
    ...incomingAttributes,
    ...(existingProduct?.attributes || []).filter(
      (att) => !attKeys.has(att.label)
    ),
  ]

  // Map images with probing for dimensions
  const wcImages: WCImages = await Promise.all(
    wcData.images.map(async (image) => {
      try {
        const probeData: WCImageProbe = await probe(image.src)
        return {
          wc_id: image.id,
          src: image.src,
          alt: image.alt || image.name,
          ...(probeData.width && probeData.height ? { probe: probeData } : {}),
        }
      } catch (error) {
        // If probing fails, return image without dimensions
        return {
          wc_id: image.id,
          src: image.src,
          alt: image.alt || image.name,
        }
      }
    })
  )

  // Find or create matching categories
  const categoryIds: string[] = []
  const missingCategories: string[] = []

  for (const wcCategory of wcData.categories) {
    try {
      // Try to find existing category
      const payload = await getPayloadClient()
      const existing = await payload.find({
        collection: "categories",
        where: { slug: { equals: wcCategory.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        categoryIds.push(existing.docs[0].id)
      } else {
        // Category doesn't exist - try to create it
        console.log(
          `[${wcData.sku}] Creating missing category: ${wcCategory.name} (${wcCategory.slug})`
        )

        try {
          const newCategory = await payload.create({
            collection: "categories",
            data: {
              title: wcCategory.name,
              slug: wcCategory.slug,
              _status: "published",
            },
          })
          categoryIds.push(newCategory.id)
          console.log(`[${wcData.sku}] ✅ Created category: ${wcCategory.name}`)
        } catch (createError) {
          console.error(
            `[${wcData.sku}] ❌ Failed to create category ${wcCategory.name}:`,
            createError
          )
          if (wcCategory.name) missingCategories.push(wcCategory.name)
        }
      }
    } catch (error) {
      console.error(
        `[${wcData.sku}] Error processing category ${wcCategory.name}:`,
        error
      )
      if (wcCategory.name) missingCategories.push(wcCategory.name)
    }
  }

  // Find matching tags
  const tagIds = await findMatchingWCIds({
    collection: "tags",
    where: { slug: { in: wcData.tags.map((tag) => tag.slug) } },
  })

  // Find related product IDs
  const upsellIds = await findMatchingWCIds({
    collection: "products",
    where: {
      or: [{ "wc.wc_id": { in: wcData.upsell_ids } }],
    },
  })

  const crossSellIds = await findMatchingWCIds({
    collection: "products",
    where: {
      or: [{ "wc.wc_id": { in: wcData.cross_sell_ids } }],
    },
  })

  const relatedIds = await findMatchingWCIds({
    collection: "products",
    where: {
      or: [{ "wc.wc_id": { in: wcData.related_ids } }],
    },
  })

  // Determine final product status
  // Force draft if:
  // 1. Out of stock OR
  // 2. Missing required categories (build will fail without categories)
  let finalStatus = productStatus
  if (missingCategories.length > 0) {
    finalStatus = "draft"
    console.log(
      `[${
        wcData.sku
      }] ⚠️  Setting to DRAFT - missing categories: ${missingCategories.join(
        ", "
      )}`
    )
  }

  // Build the complete product data
  const mappedProduct: MappedProductData = {
    ...existingProduct,
    // Preserve existing meta if it exists
    ...(existingProduct?.meta?.title ? { meta: existingProduct.meta } : {}),

    // Core fields
    title: he.decode(wcData.name),
    slug: wcData.slug,
    createdAt: wcData.date_created,

    // Product type
    type: wcData.virtual ? "virtual" : wcData.type,

    // Status (draft if out of stock OR missing categories)
    _status: finalStatus as "published" | "draft",

    // Lanco flag
    lanco: true,

    // Mark as used (Lanco sells used equipment)
    used: true,

    // Visibility
    featured: wcData.featured,

    // Descriptions
    shortDescription: he.decode(wcData.short_description),

    // Inventory
    sku: wcData.sku || wcData.slug,
    manageStock: wcData.manage_stock,
    stock: wcData.stock_quantity ?? undefined,

    // Pricing
    prices: {
      regularPrice,
      salePrice,
    },
    saleStartDate: wcData.date_on_sale_from || undefined,
    saleEndDate: wcData.date_on_sale_to || undefined,

    // Downloads (if applicable)
    downloadable: wcData.downloadable,
    downloadLimit:
      wcData.download_limit === -1 ? undefined : wcData.download_limit,
    downloadExpiry:
      wcData.download_expiry === -1 ? undefined : wcData.download_expiry,

    // Tax
    isTaxable: wcData.tax_status === "taxable",
    taxClass: wcData.tax_class,

    // Shipping
    weight: wcData.weight,
    dimensions: {
      length: wcData.dimensions.length,
      width: wcData.dimensions.width,
      height: wcData.dimensions.height,
    },

    // Relationships (only set if values exist to avoid clearing existing data)
    ...(categoryIds && categoryIds.length > 0
      ? { categories: categoryIds }
      : {}),
    ...(tagIds && tagIds.length > 0 ? { tags: tagIds } : {}),
    ...(upsellIds && upsellIds.length > 0 ? { upsellIds } : {}),
    ...(crossSellIds && crossSellIds.length > 0 ? { crossSellIds } : {}),
    ...(relatedIds && relatedIds.length > 0 ? { relatedIds } : {}),

    // Attributes
    attributes,

    // WooCommerce data
    wc: {
      wc_id: wcData.id,
      description: he.decode(wcData.description),
      images: wcImages,
    },
  }

  return mappedProduct
}
