# Lanco CSV Import Guide

**Date**: November 24, 2025
**Status**: ✅ Ready to Use

## Overview

This guide explains how to delete out-of-sync Lanco products and re-import them fresh from a CSV export.

## System Components

### 1. Delete Endpoint

**Path**: `/api/delete-lanco-products`

Safely deletes all products where `lanco=true`.

### 2. CSV Parser

**File**: `src/app/api/import-lanco-csv/csvParser.ts`

Parses WooCommerce CSV export format into WCWH_Product format (same as webhook data).

### 3. Import Endpoint

**Path**: `/api/import-lanco-csv`

Imports products from CSV using the new dataMapper for consistency.

## Step-by-Step Import Process

### Step 1: Dry Run - See What Will Be Deleted

```bash
curl "http://localhost:8140/api/delete-lanco-products?dryRun=true"
```

This shows you all Lanco products that would be deleted, without actually deleting them.

**Expected Response**:

```json
{
  "success": true,
  "dryRun": true,
  "message": "Would delete 150 Lanco products",
  "count": 150,
  "products": [
    {
      "id": "...",
      "title": "Product Name",
      "sku": "SKU123",
      "wc_id": 312
    }
  ]
}
```

### Step 2: Delete All Lanco Products

**⚠️ WARNING**: This is irreversible! Make sure you have a backup or CSV export first.

```bash
curl -X DELETE "http://localhost:8140/api/delete-lanco-products?confirm=yes"
```

**Expected Response**:

```json
{
  "success": true,
  "message": "Successfully deleted 150 Lanco products",
  "count": 150,
  "summary": {
    "total": 150,
    "deleted": 150,
    "failed": 0
  }
}
```

### Step 3: Import Products from CSV

#### Option A: Import All Products (Recommended)

```bash
curl -X POST http://localhost:8140/api/import-lanco-csv \
  -H "Content-Type: application/json" \
  -d '{}'
```

This uses the default CSV path:
`src/app/api/import-lanco-exports/wc-product-export-24-11-2025-1764009993018.csv`

#### Option B: Import with Custom Path

```bash
curl -X POST http://localhost:8140/api/import-lanco-csv \
  -H "Content-Type: application/json" \
  -d '{
    "csvPath": "/path/to/your/export.csv"
  }'
```

#### Option C: Import in Batches (for testing)

```bash
# Import first 10 products
curl -X POST http://localhost:8140/api/import-lanco-csv \
  -H "Content-Type: application/json" \
  -d '{
    "limit": 10,
    "offset": 0
  }'

# Import next 10 products
curl -X POST http://localhost:8140/api/import-lanco-csv \
  -H "Content-Type: application/json" \
  -d '{
    "limit": 10,
    "offset": 10
  }'
```

#### Option D: Using GET (browser-friendly)

```
http://localhost:8140/api/import-lanco-csv?limit=10
```

**Expected Response**:

```json
{
  "success": true,
  "summary": {
    "total": 1500,
    "created": 1450,
    "updated": 40,
    "skipped": 5,
    "errors": 5
  },
  "results": {
    "created": ["product_id_1", "product_id_2", ...],
    "updated": ["product_id_3", ...],
    "skipped": [...],
    "errors": [...]
  },
  "meta": {
    "csvPath": "...",
    "totalInCSV": 1500,
    "offset": 0,
    "limit": 1500
  }
}
```

## Parameters

### DELETE `/api/delete-lanco-products`

| Parameter | Type    | Required | Description                          |
| --------- | ------- | -------- | ------------------------------------ |
| `confirm` | string  | Yes\*    | Must be "yes" to proceed             |
| `dryRun`  | boolean | No       | If true, shows what would be deleted |

\*Not required if using dryRun

### POST `/api/import-lanco-csv`

| Parameter        | Type    | Default       | Description              |
| ---------------- | ------- | ------------- | ------------------------ |
| `csvPath`        | string  | Latest export | Path to CSV file         |
| `limit`          | number  | All           | Max products to import   |
| `offset`         | number  | 0             | Number to skip           |
| `updateExisting` | boolean | true          | Update existing products |

## How It Works

### Data Flow

```
CSV File
  ↓
csvParser.ts
  ↓ (converts to)
WCWH_Product format
  ↓ (same format as webhook)
dataMapper.ts
  ↓ (maps to)
Payload Product format
  ↓
PayloadCMS Database
```

### Stock Status Logic

The CSV parser determines stock status using:

```typescript
const inStock = row["In stock?"] === "1"
const stockQuantity = parseInt(row["Stock"])

let stock_status: "instock" | "outofstock"
if (inStock && stockQuantity > 0) {
  stock_status = "instock"
} else {
  stock_status = "outofstock"
}
```

Then the dataMapper applies the same logic as the webhook:

```typescript
const isInStock =
  wcData.stock_status === "instock" &&
  (!wcData.manage_stock || (wcData.stock_quantity ?? 0) > 0)

const productStatus = isInStock ? "published" : "draft"
```

**Result**: Out-of-stock products (Stock=0 or "In stock?"=0) are automatically set to `draft` status.

## CSV Format

The CSV must be a WooCommerce Product Export with these key columns:

- `ID` - WooCommerce product ID
- `Name` - Product title
- `SKU` - Product SKU
- `Published` - 1 or 0
- `In stock?` - 1 or 0
- `Stock` - Quantity
- `Regular price` - Price in dollars
- `Sale price` - Sale price (optional)
- `Short description` - Brief description
- `Description` - Full HTML description
- `Categories` - Category path (e.g., "Air Compressors > Parts")
- `Images` - Comma-separated image URLs
- `Attribute 1 name` through `Attribute 19 name` - Custom attributes
- `Attribute 1 value(s)` through `Attribute 19 value(s)` - Attribute values

## Complete Import Workflow

### Full Reset and Re-import

```bash
# 1. Check what will be deleted
curl "http://localhost:8140/api/delete-lanco-products?dryRun=true"

# 2. Delete all Lanco products
curl -X DELETE "http://localhost:8140/api/delete-lanco-products?confirm=yes"

# 3. Wait for deletion to complete (watch console logs)

# 4. Import all products from CSV
curl -X POST http://localhost:8140/api/import-lanco-csv \
  -H "Content-Type: application/json" \
  -d '{}'

# 5. Monitor import progress (watch console logs)
```

### Incremental Update (Without Deletion)

```bash
# Import with updateExisting=true (default)
# This will update existing products and create new ones
curl -X POST http://localhost:8140/api/import-lanco-csv \
  -H "Content-Type: application/json" \
  -d '{
    "updateExisting": true
  }'
```

## Monitoring Progress

Both endpoints log detailed progress to the console:

### Delete Progress

```
🔍 Finding all Lanco products...
📊 Found 150 Lanco products
🗑️  Deleting 150 Lanco products...
✅ Deleted: Product Name (product_id_1)
✅ Deleted: Product Name (product_id_2)
...
✅ Deletion complete: 150 deleted, 0 errors
```

### Import Progress

```
🚀 Starting Lanco CSV import...
📄 Reading CSV from: /path/to/file.csv
🔍 Parsing CSV...
✅ Parsed 1500 products
📊 Processing 1500 products
[1/1500] Processing: Product 1 (SKU123)
  ✅ Created: Product 1
[2/1500] Processing: Product 2 (SKU456)
  ✅ Updated: Product 2
...
🎉 Import complete!
  Created: 1450
  Updated: 40
  Skipped: 5
  Errors: 5
```

## Error Handling

### Parse Errors

If CSV rows fail to parse, they're logged but don't stop the import:

```json
{
  "parseErrors": [
    {
      "row": 42,
      "error": "Invalid data format"
    }
  ]
}
```

### Product Creation Errors

If products fail to create/update, they're logged individually:

```json
{
  "results": {
    "errors": [
      {
        "sku": "SKU123",
        "error": "Duplicate SKU"
      }
    ]
  }
}
```

## Testing Strategy

### 1. Test with Small Batch

```bash
# Import only 5 products for testing
curl -X POST http://localhost:8140/api/import-lanco-csv \
  -H "Content-Type: application/json" \
  -d '{
    "limit": 5
  }'
```

### 2. Verify in Admin

- Go to PayloadCMS admin
- Navigate to Products
- Filter by: `lanco = true`
- Check that products are created correctly
- Verify stock status (draft vs published)

### 3. Check Stock Logic

Find products with stock=0:

- They should have status = "draft"
- They should be hidden from frontend

Find products with stock>0:

- They should have status = "published"
- They should be visible on frontend

### 4. Full Import

Once satisfied with test results:

```bash
# Full import
curl -X POST http://localhost:8140/api/import-lanco-csv
```

## Advantages Over Old System

| Feature           | Old System             | New System            |
| ----------------- | ---------------------- | --------------------- |
| Data mapping      | formatProduct.ts       | Reuses dataMapper.ts  |
| Stock logic       | Inconsistent           | Same as webhook       |
| Error handling    | Basic                  | Comprehensive         |
| Progress tracking | Limited                | Detailed console logs |
| Batch processing  | Complex                | Simple offset/limit   |
| CSV parsing       | Manual                 | Robust parser         |
| Consistency       | Different from webhook | Identical to webhook  |

## Troubleshooting

### "No products imported"

Check:

1. CSV file path is correct
2. CSV has data rows (not just headers)
3. Console logs for parse errors

### "All products created as draft"

This is correct if they have stock=0. The system is working as designed to hide out-of-stock products.

### "Products missing attributes"

Check CSV columns - attributes must be in format:

- `Attribute 1 name`, `Attribute 1 value(s)`, etc.

### "Images not appearing"

- Images are stored as URLs in `wc.images`
- They're not downloaded, just referenced
- Check that URLs are accessible

## Next Steps

After successful import:

1. **Verify products** in PayloadCMS admin
2. **Test frontend** to ensure products display correctly
3. **Enable webhook logging** in Settings → Lanco
4. **Test webhook** with a product update from Lanco
5. **Monitor** for consistency between webhook and CSV imports

## Future Imports

For future CSV imports:

1. Get new CSV export from Lanco
2. Upload to: `src/app/api/import-lanco-exports/`
3. Update `DEFAULT_CSV_PATH` in `route.ts` OR pass custom path
4. Run import (deletion optional if just updating)

---

**System Status**: ✅ Ready for Production
**Documentation**: Complete
**Testing**: Ready to begin
