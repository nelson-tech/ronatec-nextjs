import { Product } from "payload/generated-types"
import { WCWH_Product } from "./types"
import { UpdateProduct } from "@lib/types/product"
import { Payload } from "payload"
import he from "he"
import { WCProduct } from "~payload/collections/Products/wcProductType"

type FormatProductArgs = {
  existingProduct?: Product | null
  lanco?: boolean
  payload: Payload
} & (
  | { incoming: WCWH_Product; webhook: true }
  | { incoming: WCProduct; webhook: false }
)

const formatProduct = async ({
  incoming,
  existingProduct,
  lanco,
  payload,
  webhook,
}: FormatProductArgs) => {
  const categoryMatches = await payload.find({
    collection: "categories",
    where: { slug: { in: incoming.categories.map((cat) => cat.slug) } },
  })

  const categoryIds = categoryMatches.docs
    .map((cat) => cat.id)
    .filter((catId) => !!catId)

  if (categoryIds.length === 0) {
    // TODO: Alert with product info
    //payload.email()
  }

  const tagMatches = await payload.find({
    collection: "tags",
    where: { slug: { in: incoming.tags.map((tag) => tag.slug) } },
  })

  const tagIds = tagMatches.docs.map((tag) => tag.id).filter((tagId) => !!tagId)

  const regularPrice = webhook
    ? incoming.regular_price
      ? Number.parseInt(incoming.regular_price)
      : undefined
    : incoming.prices.regular_price
    ? Number.parseInt(incoming.prices.regular_price)
    : undefined

  const salePrice = webhook
    ? incoming.sale_price
      ? Number.parseInt(incoming.sale_price)
      : undefined
    : incoming.prices.sale_price
    ? Number.parseInt(incoming.prices.sale_price)
    : undefined

  const product: UpdateProduct = {
    ...existingProduct,
    ...(lanco ? { lanco } : {}),
    title: he.decode(incoming.name),
    slug: incoming.slug,
    createdAt: webhook ? incoming.date_created : undefined,
    type: webhook
      ? incoming.virtual
        ? "virtual"
        : incoming.type
      : incoming.type,
    _status: webhook
      ? incoming.status === "publish"
        ? "published"
        : ["draft", "pending"].includes(incoming.status)
        ? "draft"
        : undefined
      : "published",
    featured: webhook ? incoming.featured : undefined,
    shortDescription: he.decode(incoming.short_description),
    sku: incoming.sku || incoming.slug,
    saleStartDate: webhook
      ? incoming.date_on_sale_from || undefined
      : undefined,
    saleEndDate: webhook ? incoming.date_on_sale_to || undefined : undefined,
    downloadable: webhook ? incoming.downloadable : undefined,
    downloadLimit: webhook
      ? incoming.download_limit === -1
        ? undefined
        : incoming.download_limit
      : undefined,
    downloadExpiry: webhook
      ? incoming.download_expiry === -1
        ? undefined
        : incoming.download_expiry
      : undefined,
    isTaxable: webhook ? incoming.tax_status === "taxable" : undefined,
    taxClass: webhook ? incoming.tax_class : undefined,
    manageStock: webhook
      ? incoming.manage_stock
      : incoming.low_stock_remaining !== null ||
        incoming.add_to_cart.maximum !== 9999,
    stock: webhook
      ? incoming.stock_quantity || undefined
      : incoming.low_stock_remaining !== null
      ? incoming.low_stock_remaining
      : incoming.add_to_cart.maximum !== 9999
      ? incoming.add_to_cart.maximum
      : undefined,
    weight: webhook ? incoming.weight : undefined,
    dimensions: webhook
      ? {
          length: incoming.dimensions.length,
          width: incoming.dimensions.width,
          height: incoming.dimensions.height,
        }
      : undefined,
    categories: categoryIds,
    tags: tagIds,
    prices: {
      regularPrice: lanco && regularPrice ? regularPrice * 0.97 : regularPrice,
      salePrice: lanco && salePrice ? salePrice * 0.97 : salePrice,
    },
    wc: {
      wc_id: incoming.id,
      description: he.decode(incoming.description),
      images: incoming.images.map((image) => ({
        wc_id: image.id,
        src: image.src,
        alt: image.alt || image.name,
      })),
      attributes: incoming.attributes.map((attribute) => {
        const { id: wc_id, ...rest } = attribute

        return { wc_id, ...rest }
      }),
    },
    // TODO: Improve attributes/variations
  }

  return product
}

export default formatProduct
