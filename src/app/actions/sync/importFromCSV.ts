import fs from "fs"
import path from "path"
// @ts-ignore - csv-parser doesn't have official TypeScript types
import csv from "csv-parser"
import stripBom from "strip-bom-stream"
import {
  WooCommerceProductOptional,
  NormalizedWooCommerceProduct,
  WooCommerceProductUtils,
} from "../../../types/woocommerce-product"

/**
 * Interface for CSV import options
 */
export interface ImportOptions {
  filePath?: string
  normalize?: boolean
}

/**
 * Result interface for CSV import
 */
export interface ImportResult {
  success: boolean
  data: WooCommerceProductOptional[] | NormalizedWooCommerceProduct[]
  error?: string
  count: number
}

/**
 * Default CSV file path - points to csv folder at project root
 */
const DEFAULT_CSV_PATH = path.join(
  process.cwd(),
  "csv",
  "wc-product-export-6-6-2025-Lanco-Corp.csv"
)

/**
 * Resolves file path - if relative, assumes it's in the csv folder at project root
 * @param filePath - File path (can be relative or absolute)
 * @returns Resolved absolute path
 */
function resolveCSVPath(filePath: string): string {
  if (path.isAbsolute(filePath)) {
    return filePath
  }

  // If relative, assume it's in the csv folder at project root
  return path.join(process.cwd(), "csv", filePath)
}

/**
 * Reads WooCommerce product CSV file and converts it to JSON
 * @param options - Import configuration options
 * @returns Promise<ImportResult> - Parsed product data
 */
export async function importWooCommerceCSV(
  options: ImportOptions = {}
): Promise<ImportResult> {
  const { filePath = DEFAULT_CSV_PATH, normalize = false } = options

  // Resolve the file path (handle relative paths from csv folder)
  const resolvedPath =
    filePath === DEFAULT_CSV_PATH ? filePath : resolveCSVPath(filePath)

  return new Promise((resolve) => {
    const results: WooCommerceProductOptional[] = []
    let totalRows = 0
    let zeroStockSkipped = 0

    // Check if file exists
    if (!fs.existsSync(resolvedPath)) {
      resolve({
        success: false,
        error: `CSV file not found at path: ${resolvedPath}`,
        data: [],
        count: 0,
      })
      return
    }

    fs.createReadStream(resolvedPath)
      .pipe(stripBom())
      .pipe(csv())
      .on("data", (row: any) => {
        try {
          totalRows++

          // Convert string numbers to actual numbers where appropriate
          const product: WooCommerceProductOptional = {
            ...row,
            ID: parseInt(row.ID) || 0,
            Published: parseInt(row.Published) || 0,
            "Is featured?": parseInt(row["Is featured?"]) || 0,
            "In stock?": parseInt(row["In stock?"]) || 0,
            Stock: parseInt(row.Stock) || 0,
            "Backorders allowed?": parseInt(row["Backorders allowed?"]) || 0,
            "Sold individually?": parseInt(row["Sold individually?"]) || 0,
            "Allow customer reviews?":
              parseInt(row["Allow customer reviews?"]) || 0,
            Position: parseInt(row.Position) || 0,
            "Weight (lbs)": parseFloat(row["Weight (lbs)"]) || undefined,
            "Regular price": parseFloat(row["Regular price"]) || 0,
            "Sale price": row["Sale price"]
              ? parseFloat(row["Sale price"])
              : undefined,
          }

          // Parse attribute visibility and global flags
          for (let i = 1; i <= 19; i++) {
            const visibleKey =
              `Attribute ${i} visible` as keyof WooCommerceProductOptional
            const globalKey =
              `Attribute ${i} global` as keyof WooCommerceProductOptional

            if (row[visibleKey] !== undefined && row[visibleKey] !== "") {
              ;(product as any)[visibleKey] = parseInt(row[visibleKey]) || 0
            }
            if (row[globalKey] !== undefined && row[globalKey] !== "") {
              ;(product as any)[globalKey] = parseInt(row[globalKey]) || 0
            }
          }

          // Skip products that are not published or have zero stock
          // Also skip products that don't have 'Miscellaneous Equipment' in the categories
          if (
            product.Published === 1 &&
            product.Stock > 0 &&
            product.Categories?.includes("Miscellaneous Equipment")
          ) {
            results.push(product)
          } else {
            zeroStockSkipped++
          }
        } catch (error) {
          console.warn("Error parsing row:", error)
        }
      })
      .on("end", () => {
        try {
          console.log(
            `CSV Import Summary: ${totalRows} total rows, ${zeroStockSkipped} products skipped (zero stock), ${results.length} products imported`
          )

          const data = normalize
            ? results.map((product) =>
                WooCommerceProductUtils.normalize(product)
              )
            : results

          resolve({
            success: true,
            data,
            count: results.length,
          })
        } catch (error) {
          resolve({
            success: false,
            error: `Error processing data: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
            data: [],
            count: 0,
          })
        }
      })
      .on("error", (error) => {
        resolve({
          success: false,
          error: `Error reading CSV file: ${error.message}`,
          data: [],
          count: 0,
        })
      })
  })
}

/**
 * Convenience function to import and normalize WooCommerce products
 * @param filePath - Optional path to CSV file
 * @returns Promise<NormalizedWooCommerceProduct[]> - Normalized product data
 */
export async function importNormalizedProducts(
  filePath?: string
): Promise<NormalizedWooCommerceProduct[]> {
  const result = await importWooCommerceCSV({ filePath, normalize: true })

  if (!result.success) {
    throw new Error(result.error || "Failed to import products")
  }

  return result.data as NormalizedWooCommerceProduct[]
}

/**
 * Convenience function to import raw WooCommerce products
 * @param filePath - Optional path to CSV file
 * @returns Promise<WooCommerceProductOptional[]> - Raw product data
 */
export async function importRawProducts(
  filePath?: string
): Promise<WooCommerceProductOptional[]> {
  const result = await importWooCommerceCSV({ filePath, normalize: false })

  if (!result.success) {
    throw new Error(result.error || "Failed to import products")
  }

  return result.data as WooCommerceProductOptional[]
}

/**
 * Save imported data to JSON file
 * @param data - Product data to save
 * @param outputPath - Path to save JSON file
 * @param pretty - Whether to format JSON with indentation
 */
export async function saveToJSON(
  data: WooCommerceProductOptional[] | NormalizedWooCommerceProduct[],
  outputPath: string,
  pretty: boolean = true
): Promise<void> {
  const jsonString = pretty
    ? JSON.stringify(data, null, 2)
    : JSON.stringify(data)

  await fs.promises.writeFile(outputPath, jsonString, "utf8")
}

/**
 * Example usage function
 */
export async function example() {
  try {
    console.log("Importing WooCommerce products from CSV...")

    // Import raw products
    const rawProducts = await importRawProducts()
    console.log(`Imported ${rawProducts.length} raw products`)

    // Import normalized products
    const normalizedProducts = await importNormalizedProducts()
    console.log(`Imported ${normalizedProducts.length} normalized products`)

    // Save to JSON files
    await saveToJSON(rawProducts, "raw-products.json")
    await saveToJSON(normalizedProducts, "normalized-products.json")

    console.log("Data exported to JSON files successfully!")

    // Show first product as example
    if (normalizedProducts.length > 0) {
      console.log("\nFirst product (normalized):")
      console.log(JSON.stringify(normalizedProducts[0], null, 2))
    }
  } catch (error) {
    console.error("Error importing products:", error)
  }
}

const importUtils = {
  importWooCommerceCSV,
  importNormalizedProducts,
  importRawProducts,
  saveToJSON,
  example,
}

export default importUtils
