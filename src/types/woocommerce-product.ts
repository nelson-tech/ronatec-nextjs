/**
 * TypeScript definitions for WooCommerce Product Export CSV
 * Generated from wc-product-export CSV structure
 */

export interface WooCommerceProduct {
  // Basic Product Information
  ID: number
  Type: "simple" | "variable" | "grouped" | "external"
  SKU: string
  "GTIN, UPC, EAN, or ISBN": string
  Name: string
  Published: 0 | 1
  "Is featured?": 0 | 1
  "Visibility in catalog": "visible" | "catalog" | "search" | "hidden"
  "Short description": string
  Description: string

  // Pricing and Sales
  "Date sale price starts": string
  "Date sale price ends": string
  "Tax status": "taxable" | "shipping" | "none"
  "Tax class": string
  "Sale price": string | number
  "Regular price": string | number

  // Inventory
  "In stock?": 0 | 1
  Stock: number
  "Low stock amount": string | number
  "Backorders allowed?": 0 | 1
  "Sold individually?": 0 | 1

  // Physical Properties
  "Weight (lbs)": number
  "Length (in)": string | number
  "Width (in)": string | number
  "Height (in)": string | number

  // Customer Interaction
  "Allow customer reviews?": 0 | 1
  "Purchase note": string

  // Categorization
  Categories: string
  Tags: string
  "Shipping class": string
  Brands: string

  // Media
  Images: string // Comma-separated URLs

  // Digital Products
  "Download limit": string | number
  "Download expiry days": string | number

  // Product Relations
  Parent: string | number
  "Grouped products": string
  Upsells: string
  "Cross-sells": string

  // External Products
  "External URL": string
  "Button text": string

  // Positioning
  Position: number

  // Product Attributes (up to 19 attributes)
  "Attribute 1 name": string
  "Attribute 1 value(s)": string
  "Attribute 1 visible": 0 | 1
  "Attribute 1 global": 0 | 1

  "Attribute 2 name": string
  "Attribute 2 value(s)": string
  "Attribute 2 visible": 0 | 1
  "Attribute 2 global": 0 | 1

  "Attribute 3 name": string
  "Attribute 3 value(s)": string
  "Attribute 3 visible": 0 | 1
  "Attribute 3 global": 0 | 1

  "Attribute 4 name": string
  "Attribute 4 value(s)": string
  "Attribute 4 visible": 0 | 1
  "Attribute 4 global": 0 | 1

  "Attribute 5 name": string
  "Attribute 5 value(s)": string
  "Attribute 5 visible": 0 | 1
  "Attribute 5 global": 0 | 1

  "Attribute 6 name": string
  "Attribute 6 value(s)": string
  "Attribute 6 visible": 0 | 1
  "Attribute 6 global": 0 | 1

  "Attribute 7 name": string
  "Attribute 7 value(s)": string
  "Attribute 7 visible": 0 | 1
  "Attribute 7 global": 0 | 1

  "Attribute 8 name": string
  "Attribute 8 value(s)": string
  "Attribute 8 visible": 0 | 1
  "Attribute 8 global": 0 | 1

  "Attribute 9 name": string
  "Attribute 9 value(s)": string
  "Attribute 9 visible": 0 | 1
  "Attribute 9 global": 0 | 1

  "Attribute 10 name": string
  "Attribute 10 value(s)": string
  "Attribute 10 visible": 0 | 1
  "Attribute 10 global": 0 | 1

  "Attribute 11 name": string
  "Attribute 11 value(s)": string
  "Attribute 11 visible": 0 | 1
  "Attribute 11 global": 0 | 1

  "Attribute 12 name": string
  "Attribute 12 value(s)": string
  "Attribute 12 visible": 0 | 1
  "Attribute 12 global": 0 | 1

  "Attribute 13 name": string
  "Attribute 13 value(s)": string
  "Attribute 13 visible": 0 | 1
  "Attribute 13 global": 0 | 1

  "Attribute 14 name": string
  "Attribute 14 value(s)": string
  "Attribute 14 visible": 0 | 1
  "Attribute 14 global": 0 | 1

  "Attribute 15 name": string
  "Attribute 15 value(s)": string
  "Attribute 15 visible": 0 | 1
  "Attribute 15 global": 0 | 1

  "Attribute 16 name": string
  "Attribute 16 value(s)": string
  "Attribute 16 visible": 0 | 1
  "Attribute 16 global": 0 | 1

  "Attribute 17 name": string
  "Attribute 17 value(s)": string
  "Attribute 17 visible": 0 | 1
  "Attribute 17 global": 0 | 1

  "Attribute 18 name": string
  "Attribute 18 value(s)": string
  "Attribute 18 visible": 0 | 1
  "Attribute 18 global": 0 | 1

  "Attribute 19 name": string
  "Attribute 19 value(s)": string
  "Attribute 19 visible": 0 | 1
  "Attribute 19 global": 0 | 1
}

/**
 * Utility type for optional WooCommerce product fields
 * Many fields in the CSV can be empty strings
 */
export interface WooCommerceProductOptional {
  // Basic Product Information
  ID: number
  Type: "simple" | "variable" | "grouped" | "external"
  SKU: string
  "GTIN, UPC, EAN, or ISBN"?: string
  Name: string
  Published: 0 | 1
  "Is featured?": 0 | 1
  "Visibility in catalog": "visible" | "catalog" | "search" | "hidden"
  "Short description"?: string
  Description?: string

  // Pricing and Sales
  "Date sale price starts"?: string
  "Date sale price ends"?: string
  "Tax status"?: "taxable" | "shipping" | "none"
  "Tax class"?: string
  "Sale price"?: string | number
  "Regular price": string | number

  // Inventory
  "In stock?": 0 | 1
  Stock: number
  "Low stock amount"?: string | number
  "Backorders allowed?": 0 | 1
  "Sold individually?": 0 | 1

  // Physical Properties
  "Weight (lbs)"?: number
  "Length (in)"?: string | number
  "Width (in)"?: string | number
  "Height (in)"?: string | number

  // Customer Interaction
  "Allow customer reviews?": 0 | 1
  "Purchase note"?: string

  // Categorization
  Categories?: string
  Tags?: string
  "Shipping class"?: string
  Brands?: string

  // Media
  Images?: string // Comma-separated URLs

  // Digital Products
  "Download limit"?: string | number
  "Download expiry days"?: string | number

  // Product Relations
  Parent?: string | number
  "Grouped products"?: string
  Upsells?: string
  "Cross-sells"?: string

  // External Products
  "External URL"?: string
  "Button text"?: string

  // Positioning
  Position?: number

  // Product Attributes (all optional)
  "Attribute 1 name"?: string
  "Attribute 1 value(s)"?: string
  "Attribute 1 visible"?: 0 | 1
  "Attribute 1 global"?: 0 | 1

  "Attribute 2 name"?: string
  "Attribute 2 value(s)"?: string
  "Attribute 2 visible"?: 0 | 1
  "Attribute 2 global"?: 0 | 1

  "Attribute 3 name"?: string
  "Attribute 3 value(s)"?: string
  "Attribute 3 visible"?: 0 | 1
  "Attribute 3 global"?: 0 | 1

  "Attribute 4 name"?: string
  "Attribute 4 value(s)"?: string
  "Attribute 4 visible"?: 0 | 1
  "Attribute 4 global"?: 0 | 1

  "Attribute 5 name"?: string
  "Attribute 5 value(s)"?: string
  "Attribute 5 visible"?: 0 | 1
  "Attribute 5 global"?: 0 | 1

  "Attribute 6 name"?: string
  "Attribute 6 value(s)"?: string
  "Attribute 6 visible"?: 0 | 1
  "Attribute 6 global"?: 0 | 1

  "Attribute 7 name"?: string
  "Attribute 7 value(s)"?: string
  "Attribute 7 visible"?: 0 | 1
  "Attribute 7 global"?: 0 | 1

  "Attribute 8 name"?: string
  "Attribute 8 value(s)"?: string
  "Attribute 8 visible"?: 0 | 1
  "Attribute 8 global"?: 0 | 1

  "Attribute 9 name"?: string
  "Attribute 9 value(s)"?: string
  "Attribute 9 visible"?: 0 | 1
  "Attribute 9 global"?: 0 | 1

  "Attribute 10 name"?: string
  "Attribute 10 value(s)"?: string
  "Attribute 10 visible"?: 0 | 1
  "Attribute 10 global"?: 0 | 1

  "Attribute 11 name"?: string
  "Attribute 11 value(s)"?: string
  "Attribute 11 visible"?: 0 | 1
  "Attribute 11 global"?: 0 | 1

  "Attribute 12 name"?: string
  "Attribute 12 value(s)"?: string
  "Attribute 12 visible"?: 0 | 1
  "Attribute 12 global"?: 0 | 1

  "Attribute 13 name"?: string
  "Attribute 13 value(s)"?: string
  "Attribute 13 visible"?: 0 | 1
  "Attribute 13 global"?: 0 | 1

  "Attribute 14 name"?: string
  "Attribute 14 value(s)"?: string
  "Attribute 14 visible"?: 0 | 1
  "Attribute 14 global"?: 0 | 1

  "Attribute 15 name"?: string
  "Attribute 15 value(s)"?: string
  "Attribute 15 visible"?: 0 | 1
  "Attribute 15 global"?: 0 | 1

  "Attribute 16 name"?: string
  "Attribute 16 value(s)"?: string
  "Attribute 16 visible"?: 0 | 1
  "Attribute 16 global"?: 0 | 1

  "Attribute 17 name"?: string
  "Attribute 17 value(s)"?: string
  "Attribute 17 visible"?: 0 | 1
  "Attribute 17 global"?: 0 | 1

  "Attribute 18 name"?: string
  "Attribute 18 value(s)"?: string
  "Attribute 18 visible"?: 0 | 1
  "Attribute 18 global"?: 0 | 1

  "Attribute 19 name"?: string
  "Attribute 19 value(s)"?: string
  "Attribute 19 visible"?: 0 | 1
  "Attribute 19 global"?: 0 | 1
}

/**
 * Normalized product interface with more TypeScript-friendly property names
 */
export interface NormalizedWooCommerceProduct {
  id: number
  type: "simple" | "variable" | "grouped" | "external"
  sku: string
  gtin?: string
  name: string
  published: boolean
  featured: boolean
  visibility: "visible" | "catalog" | "search" | "hidden"
  shortDescription?: string
  description?: string

  // Pricing
  salePriceStart?: string
  salePriceEnd?: string
  taxStatus?: "taxable" | "shipping" | "none"
  taxClass?: string
  salePrice?: number
  regularPrice: number

  // Inventory
  inStock: boolean
  stock: number
  lowStockAmount?: number
  backordersAllowed: boolean
  soldIndividually: boolean

  // Physical properties
  weight?: number
  length?: number
  width?: number
  height?: number

  // Customer interaction
  allowReviews: boolean
  purchaseNote?: string

  // Categorization
  categories?: string[]
  tags?: string[]
  shippingClass?: string
  brands?: string[]

  // Media
  images?: string[]

  // Digital products
  downloadLimit?: number
  downloadExpiryDays?: number

  // Relations
  parent?: number
  groupedProducts?: string[]
  upsells?: string[]
  crossSells?: string[]

  // External products
  externalUrl?: string
  buttonText?: string

  // Positioning
  position?: number

  // Attributes
  attributes?: ProductAttribute[]
}

export interface ProductAttribute {
  name: string
  values: string[]
  visible: boolean
  global: boolean
}

/**
 * Utility functions for working with WooCommerce products
 */
export class WooCommerceProductUtils {
  /**
   * Convert CSV row data to normalized product interface
   */
  static normalize(
    csvProduct: WooCommerceProductOptional
  ): NormalizedWooCommerceProduct {
    const attributes: ProductAttribute[] = []

    // Extract attributes
    for (let i = 1; i <= 19; i++) {
      const name = csvProduct[
        `Attribute ${i} name` as keyof WooCommerceProductOptional
      ] as string
      const values = csvProduct[
        `Attribute ${i} value(s)` as keyof WooCommerceProductOptional
      ] as string
      const visible = csvProduct[
        `Attribute ${i} visible` as keyof WooCommerceProductOptional
      ] as 0 | 1
      const global = csvProduct[
        `Attribute ${i} global` as keyof WooCommerceProductOptional
      ] as 0 | 1

      if (name && name.trim()) {
        attributes.push({
          name: name.trim(),
          values: values ? values.split(",").map((v) => v.trim()) : [],
          visible: visible === 1,
          global: global === 1,
        })
      }
    }

    return {
      id: csvProduct.ID,
      type: csvProduct.Type,
      sku: csvProduct.SKU,
      gtin: csvProduct["GTIN, UPC, EAN, or ISBN"] || undefined,
      name: csvProduct.Name,
      published: csvProduct.Published === 1,
      featured: csvProduct["Is featured?"] === 1,
      visibility: csvProduct["Visibility in catalog"],
      shortDescription: csvProduct["Short description"] || undefined,
      description: csvProduct.Description || undefined,

      salePriceStart: csvProduct["Date sale price starts"] || undefined,
      salePriceEnd: csvProduct["Date sale price ends"] || undefined,
      taxStatus: csvProduct["Tax status"] || undefined,
      taxClass: csvProduct["Tax class"] || undefined,
      salePrice: csvProduct["Sale price"]
        ? Number(csvProduct["Sale price"])
        : undefined,
      regularPrice: Number(csvProduct["Regular price"]),

      inStock: csvProduct["In stock?"] === 1,
      stock: csvProduct.Stock,
      lowStockAmount: csvProduct["Low stock amount"]
        ? Number(csvProduct["Low stock amount"])
        : undefined,
      backordersAllowed: csvProduct["Backorders allowed?"] === 1,
      soldIndividually: csvProduct["Sold individually?"] === 1,

      weight: csvProduct["Weight (lbs)"] || undefined,
      length: csvProduct["Length (in)"]
        ? Number(csvProduct["Length (in)"])
        : undefined,
      width: csvProduct["Width (in)"]
        ? Number(csvProduct["Width (in)"])
        : undefined,
      height: csvProduct["Height (in)"]
        ? Number(csvProduct["Height (in)"])
        : undefined,

      allowReviews: csvProduct["Allow customer reviews?"] === 1,
      purchaseNote: csvProduct["Purchase note"] || undefined,

      categories: csvProduct.Categories
        ? csvProduct.Categories.split(",").map((c) => c.trim())
        : undefined,
      tags: csvProduct.Tags
        ? csvProduct.Tags.split(",").map((t) => t.trim())
        : undefined,
      shippingClass: csvProduct["Shipping class"] || undefined,
      brands: csvProduct.Brands
        ? csvProduct.Brands.split(",").map((b) => b.trim())
        : undefined,

      images: csvProduct.Images
        ? csvProduct.Images.split(",").map((img) => img.trim())
        : undefined,

      downloadLimit: csvProduct["Download limit"]
        ? Number(csvProduct["Download limit"])
        : undefined,
      downloadExpiryDays: csvProduct["Download expiry days"]
        ? Number(csvProduct["Download expiry days"])
        : undefined,

      parent: csvProduct.Parent ? Number(csvProduct.Parent) : undefined,
      groupedProducts: csvProduct["Grouped products"]
        ? csvProduct["Grouped products"].split(",").map((p) => p.trim())
        : undefined,
      upsells: csvProduct.Upsells
        ? csvProduct.Upsells.split(",").map((u) => u.trim())
        : undefined,
      crossSells: csvProduct["Cross-sells"]
        ? csvProduct["Cross-sells"].split(",").map((cs) => cs.trim())
        : undefined,

      externalUrl: csvProduct["External URL"] || undefined,
      buttonText: csvProduct["Button text"] || undefined,

      position: csvProduct.Position || undefined,

      attributes: attributes.length > 0 ? attributes : undefined,
    }
  }
}

export default WooCommerceProduct
