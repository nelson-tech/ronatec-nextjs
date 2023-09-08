import { Product, ProductAttributes } from "~payload-types"
import { WCWH_Product } from "./types"
import { UpdateProduct } from "@lib/types/product"
import he from "he"
import { WCProduct } from "~payload/collections/Products/wcProductType"
import findMatchingWCIds from "./findMatchingWCIds"
import generateMetadata from "./generateMetadata"

type FormatProductArgs = {
  existingProduct?: Product | null
  lanco?: boolean
} & (
  | { incoming: WCWH_Product; webhook: true }
  | { incoming: WCProduct; webhook: false }
)

const formatProduct = async ({
  incoming,
  existingProduct,
  lanco,
  webhook,
}: FormatProductArgs) => {
  // TODO: Update SEO fields

  // Find matching tags
  const tagIds = await findMatchingWCIds({
    collection: "tags",
    where: { slug: { in: incoming.tags.map((tag) => tag.slug) } },
  })

  // Format prices
  const regularPrice = webhook
    ? incoming.regular_price
      ? Number.parseFloat(incoming.regular_price) * 100
      : undefined
    : incoming.prices.regular_price
    ? Number.parseInt(incoming.prices.regular_price)
    : undefined

  const salePrice = webhook
    ? incoming.sale_price
      ? Number.parseFloat(incoming.sale_price) * 100
      : undefined
    : incoming.prices.sale_price
    ? Number.parseInt(incoming.prices.sale_price)
    : undefined

  // Format attributes
  const incomingAttributes: ProductAttributes = incoming.attributes
    .map((attribute) => {
      if (webhook) {
        const wcwhAtt = attribute as WCWH_Product["attributes"][number]

        if (wcwhAtt.options.length > 0) {
          return {
            label: wcwhAtt.name,
            value: he.decode(wcwhAtt.options.at(0)),
          }
        }
      }
      const wcAtt = attribute as WCProduct["attributes"][number]

      if (wcAtt.terms.length > 0) {
        return {
          label: wcAtt.name,
          value: he.decode(wcAtt.terms.at(0)?.name),
        } as ProductAttributes[0]
      }
    })
    .filter(
      (
        attribute: ProductAttributes[0] | undefined
      ): attribute is ProductAttributes[0] => !!attribute
    )

  const attKeys = new Set(incomingAttributes.map((att) => att.label))

  const attributes: ProductAttributes = [
    ...incomingAttributes,
    ...(existingProduct?.attributes || []).filter(
      (att) => !attKeys.has(att.label)
    ),
  ]

  // Format final product
  const product: UpdateProduct = {
    ...existingProduct,
    ...(lanco ? { lanco } : {}),
    ...(existingProduct?.meta?.title ? { meta: existingProduct.meta } : {}),
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
    categories: await findMatchingWCIds({
      collection: "categories",
      where: { slug: { in: incoming.categories.map((cat) => cat.slug) } },
    }),
    tags: tagIds,
    prices: {
      regularPrice: lanco && regularPrice ? regularPrice * 0.97 : regularPrice,
      salePrice: lanco && salePrice ? salePrice * 0.97 : salePrice,
    },
    upsellIds: webhook
      ? await findMatchingWCIds({
          collection: "products",
          where: {
            or: [{ "wc.wc_id": { in: (incoming as WCWH_Product).upsell_ids } }],
          },
        })
      : undefined,
    crossSellIds: webhook
      ? await findMatchingWCIds({
          collection: "products",
          where: {
            or: [
              { "wc.wc_id": { in: (incoming as WCWH_Product).cross_sell_ids } },
            ],
          },
        })
      : undefined,
    relatedIds: webhook
      ? await findMatchingWCIds({
          collection: "products",
          where: {
            or: [
              { "wc.wc_id": { in: (incoming as WCWH_Product).related_ids } },
            ],
          },
        })
      : undefined,
    attributes,
    wc: {
      wc_id: incoming.id,
      description: he.decode(incoming.description),
      images: incoming.images.map((image) => ({
        wc_id: image.id,
        src: image.src,
        alt: image.alt || image.name,
      })),
    },
    // TODO: Improve attributes/variations
  }

  // SEO Metadata
  if (!product.meta) {
    const meta = await generateMetadata({ product })

    console.log("Meta from formatter", meta)

    product.meta = {
      ...meta,
      keywords: meta.keywords.map((key) => ({ keyword: key })),
    }
  }

  return product
}

export default formatProduct
