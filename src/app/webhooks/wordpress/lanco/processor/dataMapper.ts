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
  const isInStock =
    wcData.stock_status === "instock" &&
    (!wcData.manage_stock || (wcData.stock_quantity ?? 0) > 0)

  // Set product status based on stock
  const productStatus = isInStock ? "published" : "draft"

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

  // Find matching categories
  const categoryIds = await findMatchingWCIds({
    collection: "categories",
    where: { slug: { in: wcData.categories.map((cat) => cat.slug) } },
  })

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

    // Status (draft if out of stock, published if in stock)
    _status: productStatus as "published" | "draft",

    // Lanco flag
    lanco: true,

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

    // Relationships
    categories: categoryIds,
    tags: tagIds,
    upsellIds,
    crossSellIds,
    relatedIds,

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
