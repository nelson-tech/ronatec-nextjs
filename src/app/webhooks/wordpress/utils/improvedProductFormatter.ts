import he from "he"
import {
  importWooCommerceCSV,
  ImportOptions,
} from "../../../actions/sync/importFromCSV"
import { WooCommerceProductOptional } from "../../../../types/woocommerce-product"
import { ProductAttributes, WCImages } from "~payload-types"
import { UpdateProduct } from "@lib/types/product"
import findMatchingWCIds from "./findMatchingWCIds"

export interface ImprovedFormatterOptions extends ImportOptions {
  lanco?: boolean
  generateMeta?: boolean
  limit?: number
  offset?: number
  page?: number
}

export interface FormattedProductsResult {
  success: boolean
  products: UpdateProduct[]
  error?: string
  count: number
  totalCount: number
}

/**
 * Maps CSV product attributes to ProductAttributes format
 */
const mapCSVAttributes = (
  product: WooCommerceProductOptional
): ProductAttributes => {
  const attributes: ProductAttributes = []

  // Map up to 19 attributes from CSV format
  for (let i = 1; i <= 19; i++) {
    const nameKey = `Attribute ${i} name` as keyof WooCommerceProductOptional
    const valueKey =
      `Attribute ${i} value(s)` as keyof WooCommerceProductOptional

    const name = product[nameKey]
    const value = product[valueKey]

    if (name && value) {
      attributes.push({
        label: String(name),
        value: he.decode(String(value)),
      })
    }
  }

  return attributes
}

/**
 * Maps CSV categories to array format
 */
const mapCSVCategories = (product: WooCommerceProductOptional): string[] => {
  const categories: string[] = []

  if (product.Categories) {
    // Split by comma or pipe and clean up
    const categoryString = String(product.Categories)
    const categoryArray = categoryString
      .split(/[,|]/)
      .map((cat) => cat.trim())
      .filter(Boolean)
    categories.push(...categoryArray)
  }

  return categories
}

/**
 * Maps CSV tags to array format
 */
const mapCSVTags = (product: WooCommerceProductOptional): string[] => {
  const tags: string[] = []

  if (product.Tags) {
    // Split by comma or pipe and clean up
    const tagString = String(product.Tags)
    const tagArray = tagString
      .split(/[,|]/)
      .map((tag) => tag.trim())
      .filter(Boolean)
    tags.push(...tagArray)
  }

  return tags
}

/**
 * Maps CSV images to WCImages format
 */
const mapCSVImages = (product: WooCommerceProductOptional): WCImages => {
  const images: WCImages = []

  // Handle main image
  if (product.Images) {
    const imageUrls = String(product.Images)
      .split(/[,|]/)
      .map((url) => url.trim())
      .filter(Boolean)

    imageUrls.forEach((url, index) => {
      images.push({
        wc_id: index + 1, // Generate sequential IDs
        src: url,
        alt: product.Name ? String(product.Name) : `Product image ${index + 1}`,
      })
    })
  }

  return images
}

/**
 * Formats a single CSV product to payload schema format
 */
const formatCSVProduct = async (
  product: WooCommerceProductOptional,
  options: ImprovedFormatterOptions = {}
): Promise<UpdateProduct> => {
  const { lanco = false, generateMeta = true } = options

  // Map attributes
  const attributes = mapCSVAttributes(product)

  // Map categories and find matching IDs
  const categoryStrings = mapCSVCategories(product)
  const categories =
    categoryStrings.length > 0
      ? await findMatchingWCIds({
          collection: "categories",
          where: {
            or: [
              {
                slug: {
                  in: categoryStrings.map(
                    // remove all spaces
                    (cat) => cat.toLowerCase().replace(/\s+/g, "")
                  ),
                },
              },
              // if categoryStrings length is 1, use title
              ...(categoryStrings.length === 1
                ? [
                    {
                      title: {
                        equals: categoryStrings[0],
                      },
                    },
                  ]
                : []),
            ],
          },
        })
      : []

  // Map tags and find matching IDs
  const tagStrings = mapCSVTags(product)
  const tags =
    tagStrings.length > 0
      ? await findMatchingWCIds({
          collection: "tags",
          where: {
            slug: {
              in: tagStrings.map((tag) =>
                tag.toLowerCase().replace(/\s+/g, "-")
              ),
            },
          },
        })
      : []

  // Map images
  const wcImages = mapCSVImages(product)

  // Format prices (CSV prices are already in dollars, convert to cents)
  const regularPrice = product["Regular price"]
    ? Math.round(Number(product["Regular price"]) * 100)
    : undefined

  const salePrice = product["Sale price"]
    ? Math.round(Number(product["Sale price"]) * 100)
    : undefined

  // Generate slug from name
  const slug = product.Name
    ? String(product.Name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    : `product-${product.ID}`

  // Map stock status
  const inStock = product["In stock?"] === 1
  const manageStock = true

  // Create the formatted product
  const formattedProduct: UpdateProduct = {
    ...(lanco ? { lanco } : {}),
    title: product.Name
      ? he.decode(String(product.Name))
      : `Product ${product.ID}`,
    slug,
    type: product.Type === "variable" ? "variable" : "simple",
    _status: product.Published === 1 ? "published" : "draft",
    featured: product["Is featured?"] === 1,
    shortDescription: product["Short description"]
      ? he.decode(String(product["Short description"]))
      : "",
    sku: product.SKU || slug,

    downloadable: false, // CSV doesn't have this info typically
    isTaxable: product["Tax status"] === "taxable",
    taxClass: product["Tax class"] || "",
    manageStock,
    stock: product.Stock || undefined,
    weight: product["Weight (lbs)"]
      ? String(product["Weight (lbs)"])
      : undefined,
    categories,
    tags,
    prices: {
      regularPrice,
      salePrice,
    },
    attributes,
    meta: {
      title: product.Name
        ? he.decode(String(product.Name))
        : `Product ${product.ID}`,
      description: product["Short description"]
        ? he.decode(String(product["Short description"]))
        : "",
    },
    wc_id: product.ID || 0,
    wc: {
      wc_id: product.ID || 0,
      description: product.Description
        ? he.decode(String(product.Description))
        : "",
      images: wcImages,
    },
  }

  // Generate SEO metadata if requested
  // if (generateMeta) {
  //   try {
  //     const meta = await generateMetadata({ product: formattedProduct })
  //     if (meta) {
  //       formattedProduct.meta = meta
  //     }
  //   } catch (error) {
  //     console.warn(
  //       "Failed to generate metadata for product:",
  //       product.ID,
  //       error
  //     )
  //   }
  // }

  return formattedProduct
}

/**
 * Main function to import CSV data and format all products for payload schema
 */
export const improvedProductFormatter = async (
  options: ImprovedFormatterOptions = {}
): Promise<FormattedProductsResult> => {
  try {
    console.log("Starting improved product formatting from CSV...")

    // Import CSV data
    const importResult = await importWooCommerceCSV({
      filePath: options.filePath,
      normalize: false, // We'll handle normalization ourselves
    })

    if (!importResult.success) {
      return {
        success: false,
        products: [],
        error: importResult.error,
        count: 0,
        totalCount: 0,
      }
    }

    const csvProducts = importResult.data as WooCommerceProductOptional[]
    console.log(`Imported ${csvProducts.length} products from CSV`)

    // Calculate pagination
    const totalCount = csvProducts.length
    let offset = 0

    if (options.page && options.page > 0) {
      // Page-based pagination (1-indexed)
      const pageSize = options.limit || 10
      offset = (options.page - 1) * pageSize
    } else if (options.offset && options.offset >= 0) {
      // Offset-based pagination
      offset = options.offset
    }

    // Apply pagination to CSV products before processing
    let productsToProcess: WooCommerceProductOptional[]

    if (options.limit && options.limit > 0) {
      productsToProcess = csvProducts.slice(offset, offset + options.limit)
    } else {
      // If no limit specified, return all products from offset
      productsToProcess = csvProducts.slice(offset)
    }

    console.log(
      `Processing ${
        productsToProcess.length
      } products (offset: ${offset}, limit: ${
        options.limit || "none"
      }, total: ${totalCount})`
    )

    // Format each product
    const formattedProducts: UpdateProduct[] = []
    const errors: string[] = []

    for (let i = 0; i < productsToProcess.length; i++) {
      try {
        console.log(
          `Formatting product ${i + 1}/${productsToProcess.length}: ${
            productsToProcess[i].Name || productsToProcess[i].ID
          }`
        )

        const formatted = await formatCSVProduct(productsToProcess[i], options)
        formattedProducts.push(formatted)
      } catch (error) {
        const errorMsg = `Failed to format product ${
          productsToProcess[i].ID || i
        }: ${error instanceof Error ? error.message : "Unknown error"}`
        console.error(errorMsg)
        errors.push(errorMsg)
      }
    }

    console.log(`Successfully formatted ${formattedProducts.length} products`)

    if (errors.length > 0) {
      console.warn(`${errors.length} products failed to format:`, errors)
    }

    return {
      success: true,
      products: formattedProducts,
      count: formattedProducts.length,
      totalCount,
      ...(errors.length > 0
        ? { error: `${errors.length} products failed to format` }
        : {}),
    }
  } catch (error) {
    const errorMsg = `Failed to import and format products: ${
      error instanceof Error ? error.message : "Unknown error"
    }`
    console.error(errorMsg)

    return {
      success: false,
      products: [],
      error: errorMsg,
      count: 0,
      totalCount: 0,
    }
  }
}

export default improvedProductFormatter
