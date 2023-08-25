import { Product } from "payload/generated-types"
import { WCWH_Product } from "./types"
import { UpdateProduct } from "@lib/types/product"
import { Payload } from "payload"

type FormatProductArgs = {
  incoming: WCWH_Product
  existingProduct?: Product
  lanco?: boolean
  payload: Payload
}

const formatProduct = async ({
  incoming,
  existingProduct,
  lanco,
  payload,
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

  const product: UpdateProduct = {
    ...existingProduct,
    ...(lanco ? { lanco } : {}),
    title: incoming.name,
    slug: incoming.slug,
    createdAt: incoming.date_created,
    type: incoming.virtual ? "virtual" : incoming.type,
    _status:
      incoming.status === "publish"
        ? "published"
        : ["draft", "pending"].includes(incoming.status)
        ? "draft"
        : undefined,
    featured: incoming.featured,
    shortDescription: incoming.short_description,
    sku: incoming.sku,
    saleStartDate: incoming.date_on_sale_from ?? undefined,
    saleEndDate: incoming.date_on_sale_to ?? undefined,
    downloadable: incoming.downloadable,
    downloadLimit:
      incoming.download_limit === -1 ? undefined : incoming.download_limit,
    downloadExpiry:
      incoming.download_expiry === -1 ? undefined : incoming.download_expiry,
    isTaxable: incoming.tax_status === "taxable",
    taxClass: incoming.tax_class,
    manageStock: incoming.manage_stock,
    stock: incoming.stock_quantity ?? undefined,
    weight: incoming.weight,
    dimensions: {
      length: incoming.dimensions.length,
      width: incoming.dimensions.width,
      height: incoming.dimensions.height,
    },
    categories: categoryIds,
    tags: tagIds,
    prices: {
      regularPrice: incoming.regular_price
        ? Number.parseFloat(incoming.regular_price)
        : undefined,
      salePrice: incoming.sale_price
        ? Number.parseFloat(incoming.sale_price)
        : undefined,
    },
    wc: {
      wc_id: incoming.id,
      description: incoming.description,
      images: incoming.images.map((image) => {
        const { id: wc_id, ...rest } = image

        return { wc_id, ...rest }
      }),
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
