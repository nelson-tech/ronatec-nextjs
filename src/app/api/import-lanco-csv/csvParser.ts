import type { WCWH_Product } from "../../webhooks/wordpress/utils/types"

/**
 * Parses a CSV row into a format compatible with WCWH_Product
 * This mimics the structure of webhook data so we can reuse the dataMapper
 */
export function parseLancoCSVRow(
  row: string[],
  headers: string[]
): WCWH_Product | null {
  try {
    const getColumn = (name: string): string => {
      const index = headers.indexOf(name)
      return index >= 0 ? (row[index] || "").trim() : ""
    }

    const getId = (name: string): number => {
      const val = getColumn(name)
      return val ? parseInt(val, 10) : 0
    }

    const getBoolean = (name: string): boolean => {
      const val = getColumn(name)
      return val === "1" || val.toLowerCase() === "true"
    }

    // Parse attributes from the CSV columns
    const attributes: WCWH_Product["attributes"] = []
    for (let i = 1; i <= 19; i++) {
      const attrName = getColumn(`Attribute ${i} name`)
      const attrValue = getColumn(`Attribute ${i} value(s)`)
      const attrVisible = getBoolean(`Attribute ${i} visible`)

      if (attrName && attrValue) {
        attributes.push({
          id: i,
          name: attrName,
          position: i - 1,
          visible: attrVisible,
          variation: false,
          options: [attrValue],
        })
      }
    }

    // Parse images from the Images column (comma-separated URLs)
    const imagesStr = getColumn("Images")
    const images: WCWH_Product["images"] = imagesStr
      ? imagesStr.split(",").map((url, index) => ({
          id: index + 1,
          date_created: new Date(),
          date_created_gmt: new Date(),
          date_modified: new Date(),
          date_modified_gmt: new Date(),
          src: url.trim(),
          name: "",
          alt: "",
          position: index,
        }))
      : []

    // Parse categories from Categories column
    const categoriesStr = getColumn("Categories")
    const categories: WCWH_Product["categories"] = categoriesStr
      ? categoriesStr.split(">").map((cat, index) => ({
          id: index + 1,
          name: cat.trim(),
          slug: cat
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, ""),
        }))
      : []

    // Get stock info
    const inStock = getBoolean("In stock?")
    const stockQuantity = getId("Stock")

    // Determine stock_status based on "In stock?" column and stock quantity
    let stock_status: "instock" | "outofstock" | "onbackorder" = "outofstock"
    if (inStock && stockQuantity > 0) {
      stock_status = "instock"
    } else if (!inStock || stockQuantity === 0) {
      stock_status = "outofstock"
    }

    // Build the WCWH_Product object
    const product: WCWH_Product = {
      id: getId("ID"),
      name: getColumn("Name"),
      slug: getColumn("SKU") || `product-${getId("ID")}`,
      permalink: "",
      date_created: new Date().toISOString(),
      date_created_gmt: new Date().toISOString(),
      date_modified: new Date().toISOString(),
      date_modified_gmt: new Date().toISOString(),
      type:
        (getColumn("Type") as "simple" | "variable" | "grouped") || "simple",
      status: getBoolean("Published") ? "publish" : "draft",
      featured: getBoolean("Is featured?"),
      catalog_visibility: getColumn("Visibility in catalog") || "visible",
      description: getColumn("Description") || "",
      short_description: getColumn("Short description") || "",
      sku: getColumn("SKU"),
      price: getColumn("Regular price") || "0",
      regular_price: getColumn("Regular price") || "0",
      sale_price: getColumn("Sale price") || "",
      date_on_sale_from: getColumn("Date sale price starts") || null,
      date_on_sale_from_gmt: null,
      date_on_sale_to: getColumn("Date sale price ends") || null,
      date_on_sale_to_gmt: null,
      price_html: "",
      on_sale: !!getColumn("Sale price"),
      purchasable: inStock,
      total_sales: 0,
      virtual: false,
      downloadable: false,
      downloads: [],
      download_limit: getId("Download limit") || -1,
      download_expiry: getId("Download expiry days") || -1,
      external_url: getColumn("External URL"),
      button_text: getColumn("Button text"),
      tax_status: getColumn("Tax status") || "taxable",
      tax_class: getColumn("Tax class") || "",
      manage_stock: stockQuantity > 0 || !inStock,
      stock_quantity: stockQuantity,
      stock_status,
      in_stock: inStock,
      backorders: getBoolean("Backorders allowed?") ? "yes" : "no",
      backorders_allowed: getBoolean("Backorders allowed?"),
      backordered: false,
      sold_individually: getBoolean("Sold individually?"),
      weight: getColumn("Weight (lbs)"),
      dimensions: {
        length: getColumn("Length (in)"),
        width: getColumn("Width (in)"),
        height: getColumn("Height (in)"),
      },
      shipping_required: true,
      shipping_taxable: true,
      shipping_class: getColumn("Shipping class") || "",
      shipping_class_id: 0,
      reviews_allowed: getBoolean("Allow customer reviews?"),
      average_rating: "0.00",
      rating_count: 0,
      related_ids: [],
      upsell_ids: [],
      cross_sell_ids: [],
      parent_id: getId("Parent"),
      purchase_note: getColumn("Purchase note"),
      categories,
      tags: [],
      images,
      attributes,
      default_attributes: [],
      variations: [],
      grouped_products: [],
      menu_order: getId("Position"),
      meta_data: [],
      _links: {
        self: [],
        collection: [],
        up: [],
      },
    }

    return product
  } catch (error) {
    console.error("Error parsing CSV row:", error)
    return null
  }
}

/**
 * Parses the entire CSV file content
 */
export function parseCSV(csvContent: string): {
  headers: string[]
  products: WCWH_Product[]
  errors: Array<{ row: number; error: string }>
} {
  const lines = csvContent.split("\n")
  const headers = parseCSVLine(lines[0])
  const products: WCWH_Product[] = []
  const errors: Array<{ row: number; error: string }> = []

  // Skip header row (index 0) and empty lines
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    try {
      const row = parseCSVLine(line)
      const product = parseLancoCSVRow(row, headers)

      if (product) {
        products.push(product)
      } else {
        errors.push({
          row: i + 1,
          error: "Failed to parse product data",
        })
      }
    } catch (error) {
      errors.push({
        row: i + 1,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  return { headers, products, errors }
}

/**
 * Parses a single CSV line, handling quoted values with commas
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"'
        i++ // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes
      }
    } else if (char === "," && !inQuotes) {
      // End of field
      result.push(current)
      current = ""
    } else {
      current += char
    }
  }

  // Add the last field
  result.push(current)

  return result
}
